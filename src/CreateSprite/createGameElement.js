import {app} from "../script.js";

function createGameElement(url, positionX, positionY) {

    const gameElement = new PIXI.Sprite.from(`${url}`);
    gameElement.anchor.set(0.5)
    gameElement.x = positionX;
    gameElement.y = positionY;
    app.stage.addChild(gameElement);
    return gameElement;
}
export default createGameElement;