import * as PIXI from "pixi.js";
import { app } from "../script";
import { createAnimateElement } from "../CreateSprite/createAnimateSheets";
import CheckBounds from "../checkBounds/checkBounds";
import { AnimateMobType } from "../types/Types";
import addPlayerActions from "./addPlayerActions";
import checkTexture from "../checkBounds/checkTexture";
import checkCollision from "../checkBounds/checkCollision";
import { threadId } from "worker_threads";

class createPlayer {
    [x: string]: any;
    constructor() {
        this.playerSheets = {};
        this.playerSpeed = 3;
        this.activeKeys = {};
        this.player = {};
        this.legs = {};
        this.head = {};
        this.hp = 16;
        this.froze = false;
    }
    init = () => {
        return this.player;
    };
    doneLoading = () => {
        //createSheets...........
        const animate: AnimateMobType = {
            texture: {
                downWalk: ["to1.png", "to2.png", "stand.png"],
                upWalk: ["out1.png", "out2.png", "stand.png"],
                leftWalk: ["left1.png", "left2.png", "left3.png", "stand.png"],
                rightWalk: ["right1.png", "right2.png", "right3.png", "stand.png"],
                upSee: ["isaac-out1.png", "isaac-out2.png", "isaac-out2.png"],
                downSee: ["isaac-to1.png", "isaac-to2.png", "isaac-to2.png"],
                rightSee: ["isaac-right1.png", "isaac-right2.png", "isaac-right2.png"],
                leftSee: ["isaac-left1.png", "isaac-left2.png", "isaac-left2.png"],
                standSee: ["isaac-to2.png"],
                hit: ["isaac-hit.png"],
            },
            propertiesAr: [
                {
                    sheetSpriteStr: "upWalk",
                    animationSpeed: 0.2,
                    anchor: { set: 0.5 },
                    loop: false,
                    x: app.view.width / 2,
                    y: app.view.height / 2,
                },
                {
                    sheetSpriteStr: "standSee",
                    animationSpeed: 0.11,
                    anchor: { set: 0.5 },
                    loop: false,
                    x: app.view.width / 2,
                    y: app.view.height / 2,
                },
            ],
            setBool: false,
        };
        const [sheets, legs, head] = createAnimateElement(animate);
        this.playerSheets = sheets;
        head.anchor.set(0.5, 0.93);
        head.hp = 16;
        this.player = legs;
        this.head = head;
        this.checkBounds = new CheckBounds(this.player);

        addPlayerActions();
        app.ticker.add((e: number) => {
            this.movePlayer();
            this.updateBullets(e);
            checkTexture(e, this.head, 0);
        });
    };
    movePlayer() {
        if (this.head.hp < this.hp || this.froze) {
            //анимация нанесения урона
            this.froze = true;
            if (this.head.hp + 1 < this.hp) {
                //если большой дамаг то меняем текстурку
                this.head.textures = this.playerSheets.hit;
                this.head.anchor.set(0.5);
                this.head.play();
            }
            if (this.head.hp < this.hp) {
                // при малом и большом домаге добавляем мигание один раз
                const intTint = setInterval(() => {
                    this.player.tint = 16777215;
                    this.head.tint = 16777215;
                }, 10);
                setTimeout(() => {
                    clearInterval(intTint);
                    this.head.anchor.set(0.5, 1.05);
                    this.head.textures = this.playerSheets.standSee;
                    this.head.play();
                    this.froze = false;
                }, 200);
            }
            this.player.tint = 16716853;
            this.head.tint = 16716853;
            this.hp = this.head.hp;
            return;
        }
        this.player.x = this.head.x;
        this.player.y = this.head.y;
        const playerPlay = (direction: string) => {
            this.player.textures = this.playerSheets[`${direction}Walk`];
            this.player.play();
        };
        if (
            this.activeKeys["68"] &&
            !this.checkBounds.init("right") &&
            !checkCollision(this.player, this.head, "right")
        ) {
            if (!this.player.playing) {
                playerPlay("right");
            }
            this.player.x += this.playerSpeed;
            this.head.x += this.playerSpeed;
        }
        if (this.activeKeys["87"] && !this.checkBounds.init("Up") && !checkCollision(this.player, this.head, "top")) {
            if (!this.player.playing) {
                playerPlay("up");
            }
            this.player.y -= this.playerSpeed;
            this.head.y -= this.playerSpeed;
        }
        if (
            this.activeKeys["65"] &&
            !this.checkBounds.init("left") &&
            !checkCollision(this.player, this.head, "left")
        ) {
            if (!this.player.playing) {
                playerPlay("left");
            }
            this.player.x -= this.playerSpeed;
            this.head.x -= this.playerSpeed;
        }
        if (
            this.activeKeys["83"] &&
            !this.checkBounds.init("down") &&
            !checkCollision(this.player, this.head, "down")
        ) {
            if (!this.player.playing) {
                playerPlay("down");
            }
            this.player.y += this.playerSpeed;
            this.head.y += this.playerSpeed;
        }
    }
}

export default createPlayer;
