function createItemsContainer(PIXI: any, topPanel: any) {
    const itemsContainer = PIXI.Sprite.from("../../assets/itemsContainer.png");
    itemsContainer.width = 80;
    itemsContainer.height = 80;
    itemsContainer.x = 490;
    itemsContainer.y = 10;
    topPanel.addChild(itemsContainer);
}

// function changeItem() {
//     const itemsContainer = PIXI.Sprite.from("../../assets/itemsContainer.png");
//     itemsContainer.width = 80;
//     itemsContainer.height = 80;
//     itemsContainer.x = 490;
//     itemsContainer.y = 10;
//     topPanel.addChild(itemsContainer);
// }
export { createItemsContainer };
