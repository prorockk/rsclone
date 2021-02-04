/* eslint-disable import/no-cycle */
import { app } from "../script";
import CheckBounds from "../checkBounds/checkBounds";
import { AnimateMobType } from "../types/Types";
import addPlayerActions from "./addPlayerActions";
import checkCollision from "../checkBounds/checkCollision";
import checkTexture from "../checkBounds/checkTexture";
import { changeLife } from "../topPanel/createLife";
import createElement from "../CreateSprite/createGameElement";
import deathPlayer from "../Rooms/deathPlayer";
import { moveControls } from "../otherScripts/changeControls";
import { soundGame } from "../otherScripts/sound";

class createPlayer {
    [x: string]: any;

    constructor() {
        this.playerSheets = {};
        this.playerSpeed = 3;
        this.activeKeys = {};
        this.player = {};
        this.legs = {};
        this.head = {};
        this.hp = 6;
        this.froze = false;
    }

    init = () => [this.player, this.head];

    doneLoading = () => {
        const animate: AnimateMobType = {
            name: "player",
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
                buff: ["buff.png"],
                end: ["end.png"],
                win: ["win.png"],
            },
            propertiesAr: [
                {
                    sheetSpriteStr: "upWalk",
                    animationSpeed: 0.2,
                    anchor: 0.5,
                    loop: false,
                    x: app.view.width / 2,
                    y: app.view.height / 2,
                },
                {
                    sheetSpriteStr: "standSee",
                    animationSpeed: 0.11,
                    anchor: 0.5,
                    loop: false,
                    x: app.view.width / 2,
                    y: app.view.height / 2,
                },
            ],
            setBool: false,
        };
        const [sheets, legs, head]: any[] = new createElement().createAnimateElement(animate);
        this.playerSheets = sheets;
        head.anchor.set(0.5, 0.95);
        head.scale.set(1.5);
        legs.scale.set(1.5);
        head.hp = 6;
        this.player = legs;
        this.head = head;
        this.head.death = false;
        this.player.speed = this.playerSpeed;
        this.player.play();
        this.checkBounds = new CheckBounds(this.player, this.head);

        addPlayerActions();

        app.ticker.add((e: number) => {
            this.movePlayer();
            this.updateBullets(e);
            checkTexture(e, this.head, 0);
        });
    };

    movePlayer(): void {
        if (this.head.hp < this.hp || this.froze) {
            this.froze = true;
            if (this.head.death) return;
            if (this.head.hp <= 0) {
                changeLife(-2);
                this.head.death = true;
                this.head.textures = this.playerSheets.end;
                this.head.anchor.set(0.5);
                this.head.onComplete = null;
                this.head.play();
                deathPlayer();
            } else if (this.head.hp < this.hp) {
                changeLife(-1);
                if (this.head.hp + 1 < this.hp) {
                    soundGame("hurt3", false);
                    changeLife(-1);
                    this.head.textures = this.playerSheets.hit;
                    this.head.anchor.set(0.5);
                    this.head.play();
                } else {
                    this.head.hp % 2 === 0 ? soundGame("hurt2", false) : soundGame("hurt1", false);
                }
                this.player.alpha = 0;
                this.head.alpha = 0;
                let visual: boolean = true;
                const intTint = setInterval(() => {
                    const changeAlpha = (current: number): void => {
                        this.player.alpha = current;
                        this.head.alpha = current;
                        visual = !visual;
                    };
                    visual ? changeAlpha(1) : changeAlpha(0);
                    this.player.tint = 16716853;
                    this.head.tint = 16716853;
                }, 100);
                setTimeout(() => {
                    clearInterval(intTint);
                    if (this.head.hp > 0) {
                        this.head.anchor.set(0.5, 0.95);
                        this.head.textures = this.playerSheets.standSee;
                        this.head.play();
                    }
                    this.froze = false;
                    this.player.tint = 16777215;
                    this.head.tint = 16777215;
                    this.player.alpha = 1;
                    this.head.alpha = 1;
                }, 250);
            }
            this.hp = this.head.hp;
            return;
        }

        this.player.x = this.head.x;
        this.player.y = this.head.y;
        const playerPlay = (direction: string): void => {
            this.player.textures = this.playerSheets[`${direction}Walk`];
            this.player.play();
        };
        if (this.activeKeys[moveControls.right] && !checkCollision(this.player, "right")) {
            if (!this.player.playing) {
                playerPlay("right");
            }
            this.player.x += this.playerSpeed;
            this.head.x += this.playerSpeed;
        }
        if (this.activeKeys[moveControls.up] && !checkCollision(this.player, "top")) {
            if (!this.player.playing) {
                playerPlay("up");
            }
            this.player.y -= this.playerSpeed;
            this.head.y -= this.playerSpeed;
        }
        if (this.activeKeys[moveControls.left] && !checkCollision(this.player, "left")) {
            if (!this.player.playing) {
                playerPlay("left");
            }
            this.player.x -= this.playerSpeed;
            this.head.x -= this.playerSpeed;
        }
        if (this.activeKeys[moveControls.down] && !checkCollision(this.player, "down")) {
            if (!this.player.playing) {
                playerPlay("down");
            }
            this.player.y += this.playerSpeed;
            this.head.y += this.playerSpeed;
        }
        if (this.checkBounds.init()) {
            this.bullets.forEach((bullet: any) => {
                app.stage.removeChild(bullet);
            });
        }
    }
}

export default createPlayer;
