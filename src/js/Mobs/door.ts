import * as PIXI from "pixi.js";
import { app } from "../script";
import { mainCounter, currentRoom, rooms } from "../Rooms/startGame";
import Mobs from "./Mobs";
import { gameObjects } from "../CreateSprite/GameObjects";

class Doors extends Mobs {
    boolDeath: boolean;

    constructor() {
        super("door");
        this.boolDeath = true;
    }

    loadUp() {
        if (mainCounter.count > 0) {
            this.mob.forEach((door: any, count) => {
                if (count === 0) {
                    if (currentRoom === "inTenthRoom") {
                        this.sound("bossEnter");
                        this.sound("floorMusic", true);
                        this.sound("bossMusic");
                    } else this.sound("doorClose");
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
        if (mainCounter.count <= 0 && this.boolDeath) {
            this.boolDeath = false;
            this.mob.forEach((door: any, count: number) => {
                if (count === 0) {
                    this.sound("doorOpen");
                    if (currentRoom === "inTenthRoom") {
                        const texture = PIXI.Texture.from("trap_door1.png");
                        const bowl: any = PIXI.Sprite.from(texture);
                        bowl.anchor.set(0.5);
                        bowl.x = 270;
                        bowl.y = 230;
                        bowl.url = "trap_door1.png";
                        bowl.angryMob = false;
                        gameObjects[currentRoom]["trap_door1.png"] = [bowl];
                        rooms[currentRoom].addChild(bowl);
                    }
                }
                door.textures = this.sheets[`${door.sheetSpriteStr}Open`];
                door.play();
            });
        }
    }
}

export default Doors;
