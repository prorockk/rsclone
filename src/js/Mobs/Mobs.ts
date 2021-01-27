import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { app } from "../script";
import { countMobs, currentRoom, playerHead, rooms } from "../Rooms/startGame";
import { addAnimateElement, createAnimateElement } from "../CreateSprite/createAnimateSheets";
import { AnimateMobType } from "../types/Types";
import tearsSheets from "../CreateSprite/tearsSheets";
import checkTexture from "../checkBounds/checkTexture";
import openDoors from "../Rooms/openDoors";

class Mobs {
    boolDeath: boolean;
    name: any;
    mob: any[];
    sheets: any;
    animateBullets: any;
    bullets: any;
    sheetsBullets: { [x: string]: PIXI.Texture[] };
    constructor(name: string) {
        this.name = name;
        this.sheets = {};
        this.boolDeath = true;
        this.mob = [];
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
    }
    doneLoading() {
        if (
            !objectOfGameObjects[currentRoom].hasOwnProperty(this.name) ||
            objectOfGameObjects[currentRoom][this.name].length === 0
        ) {
            return;
        }
        this.mob = objectOfGameObjects[currentRoom][this.name];
        countMobs += this.mob.length;
        this.sheets = this.mob[0].sheets;

        const [sheetsBullets, animateBullets] = tearsSheets();
        this.sheetsBullets = sheetsBullets;
        this.animateBullets = animateBullets;
        console.log(this);

        this.loadUp();
    }
    loadUp() {
        this.mob.forEach((mobOne: any) => {
            mobOne.hp = 2;
            mobOne.angryMob = true;
            mobOne.damage = 1;
            mobOne.froze = false;
            mobOne.play();
        });
        return;
    }
    deleteMob(mobOne: { textures: any; loop: boolean; play: () => void; onComplete: () => void; dead: boolean }) {
        mobOne.textures = this.sheets.death;
        mobOne.loop = false;
        this.mob.splice(this.mob.indexOf(mobOne), 1);
        mobOne.play();
        this.boolDeath = false;
        mobOne.onComplete = () => {
            mobOne.dead = true;
            rooms[currentRoom].removeChild(mobOne);
            this.boolDeath = true;
            countMobs--;
            if (countMobs === 0) {
                openDoors(objectOfGameObjects[currentRoom]);
            }
        };
    }
    frozeMob(mobOne: { froze: string | boolean | any[]; hp: number; x: number; y: number; tint: number }) {
        if (Array.isArray(mobOne.froze)) {
            mobOne.hp--;
            const impulse = mobOne.froze.slice();
            const intTint = setInterval(() => {
                // перемещение и  мигание один раз
                mobOne.x -= impulse[0];
                mobOne.y -= impulse[1];
                mobOne.tint = 16716853;
            }, 60);
            setTimeout(() => {
                clearInterval(intTint);
                mobOne.tint = 16777215;
                mobOne.froze = false;
            }, 300);
        }
        mobOne.froze = true;
        mobOne.tint = 16716853;
    }
    shootIntoPlayer(mobOne: { getBounds: () => any }) {
        const potterBounds = mobOne.getBounds();
        const playerHeadBounds = playerHead.getBounds();
        this.animateBullets.propertiesAr[0].x = potterBounds.x + potterBounds.width / 2;
        this.animateBullets.propertiesAr[0].y = potterBounds.y + potterBounds.height / 2;
        const [bullet]: any = addAnimateElement(this.sheetsBullets, this.animateBullets.propertiesAr);
        const diffX = Math.abs(playerHeadBounds.x - potterBounds.x);
        const diffY = Math.abs(playerHeadBounds.y - potterBounds.y);
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
            const multiSpeed = bullet.bulletSpeedX / bullet.bulletSpeedY + bullet.bulletSpeedY / bullet.bulletSpeedX;
            bullet.bulletSpeedX /= multiSpeed / 1.5;
            bullet.bulletSpeedY /= multiSpeed / 1.5;
        }
        bullet.bulletSpeedY *= playerHeadBounds.y - potterBounds.y >= 0 ? 1 : -1; //направление выстрела
        bullet.bulletSpeedX *= playerHeadBounds.x - potterBounds.x >= 0 ? 1 : -1;
        bullet.forPlayer = true; //указание для коллизии
        bullet.damage = 1;
        bullet.tint = 9109504;
        this.bullets.push(bullet);
        return bullet;
    }
    trackShot() {
        for (let i = 0; i < this.bullets.length; i++) {
            //определение направления выстрела
            const bullet = this.bullets[i];
            bullet.position.x += bullet.bulletSpeedX;
            bullet.position.y += bullet.bulletSpeedY; //удаление пуль
            if (
                checkTexture(1, this.bullets[i], true) || //для игрока
                checkTexture(0, this.bullets[i], false) //для объектов
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
    }
}

export default Mobs;
