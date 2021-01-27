import * as PIXI from "pixi.js";
import { topPanel } from "../Rooms/startGame";

import createArrowContainer from "./arrows";
import { createMap } from "./map";
import { createItemsContainer } from "./spaceItem";
import { createResourcesContainer } from "./resources";
import { createLifeContainer } from "./createLife";

export default function createTopPanel() {
    createMap(PIXI, topPanel);
    createArrowContainer(PIXI, topPanel);
    createItemsContainer(PIXI, topPanel);
    createResourcesContainer(PIXI, topPanel);
    createLifeContainer(PIXI, topPanel);
}
