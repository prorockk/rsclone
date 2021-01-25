import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { app } from "../script";
import { countMobs, currentRoom, player, rooms } from "../Rooms/startGame";
import { addAnimateElement, createAnimateElement } from "../CreateSprite/createAnimateSheets";
import { AnimateMobType } from "../types/Types";
import Mobs from "./Mobs";

class Fly extends Mobs {
    boolDeath: boolean;
    constructor() {
        super("fly");
        this.boolDeath = true;
    }
    loadUp() {
        this.mob.forEach((flyOne: any, current: number) => {
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
        const randCurrentFly = Math.ceil(Math.random() * 3.5);
        const properties = {
            sheetSpriteStr: "fly",
            anchor: 0.5,
            animationSpeed: 0.4,
            loop: true,
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.4) * 10,
        };
        const flyAr: any[] = addAnimateElement(this.sheets, new Array(randCurrentFly).fill(properties), "fly");
        flyAr.forEach((flyOne: any) => {
            flyOne.hp = 3;
            flyOne.angryMob = true;
            flyOne.froze = false;
            flyOne.damage = 2;
            flyOne.play();
        });
        countMobs += flyAr.length;
        return flyAr;
    }
    moveFly() {
        const playerX = player.getBounds().x;
        const playerY = player.getBounds().y;
        this.mob.forEach((flyOne: any) => {
            if (flyOne.hp === 0 && this.boolDeath) {
                //удаление мух с запуском поледней анимации
                this.deleteMob(flyOne);
            } else if (flyOne.froze) {
                //анимация нанесения урона
                this.frozeMob(flyOne);
            } else if (flyOne.angryMob) {
                const randomSymbol = Math.ceil(Math.random() - 0.5) - 0.2;
                const flyX = flyOne.getBounds().x;
                const flyY = flyOne.getBounds().y;
                if (playerX > flyX) {
                    flyOne.x += 0.9;
                    flyOne.y += 0.6 * randomSymbol;
                } else {
                    flyOne.x -= 0.9;
                    flyOne.y += 0.6 * randomSymbol;
                }
                if (playerY > flyY) {
                    flyOne.y += 0.9;
                    flyOne.x += 0.6 * randomSymbol;
                } else {
                    flyOne.y -= 0.9;
                    flyOne.x += 0.6 * randomSymbol;
                }
            }
        });
    }
}

export default Fly;
