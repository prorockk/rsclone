import * as PIXI from "pixi.js";
import { app } from "../script";
import { createAnimateElement } from "../CreateSprite/createAnimateSheets";
import CheckBounds from "../checkBounds/checkBounds";
import { AnimateMobType } from "../types/Types";

class createPlayer {
    [x: string]: any;
    constructor() {
        this.playerSheets = {};
        this.playerSpeed = 3;
        this.activeKeys = {};
        this.player = {};
    }
    init = () => {
        window.addEventListener("keydown", (key) => {
            this.activeKeys[key.keyCode] = true;
        });

        window.addEventListener("keyup", (key) => {
            this.activeKeys[key.keyCode] = false;
        });

        return this.player;
    };
    doneLoading = () => {
        //createSheets...........
        const animate: AnimateMobType = {
            texture: {
                walkDown: ["isaac_moving_table-9.png", "isaac_moving_table-11.png", "isaac_moving_table-10.png"],
                walkUp: ["isaac_moving_table-2.png", "isaac_moving_table-0.png", "isaac_moving_table-1.png"],
                walkLeft: ["isaac_moving_table-3.png", "isaac_moving_table-5.png", "isaac_moving_table-4.png"],
                walkRight: ["isaac_moving_table-6.png", "isaac_moving_table-8.png", "isaac_moving_table-7.png"],
            },
            propertiesAr: [
                {
                    sheetSpriteStr: "walkUp",
                    anchor: { set: 0.5 },
                    animationSpeed: 0.2,
                    loop: false,
                    x: app.view.width / 2,
                    y: app.view.height / 2,
                },
            ],
        };
        const [sheets, playerObj] = createAnimateElement(animate);
        this.playerSheets = sheets;
        this.player = playerObj;
    };
    movePlayer() {
        const checkBounds = new CheckBounds(this.player);
        const playerPlay = (direction: string) => {
            this.player.textures = this.playerSheets[`walk${direction}`];
            this.player.play();
        };
        if (this.activeKeys["68"] && !checkBounds.init("right")) {
            if (!this.player.playing) {
                playerPlay("Right");
            }
            this.player.x += this.playerSpeed;
        }
        if (this.activeKeys["87"] && !checkBounds.init("down")) {
            if (!this.player.playing) {
                playerPlay("Down");
            }
            this.player.y -= this.playerSpeed;
        }
        if (this.activeKeys["65"] && !checkBounds.init("left")) {
            if (!this.player.playing) {
                playerPlay("Left");
            }
            this.player.x -= this.playerSpeed;
        }
        if (this.activeKeys["83"] && !checkBounds.init("top")) {
            if (!this.player.playing) {
                playerPlay("Up");
            }
            this.player.y += this.playerSpeed;
        }
    }
}

export default createPlayer;
