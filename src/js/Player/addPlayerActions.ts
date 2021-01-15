import * as PIXI from "pixi.js";
import { app, PlayerMethod } from "../script";
import createPlayer from "./createPlayer";
import createGameElement from "../CreateSprite/createGameElement";
import checkTexture from "../checkBounds/checkTexture";
import { AnimateMobType } from "../types/Types";
import { addAnimateElement, createAnimateElement } from "../CreateSprite/createAnimateSheets";

const addPlayerActions = () => {
    PlayerMethod.bullets = []; //новые скилы героя

    const animate: AnimateMobType = {
        texture: {
            shot: ["tear_pop-0.png"],
            death: [
                "tear_pop-1.png",
                "tear_pop-2.png",
                "tear_pop-3.png",
                "tear_pop-4.png",
                "tear_pop-5.png",
                "tear_pop-6.png",
                "tear_pop-7.png",
                "tear_pop-8.png",
            ],
        },
        propertiesAr: [
            {
                sheetSpriteStr: "shot",
                anchor: { set: 0.5 },
                animationSpeed: 0.6,
                loop: false,
                width: 13,
                height: 13,
            },
        ],
        setBool: true,
    };
    const sheets = createAnimateElement(animate);
    let switcher = true;
    PlayerMethod.playerShooting = function (e: { x: any; y: any } | string) {
        //добавляем функции для скилов героя
        let bulletDirection;
        const bulletSpeed = 8;
        let tearPosition = 3;
        if (switcher) {
            tearPosition *= -1;
        }
        switcher = !switcher;
        if (typeof e === "string") {
            bulletDirection = e;
        } else {
            const cursorPositionX = e.x;
            const cursorPositionY = e.y;
            if (Math.abs(cursorPositionX - this.player.x) > Math.abs(cursorPositionY - this.player.y)) {
                bulletDirection = cursorPositionX > this.player.x ? "right" : "left";
            } else {
                bulletDirection = cursorPositionY > this.player.y ? "down" : "up";
            }
        }
        animate.propertiesAr[0].x = this.player.x + tearPosition;
        animate.propertiesAr[0].y = this.player.y + tearPosition;
        const [bullet]: any = addAnimateElement(sheets, animate.propertiesAr);
        bullet.hitArea = new PIXI.Polygon([0, 0, 0, 13, 13, 13, 13, 0]);
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
                checkTexture(this.bullets[i]) //                             NEW
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
