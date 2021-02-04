import * as PIXI from "pixi.js";

interface exemplaryPixiItem {
    x: number;
    y: number;
    rotation: number;
    interactive: boolean;
    buttonMode: boolean;
    width?: number;
    height?: number;
}

function setParamsToPixiElem(
    pixiItem: exemplaryPixiItem | PIXI.Text | PIXI.Container | PIXI.Sprite,
    x: number,
    y: number,
    rotation: number,
    interactive: boolean,
    buttonMode: boolean,
    width?: number,
    height?: number
): void {
    pixiItem.x = x;
    pixiItem.y = y;
    pixiItem.rotation = rotation;
    pixiItem.interactive = interactive;
    pixiItem.buttonMode = buttonMode;
    if (typeof width !== "undefined" && typeof height !== "undefined") {
        pixiItem.width = width;
        pixiItem.height = height;
    }
}
export { setParamsToPixiElem, exemplaryPixiItem };
