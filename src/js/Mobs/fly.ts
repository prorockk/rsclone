import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { app } from "../script";
import { currentRoom, player, rooms } from "../Rooms/startGame";
import { addAnimateElement, createAnimateElement } from "../CreateSprite/createAnimateSheets";
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
        if (!objectOfGameObjects[currentRoom].hasOwnProperty("fly")) return;

        this.fly = objectOfGameObjects[currentRoom].fly;
        //const simplyFly = objectOfGameObjects[currentRoom].simplyFly;

        this.flySheets = this.fly[0].sheets;

        this.fly.forEach((flyOne: any, current: number) => {
            if (current % 2 === 0) {
                flyOne.hp = 2;
                flyOne.angryMob = true;
                flyOne.damage = 1;
            } else {
                flyOne.hp = 1;
                flyOne.angryMob = false;
                flyOne.damage = 0;
            }
            flyOne.froze = false;
            flyOne.play();
        });
        app.ticker.add(() => {
            this.moveFly();
        });
    }
    create() {
        const randCurrentFly = Math.ceil(Math.random() * 4);
        const properties = {
            sheetSpriteStr: "fly",
            anchor: 0.5,
            animationSpeed: 0.4,
            loop: true,
            x: 0, //(Math.random() - 0.5) * 5,
            y: 0, //(Math.random() - 0.5) * 5
        };
        const flyAr: any[] = addAnimateElement(this.flySheets, new Array(randCurrentFly).fill(properties), "fly");
        flyAr.forEach((flyOne: any) => {
            flyOne.hp = 3;
            flyOne.angryMob = true;
            flyOne.froze = false;
            flyOne.damage = 2;
            flyOne.play();
        });
        return flyAr;
    }
    moveFly() {
        const playerX = player.getBounds().x;
        const playerY = player.getBounds().y;
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
                    rooms[currentRoom].removeChild(flyOne);
                    this.boolDeath = true;
                };
            } else if (flyOne.froze) {
                //анимация нанесения урона
                if (Array.isArray(flyOne.froze)) {
                    flyOne.hp--;
                    const impulse = flyOne.froze.slice();
                    const intTint = setInterval(() => {
                        // перемещение и  мигание один раз
                        flyOne.x -= impulse[0];
                        flyOne.y -= impulse[1];
                        flyOne.tint = 16716853;
                    }, 60);
                    setTimeout(() => {
                        clearInterval(intTint);
                        flyOne.tint = 16777215;
                        flyOne.froze = false;
                    }, 300);
                }

                flyOne.froze = true;
                flyOne.tint = 16716853;
            } else if (flyOne.angryMob) {
                const randomSymbol = Math.ceil(Math.random() - 0.5) - 0.2;
                const flyX = flyOne.getBounds().x;
                const flyY = flyOne.getBounds().y;
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
            }
        });
    }
}

export default Fly;
