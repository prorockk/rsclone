/* eslint-disable import/no-cycle */
import * as PIXI from "pixi.js";

function createItemsContainer(topPanel: PIXI.Graphics, setParamsToPixiElem: Function): void {
    const itemsContainer: PIXI.Sprite = PIXI.Sprite.from("../../assets/itemsContainer.png");
    setParamsToPixiElem(itemsContainer, 490, 10, 0, false, false, 80, 80);
    topPanel.addChild(itemsContainer);
}
export default createItemsContainer;
