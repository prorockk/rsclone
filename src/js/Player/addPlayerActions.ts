import * as PIXI from "pixi.js";
import { app } from "../script";
import { PlayerMethod } from "../Rooms/startGame";
import checkTexture from "../checkBounds/checkTexture";
import { addAnimateElement, createAnimateElement } from "../CreateSprite/createAnimateSheets";
import tearsSheets from "../CreateSprite/tearsSheets";

const addPlayerActions = () => {
    PlayerMethod.bullets = []; //новые скилы героя

    const [sheets, animate] = tearsSheets();

    let switcherTears = true;
    let tearsAr: number[] = [];

    PlayerMethod.playerShooting = function (e: { x: any; y: any } | string) {
        if (tearsAr.length > 0) return; //блокирование частых выстрелов
        tearsAr.push(0);
        setTimeout(() => (tearsAr = []), 230);

        //добавляем функции для скилов героя
        let bulletDirection;
        const bulletSpeed = 8;
        let tearPosition = 3; //выстрелы из разных глаз
        if (switcherTears) {
            tearPosition *= -1;
        }
        switcherTears = !switcherTears;
        if (typeof e === "string") {
            //направление с клавиатуры
            bulletDirection = e;
        } else {
            // направление с мышки
            const cursorPositionX = e.x;
            const cursorPositionY = e.y;
            if (Math.abs(cursorPositionX - this.player.x) > Math.abs(cursorPositionY - this.player.y)) {
                bulletDirection = cursorPositionX > this.player.x ? "right" : "left";
            } else {
                bulletDirection = cursorPositionY > this.player.y ? "down" : "up";
            }
        }
        const startPointBullet = bulletDirection === "up" ? 20 : 7.5;
        animate.propertiesAr[0].x = this.player.x + tearPosition;
        animate.propertiesAr[0].y = this.player.y - startPointBullet;
        this.head.textures = this.playerSheets[`${bulletDirection}See`]; //изменение напрвления головы
        this.head.play();
        this.head.onComplete = () => {
            this.head.textures = this.playerSheets.standSee;
            this.head.play();
        };
        const [bullet]: any = addAnimateElement(sheets, animate.propertiesAr);

        bullet.speed = bulletSpeed;
        bullet.forMobs = true;
        bullet.direction = bulletDirection;
        this.bullets.push(bullet);
    };

    PlayerMethod.updateBullets = function (e: number) {
        for (let i = 0; i < this.bullets.length; i++) {
            //определение направления выстрела
            switch (this.bullets[i].direction) {
                case "up":
                    this.bullets[i].position.y -= this.bullets[i].speed;
                    break;
                case "down":
                    this.bullets[i].position.y += this.bullets[i].speed;
                    break;
                case "left":
                    this.bullets[i].position.x -= this.bullets[i].speed;
                    break;
                case "right":
                    this.bullets[i].position.x += this.bullets[i].speed;
                    break;
            }

            //удаление пуль
            if (
                this.bullets[i].position.y < 150 ||
                this.bullets[i].position.y > 550 ||
                this.bullets[i].position.x < 50 ||
                this.bullets[i].position.x > 750 ||
                checkTexture(0, this.bullets[i], 0) //                             NEW
            ) {
                const deleteBullet = this.bullets[i];
                deleteBullet.textures = sheets.death;
                deleteBullet.play();
                this.bullets.splice(i, 1);
                deleteBullet.onComplete = () => {
                    deleteBullet.dead = true;
                    app.stage.removeChild(deleteBullet);
                };
            }
        }
    };
};

export default addPlayerActions;
