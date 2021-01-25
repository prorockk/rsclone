import * as PIXI from "pixi.js";
import { topPanel } from "../Rooms/startGame";
export default function createItemsContainer() {
    const itemsContainer = PIXI.Sprite.from("../../assets/itemsContainer.png");
    itemsContainer.width = 80;
    itemsContainer.height = 80;
    itemsContainer.x = 490;
    itemsContainer.y = 10;
    topPanel.addChild(itemsContainer);
}
