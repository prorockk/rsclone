import * as PIXI from "pixi.js";
import { app } from "../script";
import { soundGame } from "./sound";
import { renderMenu } from "../otherScripts/menu";
import * as storage from "./storage";

export default function renderPreview() {
    const backgroundPreview = PIXI.Sprite.from("./images/previewBackground.png");
    backgroundPreview.width = 800;
    backgroundPreview.height = 600;

    const logo = PIXI.Sprite.from("./images/logo.png");
    logo.width = 660;
    logo.height = 150;
    logo.x = 80;
    logo.y = 30;

    let isaacArray = [
        PIXI.Texture.from("./images/filespotlight1.png"),
        PIXI.Texture.from("./images/filespotlight2.png"),
    ];
    let animatedIsaac = new PIXI.AnimatedSprite(isaacArray);
    animatedIsaac.animationSpeed = 0.08;
    animatedIsaac.width = 300;
    animatedIsaac.height = 300;
    animatedIsaac.x = 250;
    animatedIsaac.y = 150;
    animatedIsaac.play();
    app.view.onclick = () => {
        renderMenu();
        app.view.onclick = null;
    };

    app.stage.addChild(backgroundPreview, animatedIsaac, logo);
    soundGame("menuMusic");
    app.ticker.start();
}
