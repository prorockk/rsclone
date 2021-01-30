import { countMobs, currentRoom, rooms } from "../Rooms/startGame";
import { app } from "../script";
import { FlyClass } from "./loadMobs";
import Mobs from "./Mobs";

class Gurdy extends Mobs {
    boolDeath: boolean;
    moveCurrent: number;
    sheetsBullets: any;
    bullets: any[];
    animateBullets: any;
    constructor() {
        super("gurdy");
        this.boolDeath = true;
        this.moveCurrent = 0;
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
    }
    loadUp() {
        const gurdyBody = this.mob[0];
        gurdyBody.hp = 5;
        gurdyBody.angryMob = true;
        gurdyBody.freeze = false;
        gurdyBody.damage = 2;
        gurdyBody.scale.set(1);
        gurdyBody.play();
        this.mob[1].scale.set(1);
        this.mob[1].play();

        app.ticker.add(() => {
            this.moveGurdy();
        });
    }
    moveGurdy() {
        if (this.mob.length === 0) return;
        const gurdyOne = this.mob[1];
        const body = this.mob[0];
        const timeOut = this.moveCurrent % 1000;
        if (body.hp === 0 && this.boolDeath) {
            this.boolDeath = false;
            gurdyOne.textures = this.sheets.fire;
            gurdyOne.loop = body.loop = false;
            gurdyOne.animationSpeed = 0.05;
            gurdyOne.play();
            this.sound(`miligan${this.generateRandNum(3)}`, false);
            this.mob.splice(0, 2);
            gurdyOne.onComplete = () => {
                this.sound(`mobDeath${this.generateRandNum(4)}`, false);
                body.textures = this.sheets.death;
                body.scale.set(3);
                body.animationSpeed = 0.6;
                rooms[currentRoom].removeChild(gurdyOne);
                body.play();
                body.onComplete = () => {
                    body.textures = this.sheets.death;
                    body.play();
                    body.dead = true;
                    body.onComplete = () => {
                        rooms[currentRoom].removeChild(body);
                        this.boolDeath = true;
                        countMobs.count -= 2;
                    };
                };
            };
            return; //что бы избежать ошибки
        } else if (body.freeze) {
            body.tint = 16716853;
            body.hp--;
            setTimeout(() => {
                body.tint = 16777215;
            }, 300);
            body.freeze = false;
        } else if (timeOut > 300) {
            if (timeOut < 550 && timeOut % 20 === 0) {
                gurdyOne.textures = this.sheets.angry;
                gurdyOne.animationSpeed = 0.1;
                gurdyOne.loop = false;
                gurdyOne.play();
                const bullet = this.shootIntoPlayer(gurdyOne);
                bullet.x += bullet.bulletSpeedX * 4;
                bullet.y += bullet.bulletSpeedY * 4;
            }
            if (timeOut === 650 || timeOut === 700 || timeOut === 750 || timeOut === 250) {
                gurdyOne.textures = this.sheets.angry;
                gurdyOne.animationSpeed = 0.1;
                gurdyOne.loop = false;
                gurdyOne.play();
                gurdyOne.onComplete = () => {
                    gurdyOne.textures = this.sheets.stand;
                    gurdyOne.animationSpeed = 0.05;
                    gurdyOne.loop = true;
                    gurdyOne.play();
                    const bulletSpeed = 0.7;
                    for (let countBull = 0; countBull < 3; countBull += 1) {
                        const bulletAr = this.shootToFourDirection(gurdyOne);
                        bulletAr.forEach(
                            (bullet: {
                                scale: { set: (arg0: number) => void };
                                x: number;
                                bulletSpeedX: number;
                                y: number;
                                bulletSpeedY: number;
                            }) => {
                                bullet.scale.set(1.2);
                                if (timeOut !== 750) {
                                    let speedX = bullet.bulletSpeedX * 0.6;
                                    let speedY = bullet.bulletSpeedY * 0.6;
                                    if (speedX !== 0) {
                                        speedY = -speedX;
                                    } else if (speedY !== 0) {
                                        speedX = speedY;
                                    }
                                    bullet.bulletSpeedX = speedX;
                                    bullet.bulletSpeedY = speedY;
                                }
                                bullet.x += bullet.bulletSpeedX * 4; // перемещаем начало выстрела на границу моба
                                bullet.y += bullet.bulletSpeedY * 4;
                                const setSpeed = (speed: number) => {
                                    if (bullet.bulletSpeedX * bullet.bulletSpeedY > 0) {
                                        bullet.bulletSpeedX += speed;
                                        bullet.bulletSpeedY -= speed;
                                    } else {
                                        bullet.bulletSpeedX -= speed;
                                        bullet.bulletSpeedY -= speed;
                                    }
                                    bullet.scale.set(1.5);
                                };
                                switch (countBull) {
                                    case 0:
                                        setSpeed(bulletSpeed);
                                        break;
                                    case 2:
                                        setSpeed(-bulletSpeed);
                                        break;
                                }
                            }
                        );
                    }
                };
            }
        }

        if (timeOut === 999) {
            gurdyOne.textures = this.sheets.laugh;
            gurdyOne.animationSpeed = 0.1;
            gurdyOne.loop = false;
            gurdyOne.play();

            gurdyOne.onComplete = () => {
                gurdyOne.textures = this.sheets.stand;
                gurdyOne.animationSpeed = 0.05;
                gurdyOne.loop = true;
                gurdyOne.play();
                const flyAr = FlyClass.create();
                flyAr.forEach((flyOne: any) => {
                    flyOne.x = gurdyOne.x + (Math.random() - 0.6) * 100;
                    flyOne.y = gurdyOne.y + (Math.random() - 0.6) * 100;
                });
            };
        }
        this.trackShot();
        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}
export default Gurdy;
