import * as PIXI from "pixi.js";
export default function createArrowContainer(topPanel: PIXI.Graphics, setParamsTopElement: Function): void {
    const arrowContainer = PIXI.Sprite.from("../../assets/Arrows.png");
    const arrowImage = PIXI.Sprite.from("../../assets/arrowsTear.png");
    setParamsTopElement(arrowContainer, 80, 80, 400, 10);
    setParamsTopElement(arrowImage, 40, 65, 35, 40);
    arrowContainer.addChild(arrowImage);
    topPanel.addChild(arrowContainer);
}
