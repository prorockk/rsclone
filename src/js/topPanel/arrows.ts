export default function createArrowContainer(PIXI: any, topPanel: any) {
    const arrowContainer = PIXI.Sprite.from("../../assets/Arrows.png");
    arrowContainer.width = 80;
    arrowContainer.height = 80;
    arrowContainer.x = 400;
    arrowContainer.y = 10;
    topPanel.addChild(arrowContainer);

    const arrowImage = PIXI.Sprite.from("../../assets/arrowsTear.png");
    arrowImage.width = 40;
    arrowImage.height = 65;
    arrowImage.x = 35;
    arrowImage.y = 40;
    arrowContainer.addChild(arrowImage);
}
// mapContainer.beginFill(0x424242);
// mapContainer.lineStyle(15, 0x1a1a1a, 1);
// mapContainer.drawRect(0, 0, 800, 100);
// mapContainer.endFill();
