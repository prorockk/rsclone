import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "./objectOfGameObjects";

function createGameElement(
    positionX: any,
    positionY: any,
    url: string,
    width: number,
    height: number,
    parent: any,
    room: string
) {
    const gameElement = PIXI.Sprite.from(url);
    gameElement.anchor.set(0.5);
    gameElement.x = positionX;
    gameElement.y = positionY;
    gameElement.width = width;
    gameElement.height = height;
    parent.addChild(gameElement);

    if (typeof objectOfGameObjects[room][url] !== "undefined") {
        objectOfGameObjects[room][url].push(gameElement);
    } else {
        objectOfGameObjects[room][url] = [gameElement];
    }

    return gameElement;
}
export default createGameElement;
