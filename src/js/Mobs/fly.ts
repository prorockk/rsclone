import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { app } from "../script";
import { player } from "../Rooms/startGame";
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
        const animate: any = {
            texture: {
                fly: ["fly2-1.png", "fly1-2.png"],
                death: ["fly-death1.png", "fly-death2.png", "fly-death3.png", "fly-death4.png", "fly-death5.png"],
            },
            propertiesAr: [
                {
                    sheetSpriteStr: "fly",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.3,
                    loop: true,
                    x: app.view.width / 4,
                    y: app.view.height / 4,
                },
                {
                    sheetSpriteStr: "fly",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.3,
                    loop: true,
                    x: app.view.width / 1.5,
                    y: app.view.height / 1.5,
                },
                {
                    sheetSpriteStr: "fly",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.3,
                    loop: true,
                    x: app.view.width / 1.1,
                    y: app.view.height / 1.1,
                },
            ],
            setBool: false,
            angryMob: true,
        };
        const [sheets, ...fly] = createAnimateElement(animate);
        this.flySheets = sheets;
        this.fly = fly;
        this.fly.forEach((fly: any) => {
            fly.hp = 5;
            fly.angryMob = true;
            fly.damage = 2;
        });
        objectOfGameObjects.fly = fly;
        app.ticker.add(() => {
            this.moveFly();
        });
    }
    moveFly() {
        const playerX = player.x;
        const playerY = player.y;
        this.fly.forEach((flyOne: any) => {
            if (flyOne.hp === 0 && this.boolDeath) {
                //удаление мух с запуском поледней анимации
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
