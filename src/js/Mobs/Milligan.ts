import * as PIXI from "pixi.js";
import { app } from "../script";
import { addAnimateElement, createAnimateElement } from "../CreateSprite/createAnimateSheets";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { AnimateMobType } from "../types/Types";
import { currentRoom, FlyClass, player, playerHead, rooms } from "../Rooms/startGame";
import tearsSheets from "../CreateSprite/tearsSheets";
import checkTexture from "../checkBounds/checkTexture";
import fly from "./fly";

class Milligan {
    private milligan: any;
    private milliganSheets: any;
    boolDeath: boolean;
    moveCurrent: number;
    sheetsBullets: any;
    bullets: any[];
    animateBullets: any;
    constructor() {
        this.milliganSheets = {};
        this.boolDeath = true;
        this.milligan = [];
        this.moveCurrent = 0;
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
    }
    doneLoading() {
        this.milligan = objectOfGameObjects[currentRoom].milligan;

        this.milliganSheets = this.milligan[0].sheets;

        this.milligan.forEach((milliganOne: any, numMilligan: number) => {
            milliganOne.head = true;
            if (numMilligan % 2 === 0) {
                //ноги
                milliganOne.anchor.set(0.6, -0.8);
                milliganOne.head = false;
            }
            milliganOne.angryMob = true;
            milliganOne.hp = 6;
            milliganOne.froze = false;
            milliganOne.damage = 2;
            milliganOne.play();
        });
        app.ticker.add(() => {
            this.moveMilligan();
        });
    }
    moveMilligan() {
        this.milligan.forEach((milliganOne: any, currentMil: number, mill: any[]) => {
            let legsMill: any;
            let headMill: any;
            if (currentMil % 2 !== 0) {
                //только с головой
                legsMill = mill[currentMil - 1]; // это ноги
                headMill = milliganOne;
            } else return;
            if ((!milliganOne.hp || (milliganOne.hp < 3 && Math.random() < 0.2)) && this.boolDeath) {
                this.boolDeath = false;
                headMill.textures = this.milliganSheets.createFly;
                headMill.loop = false;
                headMill.animationSpeed = 0.15;
                headMill.play();
                const flyAr = FlyClass.create();
                const bounds = legsMill.getBounds();
                flyAr.forEach((flyOne: any) => {
                    flyOne.x += legsMill.x;
                    flyOne.y += legsMill.y;
                });
                headMill.onComplete = () => {
                    headMill.textures = this.milliganSheets.death;
                    headMill.scale.set(1.6);
                    headMill.animationSpeed = 0.6;
                    this.milligan.splice(this.milligan.indexOf(headMill), 1);
                    this.milligan.splice(this.milligan.indexOf(legsMill), 1);
                    rooms[currentRoom].removeChild(legsMill);
                    headMill.play();

                    headMill.onComplete = () => {
                        headMill.dead = true;
                        rooms[currentRoom].removeChild(headMill);
                        this.boolDeath = true;
                    };
                };
                return; //что бы избежать ошибки
            } else if (headMill.froze || legsMill.froze) {
                //анимация нанесения урона
                if (legsMill.froze) headMill.froze = legsMill.froze;
                if (Array.isArray(headMill.froze)) {
                    const impulse = headMill.froze.slice();
                    headMill.hp--;
                    const intTint = setInterval(() => {
                        // перемещение и  мигание один раз
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
                        headMill.froze = false;
                        legsMill.froze = false;
                    }, 300);
                }
                legsMill.froze = true;
                headMill.froze = true;
            } else {
                //перемещение только ноги
                const speedMil = 0.25;
                const randomNum = (Math.random() - 0.5) * 0.7;
                const numWalk = 400;
                if (this.moveCurrent % numWalk < 100) {
                    //право
                    if (this.moveCurrent % numWalk === 0) {
                        legsMill.textures = this.milliganSheets.rightWalk;
                        legsMill.play();
                    }
                    legsMill.x += speedMil;
                    legsMill.y += randomNum;
                } else if (this.moveCurrent % numWalk < 200) {
                    //вверх
                    if (this.moveCurrent % numWalk === 100) {
                        legsMill.textures = this.milliganSheets.upWalk;
                        legsMill.play();
                    }
                    legsMill.y -= speedMil;
                    legsMill.x -= randomNum;
                } else if (this.moveCurrent % numWalk < 300) {
                    //влево
                    if (this.moveCurrent % numWalk === 200) {
                        legsMill.textures = this.milliganSheets.leftWalk;
                        legsMill.play();
                    }
                    legsMill.x -= speedMil;
                    legsMill.y -= randomNum;
                } else if (this.moveCurrent % numWalk < 400) {
                    //вниз
                    if (this.moveCurrent % numWalk === 300) {
                        legsMill.textures = this.milliganSheets.downWalk;
                        legsMill.play();
                    }
                    legsMill.y += speedMil;
                    legsMill.x += randomNum;
                }
                headMill.x = legsMill.x;
                headMill.y = legsMill.y;
            }
        });

        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}

export default Milligan;
