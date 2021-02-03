import * as PIXI from "pixi.js";
import { app } from "../script";
import { currentRoom, PlayerMethod, rooms } from "../Rooms/startGame";
import checkTexture from "../checkBounds/checkTexture";
import tearsSheets from "../CreateSprite/tearsSheets";
import createElement from "../CreateSprite/createGameElement";
import { changeLife } from "../topPanel/createLife";
import { gameObjects } from "../CreateSprite/GameObjects";
import { soundGame } from "../otherScripts/sound";
import { AnimateMobType } from "../types/Types";
import renderEndGame from "../otherScripts/endScreen";

const addPlayerActions = (): void => {
    PlayerMethod.bullets = [];

    const animate: AnimateMobType = tearsSheets();
    const sheets: any = animate.sheets;
    let switcherTears: boolean = true;
    let tearsAr: number[] = [];

    PlayerMethod.playerShooting = function (e: MouseEvent | string): void {
        if (tearsAr.length > 0 || this.froze || this.head.death) return;
        tearsAr.push(0);
        setTimeout(() => (tearsAr = []), 370);

        let bulletDirection: string;
        const bulletSpeed: number = 8;
        let tearPosition: number = 20;
        if (switcherTears) {
            tearPosition = 10;
        }
        switcherTears = !switcherTears;
        if (typeof e === "string") {
            bulletDirection = e;
        } else {
            const cursorPositionX: number = e.offsetX;
            const cursorPositionY: number = e.offsetY;
            if (Math.abs(cursorPositionX - this.player.x) > Math.abs(cursorPositionY - this.player.y)) {
                bulletDirection = cursorPositionX > this.player.x ? "right" : "left";
            } else {
                bulletDirection = cursorPositionY > this.player.y ? "down" : "up";
            }
        }

        const startPointBullet = bulletDirection === "up" ? 25 : 7.5;
        animate.propertiesAr[0].x = this.player.getBounds().x + tearPosition;
        animate.propertiesAr[0].y = this.player.getBounds().y - startPointBullet;

        this.head.textures = this.playerSheets[`${bulletDirection}See`];
        this.head.play();
        this.head.onComplete = (): void => {
            this.head.textures = this.playerSheets.standSee;
            this.head.play();
        };
        const [bullet]: any = new createElement().addAnimateElement(animate);

        bullet.speed = bulletSpeed;
        bullet.scale.set(1.2);
        bullet.forMobs = true;
        bullet.direction = bulletDirection;
        this.bullets.push(bullet);
        switcherTears ? soundGame("tear1", false) : soundGame("tear2", false);
    };

    PlayerMethod.updateBullets = function (e: number): void {
        if (this.activeKeys["ArrowUp"]) this.playerShooting("up");
        if (this.activeKeys["ArrowDown"]) this.playerShooting("down");
        if (this.activeKeys["ArrowLeft"]) this.playerShooting("left");
        if (this.activeKeys["ArrowRight"]) this.playerShooting("right");
        if (this.player.hasOwnProperty("godMode")) this.head.tint = this.player.tint = 0x008000;

        for (let i = 0; i < this.bullets.length; i++) {
            switch (this.bullets[i].direction) {
                case "up":
                    this.bullets[i].position.y -= this.bullets[i].speed;
                    break;
                case "down":
                    this.bullets[i].position.y += this.bullets[i].speed;
                    break;
                case "left":
                    this.bullets[i].position.x -= this.bullets[i].speed;
                    break;
                case "right":
                    this.bullets[i].position.x += this.bullets[i].speed;
                    break;
            }

            if (
                checkTexture(0, this.bullets[i]) ||
                this.bullets[i].y < 135 ||
                this.bullets[i].y > 530 ||
                this.bullets[i].x > 735 ||
                this.bullets[i].x < 35
            ) {
                const deleteBullet = this.bullets[i];
                deleteBullet.textures = sheets.death;
                deleteBullet.play();
                this.bullets.splice(i, 1);
                soundGame("tearPop", false);
                deleteBullet.onComplete = () => {
                    deleteBullet.dead = true;
                    app.stage.removeChild(deleteBullet);
                };
            }
        }
    };

    PlayerMethod.buffPlayer = function (item: any): boolean {
        let result: boolean = true;
        const url: string = item.url;
        switch (url) {
            case "hp.png":
                const hp = 6 - this.head.hp;
                if (hp === 0) {
                    return false;
                } else if (hp > 0) {
                    soundGame("heal", false);
                    if (hp === 1) {
                        this.head.hp += 1;
                    } else {
                        this.head.hp += 2;
                    }
                    changeLife(2);
                    this.hp = this.head.hp;
                    return true;
                }
                break;

            case "belt.png":
                this.head.textures = this.playerSheets.buff;
                this.head.anchor.set(0.5);
                this.head.onComplete = null;
                soundGame("takeCoin", false);
                item.getBounds().x = this.head.getBounds().x;
                item.getBounds().y = this.head.getBounds().y;
                this.head.play();
                result = false;
                this.froze = true;
                setTimeout(() => {
                    rooms[currentRoom].removeChild(item);
                    this.head.anchor.set(0.5, 0.95);
                    this.playerSpeed = 4;
                    this.player.speed = this.playerSpeed;
                    this.froze = false;
                    this.head.textures = this.playerSheets.standSee;
                    this.head.play();
                }, 600);
                break;

            case "trap_door1.png":
                renderEndGame();
                this.head.textures = this.playerSheets.win;
                this.head.anchor.set(0.5);
                this.head.onComplete = null;
                soundGame("win");
                soundGame("floorMusic", true);
                soundGame("bossMusic", true);
                soundGame("endMusic");
                this.head.play();
                setTimeout(() => app.ticker.stop(), 30);
                break;
        }
        gameObjects[currentRoom][url] = [];
        return result;
    };
};

export default addPlayerActions;
