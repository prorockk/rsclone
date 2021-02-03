import { app } from "../script";
import Mobs from "./Mobs";
import checkTexture from "../checkBounds/checkTexture";

class Spotty extends Mobs {
    boolDeath: boolean;

    moveCurrent: number;

    constructor() {
        super("spotty");
        this.boolDeath = true;
        this.moveCurrent = 0;
    }

    loadUp(): void {
        this.mob.forEach((spottyOne: any) => {
            spottyOne.angryMob = true;
            spottyOne.anchor.set(0.5, 1);
            spottyOne.hp = 6;
            spottyOne.freeze = false;
            spottyOne.damage = 1;
            spottyOne.direction = "right";
            spottyOne.speedSpottyX = 0.6;
            spottyOne.speedSpottyY = 0;
            spottyOne.play();
        });
        app.ticker.add(() => {
            this.moveSpotty();
        });
    }

    moveSpotty(): void {
        this.mob.forEach((spottyOne: any, currentSpotty: number) => {
            if (spottyOne.hp === 0 && this.boolDeath) {
                spottyOne.animationSpeed = 0.4;
                spottyOne.anchor.set(0.5, 0.5);
                this.deleteMob(spottyOne);
            } else if (spottyOne.freeze) {
                this.freezeMob(spottyOne);
            } else {
                const speedSpotty: number = 0.6;
                const randomNum: number = Math.random() - 0.02;
                const numWalk: number = 1000;
                let wallCollision: boolean = false;
                const boundsSpotty = spottyOne.getBounds();
                const setDirection = (x: number, y: number, direction: string) => {
                    spottyOne.textures = this.sheets[`${direction}Walk`];
                    spottyOne.play();
                    spottyOne.speedSpottyX = x;
                    spottyOne.speedSpottyY = y;
                    spottyOne.direction = direction;
                };
                if (boundsSpotty.y < 160 || boundsSpotty.y > 505 || boundsSpotty.x > 710 || boundsSpotty.x < 60) {
                    wallCollision = true;
                    this.moveCurrent *= 13;
                }
                if (randomNum < 0 || checkTexture(0, spottyOne, false) || wallCollision) {
                    if (spottyOne.scale.x < 0) spottyOne.scale.x *= -1;
                    if (this.moveCurrent % numWalk < 250) {
                        setDirection(speedSpotty, 0, "right");
                    } else if (this.moveCurrent % numWalk < 500) {
                        setDirection(0, -speedSpotty, "up");
                    } else if (this.moveCurrent % numWalk < 750) {
                        setDirection(-speedSpotty, 0, "right");
                        spottyOne.scale.x *= -1;
                    } else if (this.moveCurrent % numWalk < 1000) {
                        setDirection(0, speedSpotty, "down");
                    }
                }

                spottyOne.x += spottyOne.speedSpottyX;
                spottyOne.y += spottyOne.speedSpottyY;

                if (this.moveCurrent % (300 + currentSpotty * 50) === 0) {
                    spottyOne.textures = this.sheets[spottyOne.direction];
                    spottyOne.loop = false;
                    spottyOne.play();
                    spottyOne.onComplete = () => {
                        spottyOne.textures = this.sheets[`${spottyOne.direction}Walk`];
                        spottyOne.loop = true;
                        spottyOne.play();
                        const bulletSpeed = 4;
                        const bullet = this.shootIntoPlayer(spottyOne);
                        bullet.scale.set(0.8);
                        bullet.bulletSpeedX = spottyOne.speedSpottyX * bulletSpeed;
                        bullet.bulletSpeedY = spottyOne.speedSpottyY * bulletSpeed;
                        bullet.x += bullet.bulletSpeedX * 5;
                        bullet.y += bullet.bulletSpeedY * 5;
                    };
                }
            }
        });
        this.trackShot();
        this.moveCurrent = (this.moveCurrent % 10 ** 3) + 1;
    }
}

export default Spotty;
