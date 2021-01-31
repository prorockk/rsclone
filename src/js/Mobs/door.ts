import * as PIXI from "pixi.js";
import { app } from "../script";
import { countMobs, currentRoom, player, rooms } from "../Rooms/startGame";
import Mobs from "./Mobs";

class Doors extends Mobs {
    boolDeath: boolean;
    constructor() {
        super("door");
        this.boolDeath = true;
    }
    loadUp() {
        if (countMobs.count > 0) {
            this.mob.forEach((door: any, count) => {
                if (count === 0) {
                    this.sound("doorClose", false);
                    currentRoom !== "inTenthRoom" ? this.sound("floorMusic", false) : this.sound("bossMusic", true);
                }
                door.textures = this.sheets[`${door.sheetSpriteStr}Close`];
                door.play();
            });
            app.ticker.add(() => {
                this.close();
            });
        }

        this.mob.forEach((door: any) => {
            door.scale.set(1.08);
        });
    }
    close() {
        if (countMobs.count <= 0 && this.boolDeath) {
            this.boolDeath = false;
            this.mob.forEach((door: any, count: number) => {
                if (count === 0) {
                    this.sound("doorOpen", false);
                    this.sound("floorMusic", true);
                    this.sound("bossMusic", true);
                }
                door.textures = this.sheets[`${door.sheetSpriteStr}Open`];
                door.play();
            });
        }
    }
}

export default Doors;
