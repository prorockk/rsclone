import * as PIXI from "pixi.js";
import { app } from "../script";
import { addAnimateElement, createAnimateElement } from "../CreateSprite/createAnimateSheets";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { AnimateMobType } from "../types/Types";
import { currentRoom, player, playerHead, rooms } from "../Rooms/startGame";
import tearsSheets from "../CreateSprite/tearsSheets";
import checkTexture from "../checkBounds/checkTexture";

class Gaper {
    private gaper: any;
    private gaperSheets: any;
    boolDeath: boolean;
    moveCurrent: number;
    sheetsBullets: any;
    bullets: any[];
    animateBullets: any;
    constructor() {
        this.gaperSheets = {};
        this.boolDeath = true;
        this.gaper = [];
        this.moveCurrent = 0;
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
    }
    doneLoading() {
        this.gaper = objectOfGameObjects[currentRoom].gaper;

        this.gaperSheets = this.gaper[0].sheets;

        this.gaper.forEach((gaperOne: any) => {
            gaperOne.hp = 4;
            gaperOne.angryMob = true;
            gaperOne.froze = false;
            gaperOne.damage = 1;
            gaperOne.play();
        });

        const [sheetsBullets, animateBullets] = tearsSheets();
        this.sheetsBullets = sheetsBullets;
        this.animateBullets = animateBullets;
        app.ticker.add(() => {
            this.moveGaper();
        });
    }
    moveGaper() {
        this.gaper.forEach((gaperOne: any, currentGap: number) => {
            if (gaperOne.hp === 0 && this.boolDeath) {
                gaperOne.textures = this.gaperSheets.death;
                gaperOne.loop = false;
                gaperOne.animationSpeed = 0.6;
                gaperOne.scale.set(1.6);
                this.gaper.splice(this.gaper.indexOf(gaperOne), 1);
                gaperOne.play();
                this.boolDeath = false;
                gaperOne.onComplete = () => {
                    gaperOne.dead = true;
                    rooms[currentRoom].removeChild(gaperOne);
                    this.boolDeath = true;
                };
            } else if (gaperOne.froze) {
                //анимация нанесения урона
                if (Array.isArray(gaperOne.froze)) {
                    gaperOne.hp--;
                    const impulse = gaperOne.froze.slice();
                    const intTint = setInterval(() => {
                        // перемещение и  мигание один раз
                        gaperOne.x -= impulse[0];
                        gaperOne.y -= impulse[1];
                        gaperOne.tint = 16716853;
                    }, 60);
                    setTimeout(() => {
                        clearInterval(intTint);
                        gaperOne.tint = 16777215;
                        gaperOne.froze = false;
                    }, 300);
                }
                gaperOne.froze = true;
                gaperOne.tint = 16716853;
            }

            if (this.moveCurrent % 8 === 4) {
                //перемещение
                gaperOne.x += 3;
            } else if (this.moveCurrent % 8 === 0) {
                gaperOne.x -= 3;
            }
            if (this.moveCurrent % (100 + currentGap * 30) === 0) {
                //направление пуль и создание
                gaperOne.textures = this.gaperSheets.angry;
                gaperOne.play();
                const gaperBounds = gaperOne.getBounds();
                const playerHeadBounds = playerHead.getBounds();
                this.animateBullets.propertiesAr[0].x = gaperBounds.x + gaperBounds.width / 2;
                this.animateBullets.propertiesAr[0].y = gaperBounds.y + gaperBounds.height / 2;
                const [bullet]: any = addAnimateElement(this.sheetsBullets, this.animateBullets.propertiesAr);
                const diffX = Math.abs(playerHeadBounds.x - gaperBounds.x);
                const diffY = Math.abs(playerHeadBounds.y - gaperBounds.y);
                if (diffX >= diffY) {
                    //задаем равномерную скорость по кривой
                    bullet.bulletSpeedX = (diffX / diffY) * 2;
                    bullet.bulletSpeedY = 2;
                } else {
                    bullet.bulletSpeedY = (diffY / diffX) * 2;
                    bullet.bulletSpeedX = 2;
                }
                if (bullet.bulletSpeedX > 3.5 || bullet.bulletSpeedY > 3.5) {
                    // коректируем скорость полу в координатах близких к 0
                    const multiSpeed =
                        bullet.bulletSpeedX / bullet.bulletSpeedY + bullet.bulletSpeedY / bullet.bulletSpeedX;
                    bullet.bulletSpeedX /= multiSpeed / 1.5;
                    bullet.bulletSpeedY /= multiSpeed / 1.5;
                }
                bullet.bulletSpeedY *= playerHeadBounds.y - gaperBounds.y >= 0 ? 1 : -1; //направление выстрела
                bullet.bulletSpeedX *= playerHeadBounds.x - gaperBounds.x >= 0 ? 1 : -1;
                bullet.x += bullet.bulletSpeedX * 4; // перемещаем начало выстрела на границу моба
                bullet.y += bullet.bulletSpeedY * 4;
                bullet.forPlayer = true; //указание для коллизии
                bullet.damage = 1;
                bullet.tint = 9109504;
                this.bullets.push(bullet);
            }
            for (let i = 0; i < this.bullets.length; i++) {
                //определение направления выстрела
                const bullet = this.bullets[i];
                bullet.position.x += bullet.bulletSpeedX;
                bullet.position.y += bullet.bulletSpeedY;

                //удаление пуль
                if (
                    checkTexture(1, this.bullets[i], true) ||
                    checkTexture(0, this.bullets[i], false) ||
                    !this.boolDeath
                ) {
                    const deleteBullet = this.bullets[i];
                    deleteBullet.textures = this.sheetsBullets.death;
                    deleteBullet.play();
                    this.bullets.splice(i, 1);
                    deleteBullet.onComplete = () => {
                        deleteBullet.dead = true;
                        app.stage.removeChild(deleteBullet);
                    };
                }
            }
        });

        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}

export default Gaper;
