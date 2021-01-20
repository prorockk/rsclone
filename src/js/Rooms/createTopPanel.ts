import { topPanel } from "./startGame";
import * as PIXI from "pixi.js";

// const mapRoomsCell = {
//     'activeRoom' = "inFirstRoom";
//     'visitedRooms' = [];
//     'availableRooms' = ["inSecondRoom"];
// }

export default function createMap() {
    topPanel.beginFill(0x66ccff);
    topPanel.drawRect(0, 0, 800, 100);
    topPanel.endFill();

    const mapContainer = new PIXI.Graphics();
    mapContainer.beginFill(0xb41467);
    mapContainer.drawRect(50, 5, 110, 90);
    mapContainer.endFill(); //нах?

    const mapCell = new PIXI.Graphics();
    mapCell.beginFill(0x7b28a4);
    mapCell.drawRect(90, 70, 30, 20);
    mapCell.endFill();

    const mapCell2 = new PIXI.Graphics();
    mapCell2.beginFill(0xb4b4b4);
    mapCell2.drawRect(90, 45, 30, 20);
    mapCell2.endFill();

    mapContainer.addChild(mapCell);
    mapContainer.addChild(mapCell2);

    topPanel.addChild(mapContainer);

    // const upperPanel = new PIXI.Container();
    // upperPanel.width = 800;
    // upperPanel.height = 100;

    // const upperPanelBackGround = PIXI.Sprite.from("../assets/upperPanel.png");

    // const mapCell = PIXI.Sprite.from("../assets/map.png");
    // mapCell.x = 700;
    // mapCell.y = 50;
    // mapCell.width = 150;
    // mapCell.height = 75;
    // mapCell.anchor.set(0.5);
    // upperPanelBackGround.addChild(mapCell);

    // upperPanel.addChild(upperPanelBackGround);
    return mapCell2;
}

class TopPanel {
    [x: string]: any;
    constructor() {
        this.activeRoom = "inFirstRoom";
        this.visitedRooms = [];
        this.availableRooms = ["inSecondRoom"];
        this.rooms = [
            "inFirstRoom",
            "inSecondRoom",
            "inThirdRoom",
            "inFourthRoom",
            "inFifthRoom",
            "inSixthRoom",
            "inSeventhRoom",
        ];
    }

    // init = () => {
    //     return this;
    // };
}
