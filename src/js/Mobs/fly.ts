import * as PIXI from "pixi.js";
import { app } from "../script";
import { countMobs, currentRoom, player, rooms } from "../Rooms/startGame";
import { AnimateMobType } from "../types/Types";
import Mobs from "./Mobs";
import createElement from "../CreateSprite/createGameElement";

class Fly extends Mobs {
    boolDeath: boolean;
    constructor() {
        super("fly");
        this.boolDeath = true;
    }
    loadUp() {
        this.mob.forEach((flyOne: any, current: number) => {
            if (current % 2 !== 0) {
                flyOne.hp = 2;
                flyOne.angryMob = true;
                flyOne.damage = 1;
            } else {
                flyOne.hp = 1;
                flyOne.angryMob = false;
                flyOne.damage = 0;
            }
            flyOne.freeze = false;
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
            x: 0,
            y: 0,
        };
        const animateObj = {
            sheets: this.sheets,
            propertiesAr: new Array(randCurrentFly).fill(properties),
            room: currentRoom,
            name: "fly",
        };
        const flyAr: any[] = new createElement(rooms).addAnimateElement(animateObj);
        flyAr.forEach((flyOne: any) => {
            flyOne.hp = 3;
            flyOne.angryMob = true;
            flyOne.freeze = false;
            flyOne.damage = 1;
            flyOne.play();
        });
        countMobs.count += flyAr.length;
        return flyAr;
    }
    moveFly() {
        const playerX = player.getBounds().x;
        const playerY = player.getBounds().y;
        this.mob.forEach((flyOne: any) => {
            if (flyOne.hp === 0 && this.boolDeath) {
                //удаление мух с запуском поледней анимации
                this.deleteMob(flyOne);
            } else if (flyOne.freeze) {
                //анимация нанесения урона
                this.freezeMob(flyOne);
            } else if (flyOne.angryMob) {
                const randomSymbol = Math.ceil(Math.random() - 0.5) - 0.2;
                const flyX = flyOne.getBounds().x;
                const flyY = flyOne.getBounds().y;
                if (playerX > flyX) {
                    flyOne.x += 0.9;
                    flyOne.y += 0.4 * randomSymbol;
                } else {
                    flyOne.x -= 0.9;
                    flyOne.y += 0.4 * randomSymbol;
                }
                if (playerY > flyY) {
                    flyOne.y += 0.9;
                    flyOne.x += 0.4 * randomSymbol;
                } else {
                    flyOne.y -= 0.9;
                    flyOne.x += 0.4 * randomSymbol;
                }
                flyOne.y += 0.5 * randomSymbol;
                flyOne.x += 0.5 * randomSymbol;
            }
        });
    }
}

export default Fly;
