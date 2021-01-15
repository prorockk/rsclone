import * as PIXI from "pixi.js";
import { app } from "../script";
import { globalEl } from "../Rooms/startGame";
import { createAnimateElement } from "../CreateSprite/createAnimateSheets";
import checkBounds from "../checkBounds/checkBounds";
import { AnimateMobType } from "../types/Types";

class Fly {
    private fly: any;
    private flySheets: any;
    boolDeath: boolean;
    constructor() {
        this.flySheets = {};
        this.boolDeath = true;
        this.fly = {};
    }
    doneLoading() {
        const animate: AnimateMobType = {
            texture: {
                fly: ["fly1-1.png", "fly1-2.png"],
                death: ["fly-death1.png", "fly-death2.png", "fly-death3.png", "fly-death4.png", "fly-death5.png"],
            },
            propertiesAr: [
                {
                    sheetSpriteStr: "fly",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.4,
                    loop: true,
                    x: app.view.width / 4,
                    y: app.view.height / 4,
                },
                {
                    sheetSpriteStr: "fly",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.4,
                    loop: true,
                    x: app.view.width / 1.5,
                    y: app.view.height / 1.5,
                },
                {
                    sheetSpriteStr: "fly",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.4,
                    loop: true,
                    x: app.view.width / 1.1,
                    y: app.view.height / 1.1,
                },
            ],
        };
        const [sheets, ...fly] = createAnimateElement(animate);
        this.flySheets = sheets;
        this.fly = fly;
        this.fly.forEach((fly: { hp: number }) => {
            fly.hp = 3;
        });
        globalEl.fly = fly;
        app.ticker.add(() => {
            this.moveFly();
        });
    }
    moveFly() {
        // if (this.flyOne.hp === 0) {

        // }

        const playerX = globalEl.player.x;
        const playerY = globalEl.player.y;
        this.fly.forEach((flyOne: any) => {
            if (flyOne.hp === 0 && this.boolDeath) {
                flyOne.textures = this.flySheets.death;
                flyOne.loop = false;
                this.fly.splice(this.fly.indexOf(flyOne), 1);
                flyOne.play();
                this.boolDeath = false;
                flyOne.onComplete = () => {
                    flyOne.dead = true;
                    app.stage.removeChild(flyOne);
                    this.boolDeath = true;
                };
            }
            const randomSymbol = Math.ceil(Math.random() - 0.5) - 0.2;
            const flyX = flyOne.x;
            const flyY = flyOne.y;
            if (playerX > flyX && randomSymbol > 0) {
                flyOne.x += 0.9;
                flyOne.y += 0.6 * randomSymbol;
            } else if (randomSymbol < 0) {
                flyOne.x -= 0.9;
                flyOne.y += 0.6 * randomSymbol;
            }
            if (playerY > flyY && randomSymbol < 0) {
                flyOne.y += 0.9;
                flyOne.x += 0.6 * randomSymbol;
            } else if (randomSymbol > 0) {
                flyOne.y -= 0.9;
                flyOne.x += 0.6 * randomSymbol;
            }
        });
    }
}

export default Fly;
