/* eslint-disable import/no-cycle */
import { topPanel } from "../Rooms/startGame";
import createArrowContainer from "./arrows";
import { createMap } from "./map";
import createItemsContainer from "./spaceItem";
import { createResourcesContainer } from "./resources";
import { createLifeContainer } from "./createLife";
import { setParamsToPixiElem } from "../otherScripts/setParamsToPixiElem";

export default function createTopPanel(): void {
    createMap(topPanel);
    createArrowContainer(topPanel, setParamsToPixiElem);
    createItemsContainer(topPanel, setParamsToPixiElem);
    createResourcesContainer(topPanel, setParamsToPixiElem);
    createLifeContainer(topPanel, setParamsToPixiElem);
}
