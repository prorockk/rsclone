import * as PIXI from "pixi.js";
import { app, globalEl, PlayerMethod } from "../script";
import createPlayer from "./createPlayer";
import createGameElement from "../CreateSprite/createGameElement";

import checkTexture from "../checkBounds/checkTexture";

const addPlayerActions = () => {
    PlayerMethod.bullets = []; //новые скилы героя

    const box: any = createGameElement(256, 128, "../../../assets/box.png", 30, 23); // не отображает почему-то !!!!!

    PlayerMethod.playerShooting = function (e: { x: any; y: any }) {
        //добавляем функции для скилов героя
        let bulletDirection;
        const cursorPositionX = e.x;
        const cursorPositionY = e.y;
        const bulletSpeed = 8;
        if (Math.abs(cursorPositionX - this.player.x) > Math.abs(cursorPositionY - this.player.y)) {
            bulletDirection = cursorPositionX > this.player.x ? "right" : "left";
        } else {
            bulletDirection = cursorPositionY > this.player.y ? "down" : "up";
        }

        const bullet: any = createGameElement(this.player.x, this.player.y, "tear.png", 13, 13);
        bullet["speed"] = bulletSpeed;
        bullet["direction"] = bulletDirection;

        this.bullets.push(bullet);
    };

    PlayerMethod.updateBullets = function () {
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
                this.bullets[i].position.y < 65 ||
                this.bullets[i].position.y > 432 ||
                this.bullets[i].position.x < 55 ||
                this.bullets[i].position.x > 465 ||
                checkTexture(this.bullets[i], box) ||
                checkTexture(this.bullets[i], globalEl.fly[0])
            ) {
                this.bullets[i].dead = true;
                app.stage.removeChild(this.bullets[i]);
                this.bullets.splice(i, 1);
            }
        }
    };
};

export default addPlayerActions;
