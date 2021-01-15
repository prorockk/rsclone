import * as PIXI from "pixi.js";
import { app } from "../script";
import createAnimateSheets from "../CreateSprite/createAnimateSheets";
import checkBoundsConstructor from "../checkBounds/checkBounds";
import checkTexture from "../checkBounds/checkTexture";
import checkCollision from "../checkBounds/checkCollision";

class createPlayer {
    [x: string]: any;
    constructor() {
        this.playerSheets = {};
        this.playerSpeed = 3;
        this.activeKeys = {};
        this.player = {};
    }
    init = () => {
        app.loader.add("isaac", "./assets/isaac_moving_table.json"); //загрузка спрайта
        app.loader.load(this.doneLoading); //спрайт загрузился
        return this.player;
    };
    doneLoading = () => {
        //createSheets...........
        console.log(app.loader.resources["isaac"].textures);

        this.playerSheets = new createAnimateSheets(app.loader.resources["isaac"]).createPlayerSheets();
        //createPlayer...........
        this.player = new PIXI.AnimatedSprite(this.playerSheets.walkDown);
        this.player.anchor.set(0.5);
        this.player.animationSpeed = 0.2;
        this.player.loop = false;
        this.player.x = app.view.width / 2;
        this.player.y = app.view.height / 2;
        app.stage.addChild(this.player);

        this.player.play();
    };
    movePlayer() {
        const checkBounds = checkBoundsConstructor(this.player);
        const playerPlay = (direction: string) => {
            this.player.textures = this.playerSheets[`walk${direction}`];
            this.player.play();
        };
        if (this.activeKeys["68"] && !checkBounds("right") && !checkCollision(this.player, "right")) {
            if (!this.player.playing) {
                playerPlay("Right");
            }
            this.player.x += this.playerSpeed;
        }
        if (this.activeKeys["87"] && !checkBounds("Up") && !checkCollision(this.player, "top")) {
            if (!this.player.playing) {
                playerPlay("Up");
            }
            this.player.y -= this.playerSpeed;
        }
        if (this.activeKeys["65"] && !checkBounds("left") && !checkCollision(this.player, "left")) {
            if (!this.player.playing) {
                playerPlay("Left");
            }
            this.player.x -= this.playerSpeed;
        }
        if (this.activeKeys["83"] && !checkBounds("down") && !checkCollision(this.player, "down")) {
            if (!this.player.playing) {
                playerPlay("Down");
            }
            this.player.y += this.playerSpeed;
        }
    }
}

export default createPlayer;
