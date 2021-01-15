import * as PIXI from "pixi.js";
import { app, globalEl } from "../script";
import { createAnimateElement } from "../CreateSprite/createAnimateSheets";
import checkBounds from "../checkBounds/checkBounds";
import { AnimateMobType } from "../types/Types";

class gaper {
    private gaper: any;
    private gaperSheets: any;
    boolDeath: boolean;
    constructor() {
        this.gaperSheets = {};
        this.boolDeath = true;
        this.gaper = {};
    }
    doneLoading() {
        const animate: AnimateMobType = {
            texture: {
                sleep: ["gaper-sleep-tell.png", "gaper-sleep-norm.png"],
                death: [
                    "gaper-death1.png",
                    "gaper-death2.png",
                    "gaper-death3.png",
                    "gaper-death4.png",
                    "gaper-death5.png",
                ],
            },
            propertiesAr: [
                {
                    sheetSpriteStr: "sleep",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.1,
                    loop: true,
                    x: app.view.width / 4,
                    y: app.view.height / 4,
                },
                {
                    sheetSpriteStr: "gaper",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.4,
                    loop: true,
                    x: app.view.width / 1.5,
                    y: app.view.height / 1.5,
                },
                {
                    sheetSpriteStr: "gaper",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.4,
                    loop: true,
                    x: app.view.width / 1.1,
                    y: app.view.height / 1.1,
                },
            ],
        };
        const [sheets, ...gaper] = createAnimateElement(animate);
        this.gaperSheets = sheets;
        this.gaper = gaper;
        this.gaper.forEach((gaper: { hp: number }) => {
            gaper.hp = 3;
        });
        globalEl.gaper = gaper;
        app.ticker.add(() => {
            this.movegaper();
        });
    }
    movegaper() {
        // if (this.gaperOne.hp === 0) {

        // }

        const playerX = globalEl.player.x;
        const playerY = globalEl.player.y;
        this.gaper.forEach((gaperOne: any) => {
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
            }
            const randomSymbol = Math.ceil(Math.random() - 0.5) - 0.2;
            const gaperX = gaperOne.x;
            const gaperY = gaperOne.y;
            if (playerX > gaperX && randomSymbol > 0) {
                gaperOne.x += 0.9;
                gaperOne.y += 0.6 * randomSymbol;
            } else if (randomSymbol < 0) {
                gaperOne.x -= 0.9;
                gaperOne.y += 0.6 * randomSymbol;
            }
            if (playerY > gaperY && randomSymbol < 0) {
                gaperOne.y += 0.9;
                gaperOne.x += 0.6 * randomSymbol;
            } else if (randomSymbol > 0) {
                gaperOne.y -= 0.9;
                gaperOne.x += 0.6 * randomSymbol;
            }
        });
    }
}

export default gaper;
