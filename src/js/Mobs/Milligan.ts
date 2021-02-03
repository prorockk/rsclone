import { app } from "../script";
import { mainCounter, currentRoom, rooms } from "../Rooms/startGame";
import Mobs from "./Mobs";
import { FlyClass } from "./loadMobs";

class Milligan extends Mobs {
    boolDeath: boolean;
    moveCurrent: number;
    constructor() {
        super("milligan");
        this.boolDeath = true;
        this.moveCurrent = 0;
    }
    loadUp() {
        this.mob.forEach((milliganOne: any, numMilligan: number) => {
            milliganOne.head = true;
            if (numMilligan % 2 === 0) {
                milliganOne.anchor.set(0.6, -0.8);
                milliganOne.head = false;
            }
            milliganOne.angryMob = true;
            milliganOne.hp = 4;
            milliganOne.freeze = false;
            milliganOne.damage = 1;
            milliganOne.play();
        });
        app.ticker.add(() => {
            this.moveMilligan();
        });
    }
    moveMilligan() {
        this.mob.forEach((milliganOne: any, currentMil: number, mill: any[]) => {
            let legsMill: any;
            let headMill: any;
            if (currentMil % 2 !== 0) {
                legsMill = mill[currentMil - 1];
                headMill = milliganOne;
            } else return;
            if ((!milliganOne.hp || (milliganOne.hp < 1 && Math.random() < 0.2)) && this.boolDeath) {
                this.boolDeath = false;
                headMill.textures = this.sheets.createFly;
                headMill.loop = false;
                headMill.animationSpeed = 0.15;
                headMill.play();
                this.sound(`miligan${this.generateRandNum(3)}`, false);

                headMill.onComplete = () => {
                    const flyAr = FlyClass.create();
                    flyAr.forEach((flyOne: any) => {
                        flyOne.x = legsMill.x + (Math.random() - 0.6) * 20;
                        flyOne.y = legsMill.y + (Math.random() - 0.6) * 20;
                    });
                    this.sound(`mobDeath${this.generateRandNum(4)}`, false);
                    headMill.textures = this.sheets.death;
                    headMill.scale.set(1.6);
                    headMill.animationSpeed = 0.6;
                    this.mob.splice(this.mob.indexOf(headMill), 1);
                    this.mob.splice(this.mob.indexOf(legsMill), 1);
                    rooms[currentRoom].removeChild(legsMill);
                    headMill.play();
                    headMill.onComplete = () => {
                        headMill.dead = true;
                        rooms[currentRoom].removeChild(headMill);
                        this.boolDeath = true;
                        mainCounter.count -= 2;
                        mainCounter.user.kills++;
                    };
                };
                return;
            } else if (headMill.freeze || legsMill.freeze) {
                legsMill.freeze ? (headMill.freeze = legsMill.freeze) : (legsMill.freeze = headMill.freeze);
                this.freezeMob(legsMill);
                this.freezeMob(headMill);
                if (Array.isArray(headMill.freeze)) {
                    const impulse = headMill.freeze.slice();
                    headMill.hp--;
                    const intTint = setInterval(() => {
                        headMill.x -= impulse[0];
                        headMill.y -= impulse[1];
                        legsMill.x -= impulse[0];
                        legsMill.y -= impulse[1];
                        headMill.tint = 16716853;
                        legsMill.tint = 16716853;
                    }, 60);
                    setTimeout(() => {
                        clearInterval(intTint);
                        headMill.tint = 16777215;
                        legsMill.tint = 16777215;
                        headMill.freeze = false;
                        legsMill.freeze = false;
                    }, 300);
                }
                legsMill.freeze = true;
                headMill.freeze = true;
            } else {
                const speedMil = 0.25;
                const randomNum = (Math.random() - 0.5) * 0.7;
                const numWalk = 400;
                if (this.moveCurrent % numWalk < 100) {
                    if (this.moveCurrent % numWalk === 0) {
                        legsMill.textures = this.sheets.rightWalk;
                        legsMill.play();
                    }
                    legsMill.x += speedMil;
                    legsMill.y += randomNum;
                } else if (this.moveCurrent % numWalk < 200) {
                    if (this.moveCurrent % numWalk === 100) {
                        legsMill.textures = this.sheets.upWalk;
                        legsMill.play();
                    }
                    legsMill.y -= speedMil;
                    legsMill.x -= randomNum;
                } else if (this.moveCurrent % numWalk < 300) {
                    if (this.moveCurrent % numWalk === 200) {
                        legsMill.textures = this.sheets.leftWalk;
                        legsMill.play();
                    }
                    legsMill.x -= speedMil;
                    legsMill.y -= randomNum;
                } else if (this.moveCurrent % numWalk < 400) {
                    if (this.moveCurrent % numWalk === 300) {
                        legsMill.textures = this.sheets.downWalk;
                        legsMill.play();
                    }
                    legsMill.y += speedMil;
                    legsMill.x += randomNum;
                }
                if (this.moveCurrent % numWalk === 150) {
                    this.sound(`miligan${this.generateRandNum(3)}`, false);
                }
                headMill.x = legsMill.x;
                headMill.y = legsMill.y;
            }
        });

        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}

export default Milligan;
