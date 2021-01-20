import createArrowContainer from "./arrows";
import { createMap } from "./map";
import createItemsContainer from "./spaceItem";

export default function createTopPanel() {
    createMap();
    createArrowContainer();
    createItemsContainer();
}
