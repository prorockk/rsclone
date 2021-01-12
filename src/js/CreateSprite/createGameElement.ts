import * as PIXI from "pixi.js";

import { app } from "../script";

function createGameElement(positionX: any, positionY: any) {
    const gameElement = PIXI.Sprite.from("tear.png");
    gameElement.anchor.set(0.5);
    gameElement.x = positionX;
    gameElement.y = positionY;
    app.stage.addChild(gameElement);
    return gameElement;
}
export default createGameElement;
