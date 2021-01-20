import * as PIXI from "pixi.js";
import { topPanel } from "../Rooms/startGame";

const cellOfRoom: any = {};

const cellHight = 12;
const cellWidth = 30;
const availableCellColor = 0x5c5c5c;
const currentCellColor = 0xffffff;

function createMap() {
    const mapContainer = new PIXI.Graphics();
    mapContainer.beginFill(0x424242);
    mapContainer.lineStyle(15, 0x1a1a1a, 1);
    mapContainer.drawRect(0, 0, 800, 100);
    mapContainer.endFill();

    // const mapRectangle = new PIXI.Graphics();
    // mapRectangle.beginFill(0xffffff);
    // mapRectangle.lineStyle(5, 0x1a1a1a, 1);
    // mapRectangle.drawRect(30, 15, 250, 70);
    // mapRectangle.endFill();
    // mapContainer.addChild(mapRectangle)

    const arrayOfRoomsName = [
        "inFirstRoom",
        "inSecondRoom",
        "inThirdRoom",
        "inFourthRoom",
        "inFifthRoom",
        "inSixthRoom",
        "inSeventhRoom",
    ];

    const mapCellNumber = 7;

    for (let mapCellCounter = 0; mapCellCounter < mapCellNumber; mapCellCounter++) {
        const mapCell = new PIXI.Graphics();
        mapCell.beginFill(0xffffff).tint = 0x424242;

        //mapCell.lineStyle(5,0x1a1a1a,1);                                                  ??????????????

        mapCellCounter === 0
            ? mapCell.drawRect(110, 65, cellWidth, cellHight)
            : mapCellCounter === 1
            ? mapCell.drawRect(110, 50, cellWidth, cellHight)
            : mapCellCounter === 2
            ? mapCell.drawRect(145, 50, cellWidth, cellHight)
            : mapCellCounter === 3
            ? mapCell.drawRect(75, 50, cellWidth, cellHight)
            : mapCellCounter === 4
            ? mapCell.drawRect(75, 35, cellWidth, cellHight)
            : mapCellCounter === 5
            ? mapCell.drawRect(110, 35, cellWidth, cellHight)
            : mapCell.drawRect(110, 20, cellWidth, cellHight);

        mapCell.endFill();

        cellOfRoom[arrayOfRoomsName[mapCellCounter]] = mapCell;
        //mapRectangle.addChild(mapCell); mapContainer
        mapContainer.addChild(mapCell);
    }

    cellOfRoom["inFirstRoom"].tint = currentCellColor;
    cellOfRoom["inSecondRoom"].tint = availableCellColor;
    topPanel.addChild(mapContainer);
}

function updateMap(previousRoom: string, nextRoom: string) {
    cellOfRoom[previousRoom].tint = 0xbababa;
    if (nextRoom === "inSecondRoom" && cellOfRoom[nextRoom].tint !== 0xbababa) {
        cellOfRoom["inThirdRoom"].tint = availableCellColor;
        cellOfRoom["inFourthRoom"].tint = availableCellColor;
        cellOfRoom["inSixthRoom"].tint = availableCellColor;
    }
    if (nextRoom === "inSixthRoom" && cellOfRoom[nextRoom].tint !== 0xbababa) {
        cellOfRoom["inFifthRoom"].tint = availableCellColor;
        cellOfRoom["inSeventhRoom"].tint = availableCellColor;
    }
    cellOfRoom[nextRoom].tint = currentCellColor;
}
export { createMap, updateMap };
