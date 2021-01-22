import * as PIXI from "pixi.js";
import { topPanel } from "../Rooms/startGame";

const cellOfRoom: any = {};

const cellHight = 12;
const cellWidth = 30;
const availableCellColor = 0x383838;
const visitedCellColor = 0x757575;
const currentCellColor = 0xfbfbfb;

function createMap() {
    const panelContainer = new PIXI.Graphics();
    panelContainer.beginFill(0x1b1818);
    panelContainer.lineStyle(15, 0x000000, 1);
    panelContainer.drawRect(0, 0, 800, 105);
    panelContainer.endFill();

    // const mapRectangle = new PIXI.Graphics();
    // mapRectangle.beginFill(0xffffff);
    // mapRectangle.lineStyle(5, 0x1a1a1a, 1);
    // mapRectangle.drawRect(30, 15, 250, 70);
    // mapRectangle.endFill();
    // panelContainer.addChild(mapRectangle)

    const arrayOfRoomsName = [
        "inFirstRoom",
        "inSecondRoom",
        "inThirdRoom",
        "inFourthRoom",
        "inFifthRoom",
        "inSixthRoom",
        "inSeventhRoom",
        "inEighthRoom",
        "inNinthRoom",
        "inTenthRoom",
    ];

    const mapCellNumber = 10;

    for (let mapCellCounter = 0; mapCellCounter < mapCellNumber; mapCellCounter++) {
        const mapCell = new PIXI.Graphics();
        mapCell.beginFill(0xffffff).tint = 0x1b1818;

        //mapCell.lineStyle(5,0x1a1a1a,1);                                                  ??????????????

        mapCellCounter === 0
            ? mapCell.drawRect(110, 65, cellWidth, cellHight) //1
            : mapCellCounter === 1
            ? mapCell.drawRect(110, 50, cellWidth, cellHight) //2
            : mapCellCounter === 2
            ? mapCell.drawRect(145, 50, cellWidth, cellHight) //3
            : mapCellCounter === 3
            ? mapCell.drawRect(180, 50, cellWidth, cellHight) //4
            : mapCellCounter === 4
            ? mapCell.drawRect(75, 50, cellWidth, cellHight) //5
            : mapCellCounter === 5
            ? mapCell.drawRect(40, 50, cellWidth, cellHight) //6
            : mapCellCounter === 6
            ? mapCell.drawRect(110, 35, cellWidth, cellHight) //7
            : mapCellCounter === 7
            ? mapCell.drawRect(110, 20, cellWidth, cellHight) //8
            : mapCellCounter === 8
            ? mapCell.drawRect(75, 20, cellWidth, cellHight) //9
            : mapCell.drawRect(40, 20, cellWidth, cellHight); //10

        mapCell.endFill();

        cellOfRoom[arrayOfRoomsName[mapCellCounter]] = mapCell;
        //mapRectangle.addChild(mapCell); panelContainer
        panelContainer.addChild(mapCell);
    }

    cellOfRoom["inFirstRoom"].tint = currentCellColor;
    cellOfRoom["inSecondRoom"].tint = availableCellColor;
    topPanel.addChild(panelContainer);
}

function updateMap(previousRoom: string, nextRoom: string) {
    cellOfRoom[previousRoom].tint = visitedCellColor;
    if (nextRoom === "inSecondRoom" && cellOfRoom[nextRoom].tint !== visitedCellColor) {
        cellOfRoom["inThirdRoom"].tint = availableCellColor;
        cellOfRoom["inFifthRoom"].tint = availableCellColor;
        cellOfRoom["inSeventhRoom"].tint = availableCellColor;
    }
    if (nextRoom === "inThirdRoom" && cellOfRoom[nextRoom].tint !== visitedCellColor) {
        cellOfRoom["inFourthRoom"].tint = availableCellColor;
    }
    if (nextRoom === "inFifthRoom" && cellOfRoom[nextRoom].tint !== visitedCellColor) {
        cellOfRoom["inSixthRoom"].tint = availableCellColor;
    }
    if (nextRoom === "inSeventhRoom" && cellOfRoom[nextRoom].tint !== visitedCellColor) {
        cellOfRoom["inEighthRoom"].tint = availableCellColor;
    }
    if (nextRoom === "inEighthRoom" && cellOfRoom[nextRoom].tint !== visitedCellColor) {
        cellOfRoom["inNinthRoom"].tint = availableCellColor;
    }
    if (nextRoom === "inNinthRoom" && cellOfRoom[nextRoom].tint !== visitedCellColor) {
        cellOfRoom["inTenthRoom"].tint = availableCellColor;
    }
    cellOfRoom[nextRoom].tint = currentCellColor;
}
export { createMap, updateMap };
