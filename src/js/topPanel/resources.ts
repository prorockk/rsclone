/* eslint-disable import/no-cycle */
import * as PIXI from "pixi.js";

interface Resources {
    [resourcesName: string]: PIXI.Text;
}

const resources: Resources = {};

function createResourcesContainer(topPanel: PIXI.Graphics, setParamsToPixiElem: Function): void {
    const resourcesKeys: string[] = ["coins", "bombs", "keys"];

    const resourceContainer: PIXI.Sprite = PIXI.Sprite.from("../../assets/resources.png");
    setParamsToPixiElem(resourceContainer, 300, 10, 0, false, false, 45, 80);
    const resourcesTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
        fontSize: 20,
        fill: "white",
    });

    const allResources: number = 3;

    for (let currentResources = 0; currentResources < allResources; currentResources += 1) {
        const resource: PIXI.Text = new PIXI.Text("00", resourcesTextStyle);
        resource.x = 363;
        resource.y = 28 + 25 * currentResources;
        resource.anchor.set(0.5);
        resources[resourcesKeys[currentResources]] = resource;

        topPanel.addChild(resource);
    }

    topPanel.addChild(resourceContainer);
}

function changeResources(resourceName: string, value: number): void {
    value = Number(resources[resourceName].text) + value;
    resources[resourceName].text = value <= 9 ? `0${value}` : `${value}`;
}

export { createResourcesContainer, changeResources };
