import * as PIXI from "pixi.js";

function createItemsContainer(topPanel: PIXI.Graphics, setParamsTopElement: Function): void {
    const itemsContainer: PIXI.Sprite = PIXI.Sprite.from("../../assets/itemsContainer.png");
    setParamsTopElement(itemsContainer, 80, 80, 490, 10);
    topPanel.addChild(itemsContainer);
}

export { createItemsContainer };
