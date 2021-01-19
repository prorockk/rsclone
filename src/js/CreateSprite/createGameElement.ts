import * as PIXI from "pixi.js";
import { app } from "../script";
import { objectOfGameObjects } from "./objectOfGameObjects";

class createStaticElement {
    rooms: any;
    constructor(rooms: any) {
        this.rooms = rooms;
    }
    createGameElement = (paramObj: any) => {
        const { coords, url, size, room } = paramObj;
        let [positionX, positionY] = coords;
        let [width, height] = size;
        positionX =
            positionX < 10
                ? app.view.width / positionX
                : positionX ** 2 === 60025
                ? app.view.width + positionX
                : positionX;
        positionY =
            positionY < 10
                ? app.view.height / positionY
                : positionY ** 2 === 60025
                ? app.view.height + positionY
                : positionY;
        width = width === 0 ? app.view.width : width < 2 ? app.view.width / width : width;
        const texture: any = PIXI.Texture.from(url);
        const gameElement: any = PIXI.Sprite.from(texture);
        for (let key in paramObj) {
            gameElement[key] = paramObj[key];
        }
        gameElement.anchor.set(0.5);
        gameElement.x = positionX;
        gameElement.y = positionY;
        gameElement.width = width;
        gameElement.height = height;

        this.rooms[room].addChild(gameElement);

        if (typeof objectOfGameObjects[room][url] !== "undefined") {
            objectOfGameObjects[room][url].push(gameElement);
        } else {
            objectOfGameObjects[room][url] = [gameElement];
        }

        return gameElement;
    };
}
export default createStaticElement;
