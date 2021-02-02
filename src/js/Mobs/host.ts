import { app } from "../script";
import Mobs from "./Mobs";

class Host extends Mobs {
    boolDeath: boolean;
    moveCurrent: number;
    sheetsBullets: any;
    bullets: any[];
    animateBullets: any;
    constructor() {
        super("host");
        this.boolDeath = true;
        this.moveCurrent = 0;
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
    }
    loadUp() {
        this.mob.forEach((hostOne: any) => {
            hostOne.hp = 4;
            hostOne.anchor.set(0.5, 1);
            hostOne.angryMob = true;
            hostOne.freeze = false;
            hostOne.damage = 2;
            hostOne.block = true;
            hostOne.play();
        });
        app.ticker.add(() => {
            this.moveGaper();
        });
    }
    moveGaper() {
        this.mob.forEach((hostOne: any, countHost: number) => {
            if (hostOne.hp === 0 && this.boolDeath) {
                hostOne.animationSpeed = 0.6;
                hostOne.anchor.set(0.5, 0.5);
                hostOne.scale.set(1.6);
                this.deleteMob(hostOne);
            } else if (hostOne.freeze && !hostOne.block) {
                //анимация нанесения урона
                this.freezeMob(hostOne);
            } else if (this.moveCurrent % (180 + countHost * 50) === 0) {
                //направление пуль и создание
                hostOne.textures = this.sheets.shoot;
                hostOne.play();
                hostOne.onComplete = () => {
                    hostOne.block = false;
                    const bulletSpeed = 0.5;
                    for (let countBull = 0; countBull < 3; countBull += 1) {
                        const bullet = this.shootIntoPlayer(hostOne);
                        bullet.scale.set(1.2);
                        bullet.x += bullet.bulletSpeedX * 3; // перемещаем начало выстрела на границу моба
                        bullet.y += bullet.bulletSpeedY * 3;
                        const setSpeed = (speed: number) => {
                            if (bullet.bulletSpeedX * bullet.bulletSpeedY > 0) {
                                bullet.bulletSpeedX += speed;
                                bullet.bulletSpeedY -= speed;
                            } else {
                                bullet.bulletSpeedX -= speed;
                                bullet.bulletSpeedY -= speed;
                            }
                            bullet.scale.set(1.1);
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
                };
            } else if (this.moveCurrent % (180 + countHost * 50) === 20) {
                hostOne.textures = this.sheets.block;
                hostOne.play();
                hostOne.onComplete = () => {
                    this.sound(`fart`, false);
                    hostOne.block = true;
                };
            }
        });
        this.trackShot();
        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}

export default Host;
