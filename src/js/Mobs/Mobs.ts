import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { app } from "../script";
import { currentRoom, player, rooms } from "../Rooms/startGame";
import { addAnimateElement, createAnimateElement } from "../CreateSprite/createAnimateSheets";
import { AnimateMobType } from "../types/Types";

class Mobs {
    boolDeath: boolean;
    name: any;
    mob: any[];
    sheets: any;
    constructor(name: string) {
        this.name = name;
        this.sheets = {};
        this.boolDeath = true;
        this.mob = [];
    }
    doneLoading() {
        if (!objectOfGameObjects[currentRoom].hasOwnProperty(this.name)) return;

        this.mob = objectOfGameObjects[currentRoom].potter;

        this.sheets = this.mob[0].sheets;

        this.loadUp();
    }
    loadUp() {
        this.mob.forEach((mobOne: any) => {
            mobOne.hp = 2;
            mobOne.angryMob = true;
            mobOne.damage = 1;
            mobOne.froze = false;
            mobOne.play();
        });
        return;
    }
    deleteMob(mobOne: { textures: any; loop: boolean; play: () => void; onComplete: () => void; dead: boolean }) {
        mobOne.textures = this.sheets.death;
        mobOne.loop = false;
        this.mob.splice(this.mob.indexOf(mobOne), 1);
        mobOne.play();
        this.boolDeath = false;
        mobOne.onComplete = () => {
            mobOne.dead = true;
            rooms[currentRoom].removeChild(mobOne);
            this.boolDeath = true;
        };
    }
    frozeMob(mobOne: { froze: string | boolean | any[]; hp: number; x: number; y: number; tint: number }) {
        if (Array.isArray(mobOne.froze)) {
            mobOne.hp--;
            const impulse = mobOne.froze.slice();
            const intTint = setInterval(() => {
                // перемещение и  мигание один раз
                mobOne.x -= impulse[0];
                mobOne.y -= impulse[1];
                mobOne.tint = 16716853;
            }, 60);
            setTimeout(() => {
                clearInterval(intTint);
                mobOne.tint = 16777215;
                mobOne.froze = false;
            }, 300);
        }
        mobOne.froze = true;
        mobOne.tint = 16716853;
    }
}

export default Mobs;
