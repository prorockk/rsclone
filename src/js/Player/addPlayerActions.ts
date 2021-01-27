import * as PIXI from "pixi.js";
import { app } from "../script";
import { currentRoom, PlayerMethod, rooms } from "../Rooms/startGame";
import checkTexture from "../checkBounds/checkTexture";
import tearsSheets from "../CreateSprite/tearsSheets";
import createElement from "../CreateSprite/createGameElement";
import { changeLife } from "../topPanel/createLife";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { soundGame } from "../otherScripts/sound";

const addPlayerActions = () => {
    PlayerMethod.bullets = []; //новые скилы героя

    const animate = tearsSheets();
    const sheets = animate.sheets;
    let switcherTears = true;
    let tearsAr: number[] = [];

    PlayerMethod.playerShooting = function (e: { x: any; y: any } | string) {
        if (tearsAr.length > 0) return; //блокирование частых выстрелов
        tearsAr.push(0);
        setTimeout(() => (tearsAr = []), 370);

        //добавляем функции для скилов героя
        let bulletDirection;
        const bulletSpeed = 8;
        let tearPosition = 20; //выстрелы из разных глаз
        if (switcherTears) {
            tearPosition = 10;
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

        const startPointBullet = bulletDirection === "up" ? 25 : 7.5; //коректировка выстрелов вверх
        animate.propertiesAr[0].x = this.player.getBounds().x + tearPosition;
        animate.propertiesAr[0].y = this.player.getBounds().y - startPointBullet;

        this.head.textures = this.playerSheets[`${bulletDirection}See`]; //изменение напрвления головы
        this.head.play();
        this.head.onComplete = () => {
            this.head.textures = this.playerSheets.standSee;
            this.head.play();
        };
        const [bullet]: any = new createElement().addAnimateElement(animate);

        bullet.speed = bulletSpeed;
        bullet.scale.set(1.2);
        bullet.forMobs = true;
        bullet.direction = bulletDirection;
        this.bullets.push(bullet);
        switcherTears ? soundGame("tear1", false) : soundGame("tear2", false);
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
            if (checkTexture(0, this.bullets[i])) {
                const deleteBullet = this.bullets[i];
                deleteBullet.textures = sheets.death;
                deleteBullet.play();
                this.bullets.splice(i, 1);
                soundGame("tearPop", false);
                deleteBullet.onComplete = () => {
                    deleteBullet.dead = true;
                    app.stage.removeChild(deleteBullet);
                };
            }
        }
    };

    PlayerMethod.buffPlayer = function (item: any) {
        let result = true;
        const url = item.url;
        switch (url) {
            case "hp.png":
                const hp = 6 - this.head.hp;
                switch (hp) {
                    case 0:
                        return false;
                    case 1:
                        changeLife(1);
                        return true;
                    default:
                        changeLife(2);
                        return true;
                }
                this.hp = this.head.hp;
            case "belt.png":
                this.head.textures = this.playerSheets.buff;
                this.head.anchor.set(0.5);
                this.head.play();
                item.getBounds().x = this.head.getBounds().x;
                item.getBounds().y = this.head.getBounds().y;
                item.anchor.set(0.5, 2.2);
                result = false;
                this.froze = true;
                setTimeout(() => {
                    rooms[currentRoom].removeChild(item);
                    this.head.anchor.set(0.5, 0.95);
                    this.head.textures = this.playerSheets.standSee;
                    this.head.play();
                    this.playerSpeed = 4;
                    this.player.speed = this.playerSpeed;
                    this.froze = false;
                }, 500);
        }
        objectOfGameObjects[currentRoom][url] = [];
        return result;
    };
};

export default addPlayerActions;
