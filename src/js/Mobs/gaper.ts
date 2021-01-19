import * as PIXI from "pixi.js";
import { app } from "../script";
import { addAnimateElement, createAnimateElement } from "../CreateSprite/createAnimateSheets";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { AnimateMobType } from "../types/Types";
import { player } from "../Rooms/startGame";
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
        this.gaper = {};
        this.moveCurrent = 0;
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
    }
    doneLoading() {
        const animate: AnimateMobType = {
            texture: {
                angry: ["gaper-angry-tell.png", "gaper-angry.png"],
                // death: [
                //     "gaper-death1.png",
                //     "gaper-death2.png",
                //     "gaper-death3.png",
                //     "gaper-death4.png",
                //     "gaper-death5.png",
                // ],
            },
            propertiesAr: [
                {
                    sheetSpriteStr: "angry",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.05,
                    loop: false,
                    x: app.view.width / 3.2,
                    y: app.view.height / 1.5,
                },
                {
                    sheetSpriteStr: "angry",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.05,
                    loop: false,
                    x: app.view.width / 2,
                    y: app.view.height / 1.6,
                },
                {
                    sheetSpriteStr: "angry",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.05,
                    loop: false,
                    x: app.view.width / 2.5,
                    y: app.view.height / 2.5,
                },
            ],
            setBool: false,
        };
        const [sheets, ...gaper] = createAnimateElement(animate);
        this.gaperSheets = sheets;
        this.gaper = gaper;
        this.gaper.forEach((gaperOne: any) => {
            gaperOne.hp = 150;
            gaperOne.angryMob = true;
            gaperOne.froze = false;
            gaperOne.damage = 2;
        });
        const [sheetsBullets, animateBullets] = tearsSheets();
        this.sheetsBullets = sheetsBullets;
        this.animateBullets = animateBullets;
        objectOfGameObjects.gaper = gaper;
        app.ticker.add(() => {
            this.moveGaper();
        });
    }
    moveGaper() {
        this.gaper.forEach((gaperOne: any, currentGap: number) => {
            if (gaperOne.hp === 0 && this.boolDeath) {
                gaperOne.textures = this.gaperSheets.death;
                gaperOne.loop = false;
                this.gaper.splice(this.gaper.indexOf(gaperOne), 1);
                gaperOne.play();
                this.boolDeath = false;
                gaperOne.onComplete = () => {
                    gaperOne.dead = true;
                    app.stage.removeChild(gaperOne);
                    this.boolDeath = true;
                };
            } else if (gaperOne.froze) {
                //анимация нанесения урона
                if (typeof gaperOne.froze === "boolean") {
                    const intTint = setInterval(() => {
                        // при добавляем мигание один раз
                        gaperOne.tint = 16777215;
                    }, 10);
                    setTimeout(() => {
                        clearInterval(intTint);
                        gaperOne.froze = false;
                    }, 400);
                }
                gaperOne.froze = currentGap + 1;
                gaperOne.tint = 16716853;
            } else {
                if (this.moveCurrent % 10 === 5) {
                    //перемещение
                    gaperOne.x += 3;
                } else if (this.moveCurrent % 10 === 0) {
                    gaperOne.x -= 3;
                }
                if (this.moveCurrent % 80 === 0) {
                    //направление пуль и создание
                    this.animateBullets.propertiesAr[0].x = gaperOne.x;
                    this.animateBullets.propertiesAr[0].y = gaperOne.y;
                    const [bullet]: any = addAnimateElement(this.sheetsBullets, this.animateBullets.propertiesAr);
                    bullet.direction = [player.x, player.y]; //ЗАПОМИНАЕМ ПОЛОЖЕНИЕ ГЕРОЯ во время выстрела моба
                    bullet.tint = 9109504;
                    this.bullets.push(bullet);
                    gaperOne.textures = this.gaperSheets.angry;
                    gaperOne.play();
                }
                for (let i = 0; i < this.bullets.length; i++) {
                    //определение направления выстрела
                    const bullet = this.bullets[i];
                    const bulletSpeed = 2;
                    bullet.direction[0] > bullet.x
                        ? (bullet.position.x += bulletSpeed)
                        : (bullet.position.x -= bulletSpeed);
                    bullet.direction[1] > bullet.y
                        ? (bullet.position.y += bulletSpeed)
                        : (bullet.position.y -= bulletSpeed);

                    //удаление пуль
                    if (
                        this.bullets[i].position.y < 65 ||
                        this.bullets[i].position.y > 432 ||
                        this.bullets[i].position.x < 55 ||
                        this.bullets[i].position.x > 465 ||
                        checkTexture(0, this.bullets[i], gaperOne)
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
        });

        this.moveCurrent++;
    }
}

export default Gaper;
