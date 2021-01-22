import createArrowContainer from "./arrows";
import { createMap } from "./map";
import createItemsContainer from "./spaceItem";
import { createResourcesContainer } from "./resources";
import createLifeContainer from "./createLife";

export default function createTopPanel() {
    createMap();
    createArrowContainer();
    createItemsContainer();
    createResourcesContainer();
    createLifeContainer();
}
