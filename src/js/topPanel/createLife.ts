import * as PIXI from "pixi.js";
import { topPanel } from "../Rooms/startGame";
export default function createLifeContainer() {
    const lifeLabel = PIXI.Sprite.from("../../assets/lifeLabel.png");
    lifeLabel.width = 110;
    lifeLabel.height = 20;
    lifeLabel.x = 620;
    lifeLabel.y = 10;
    topPanel.addChild(lifeLabel);
}
