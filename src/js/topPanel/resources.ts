const resources: any = {};

function createResourcesContainer(PIXI: any, topPanel: any) {
    const resourcesKeys = ["coins", "bombs", "keys"];

    const resourceContainer = PIXI.Sprite.from("../../assets/resources.png");
    resourceContainer.width = 45;
    resourceContainer.height = 80;
    resourceContainer.x = 300;
    resourceContainer.y = 10;

    const resourcesTextStyle = new PIXI.TextStyle({
        fontSize: 20,
        fill: "white",
    });

    const allResources = 3;

    for (let currentResources = 0; currentResources < allResources; currentResources += 1) {
        const resource = new PIXI.Text("00", resourcesTextStyle);
        resource.x = 363;
        resource.y = 28 + 25 * currentResources;
        resource.anchor.set(0.5);
        resources[resourcesKeys[currentResources]] = resource;

        topPanel.addChild(resource);
    }

    topPanel.addChild(resourceContainer);
}
//                                                         call function  changeResources('coins', 1)
function changeResources(resourceName: string, value: number) {
    value = Number(resources[resourceName].text) + value;
    resources[resourceName].text = value <= 9 ? "0" + value : value;
}

export { createResourcesContainer, changeResources };
