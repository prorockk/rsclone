import * as PIXI from "pixi.js";
import { topPanel } from "../Rooms/startGame";

const hearts: any = {};

export default function createLifeContainer() {
    const lifeLabel = PIXI.Sprite.from("../../assets/lifeLabel.png");
    lifeLabel.width = 110;
    lifeLabel.height = 20;
    lifeLabel.x = 620;
    lifeLabel.y = 10;
    topPanel.addChild(lifeLabel);

    const heartFull = PIXI.Sprite.from("../../assets/heartFull.png");
    heartFull.width = 35;
    heartFull.height = 30;
    heartFull.x = 580;
    heartFull.y = 30;
    topPanel.addChild(heartFull);

    const heartHalf = PIXI.Sprite.from("../../assets/heartHalf.png");
    heartHalf.width = 35;
    heartHalf.height = 30;
    heartHalf.x = 620;
    heartHalf.y = 30;
    topPanel.addChild(heartHalf);

    const heart = PIXI.Sprite.from("../../assets/heart.png");
    heart.width = 35;
    heart.height = 30;
    heart.x = 660;
    heart.y = 30;
    topPanel.addChild(heart);
    heart.alpha = 0;
    console.log(heart);
}
