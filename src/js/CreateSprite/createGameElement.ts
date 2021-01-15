import * as PIXI from "pixi.js";
import { app } from "../script";
import { objectOfGameObjects } from "./objectOfGameObjects";

function createGameElement(positionX: any, positionY: any, url: string, width: number, height: number) {
    const gameElement = PIXI.Sprite.from(url);
    gameElement.anchor.set(0.5);
    gameElement.x = positionX;
    gameElement.y = positionY;
    gameElement.width = width;
    gameElement.height = height;
    app.stage.addChild(gameElement);

    if (url !== "../../../assets/tear.png") {
        if (typeof objectOfGameObjects[url] !== "undefined") {
            objectOfGameObjects[url].push(gameElement);
        } else {
            objectOfGameObjects[url] = [gameElement];
        }
    }

    return gameElement;
}
export default createGameElement;
