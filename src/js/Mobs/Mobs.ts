import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { app } from "../script";
import { countMobs, currentRoom, playerHead, rooms } from "../Rooms/startGame";
import tearsSheets from "../CreateSprite/tearsSheets";
import checkTexture from "../checkBounds/checkTexture";
import createElement from "../CreateSprite/createGameElement";

class Mobs {
    boolDeath: boolean;
    name: any;
    mob: any[];
    sheets: any;
    animateBullets: any;
    bullets: any;
    sheetsBullets: { [x: string]: PIXI.Texture[] };
    shootEffect: any;
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
        countMobs.count += this.mob.length;
        this.sheets = this.mob[0].sheets;

        const animateBullets = tearsSheets();
        this.sheetsBullets = animateBullets.sheets;
        this.animateBullets = animateBullets;

        this.loadUp();
    }
    loadUp() {
        this.mob.forEach((mobOne: any) => {
            mobOne.hp = 2;
            mobOne.angryMob = true;
            mobOne.damage = 1;
            mobOne.freeze = false;
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
            countMobs.count--;
        };
    }
    freezeMob(mobOne: { freeze: string | boolean | any[]; hp: number; x: number; y: number; tint: number }) {
        if (Array.isArray(mobOne.freeze)) {
            mobOne.hp--;
            const impulse = mobOne.freeze.slice();
            const intTint = setInterval(() => {
                // перемещение и  мигание один раз
                mobOne.x -= impulse[0];
                mobOne.y -= impulse[1];
                mobOne.tint = 16716853;
            }, 60);
            setTimeout(() => {
                clearInterval(intTint);
                mobOne.tint = 16777215;
                mobOne.freeze = false;
            }, 300);
        }
        mobOne.freeze = true;
        mobOne.tint = 16716853;
    }
    shootIntoPlayer(mobOne: { getBounds: () => any }) {
        const mobsBounds = mobOne.getBounds();
        const playerHeadBounds = playerHead.getBounds();
        this.animateBullets.propertiesAr[0].x = mobsBounds.x + mobsBounds.width / 2;
        this.animateBullets.propertiesAr[0].y = mobsBounds.y + mobsBounds.height / 2;
        const [bullet]: any = new createElement().addAnimateElement(this.animateBullets);
        const diffX = Math.abs(playerHeadBounds.x - mobsBounds.x);
        const diffY = Math.abs(playerHeadBounds.y - mobsBounds.y);
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
        bullet.bulletSpeedY *= playerHeadBounds.y - mobsBounds.y >= 0 ? 1 : -1; //направление выстрела
        bullet.bulletSpeedX *= playerHeadBounds.x - mobsBounds.x >= 0 ? 1 : -1;
        bullet.forPlayer = true; //указание для коллизии
        bullet.damage = 1;
        bullet.tint = 9109504;
        this.bullets.push(bullet);
        return bullet;
    }
    shootToFourDirection(mobOne: { getBounds: () => any }) {
        const mobsBounds = mobOne.getBounds();
        this.animateBullets.propertiesAr[0].x = mobsBounds.x + mobsBounds.width / 2;
        this.animateBullets.propertiesAr[0].y = mobsBounds.y + mobsBounds.height / 2;
        this.animateBullets.propertiesAr = new Array(4).fill(this.animateBullets.propertiesAr[0]);
        const bulletSpeed = 3.2;
        const bulletArr: any = new createElement().addAnimateElement(this.animateBullets);
        bulletArr.forEach(
            (
                bullet: {
                    bulletSpeedX: number;
                    bulletSpeedY: number;
                    x: number;
                    y: number;
                    forPlayer: boolean;
                    damage: number;
                    tint: number;
                },
                countBull: any
            ) => {
                const setSpeed = (x: number, y: number) => {
                    bullet.bulletSpeedX = x;
                    bullet.bulletSpeedY = y;
                };
                switch (countBull) {
                    case 0:
                        setSpeed(-bulletSpeed, 0);
                        break;
                    case 1:
                        setSpeed(bulletSpeed, 0);
                        break;
                    case 2:
                        setSpeed(0, -bulletSpeed);
                        break;
                    case 3:
                        setSpeed(0, bulletSpeed);
                }
                bullet.x += bullet.bulletSpeedX * 4; // перемещаем начало выстрела на границу моба
                bullet.y += bullet.bulletSpeedY * 4;
                bullet.forPlayer = true; //указание для коллизии
                bullet.damage = 1;
                bullet.tint = 9109504;
                this.bullets.push(bullet);
            }
        );
        return bulletArr;
    }
    trackShot() {
        for (let i = 0; i < this.bullets.length; i++) {
            //определение направления выстрела
            const bullet = this.bullets[i];
            bullet.position.x += bullet.bulletSpeedX;
            bullet.position.y += bullet.bulletSpeedY; //удаление пуль
            if (
                checkTexture(1, this.bullets[i], true) || //для игрока
                checkTexture(0, this.bullets[i], false) || //для объектов
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
    }
}

export default Mobs;
