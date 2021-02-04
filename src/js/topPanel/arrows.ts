/* eslint-disable import/no-cycle */
import * as PIXI from "pixi.js";

export default function createArrowContainer(topPanel: PIXI.Graphics, setParamsToPixiElem: Function): void {
    const arrowContainer = PIXI.Sprite.from("../../assets/Arrows.png");
    const arrowImage = PIXI.Sprite.from("../../assets/arrowsTear.png");
    setParamsToPixiElem(arrowContainer, 400, 10, 0, false, false, 80, 80);
    setParamsToPixiElem(arrowImage, 35, 40, 0, false, false, 40, 65);
    arrowContainer.addChild(arrowImage);
    topPanel.addChild(arrowContainer);
}
