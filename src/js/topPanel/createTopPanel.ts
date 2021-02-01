import { topPanel } from "../Rooms/startGame";
import setParamsTopElement from "./setParamsTopElement";
import createArrowContainer from "./arrows";
import { createMap } from "./map";
import { createItemsContainer } from "./spaceItem";
import { createResourcesContainer } from "./resources";
import { createLifeContainer } from "./createLife";

export default function createTopPanel(): void {
    createMap(topPanel);
    createArrowContainer(topPanel, setParamsTopElement);
    createItemsContainer(topPanel, setParamsTopElement);
    createResourcesContainer(topPanel, setParamsTopElement);
    createLifeContainer(topPanel, setParamsTopElement);
}
