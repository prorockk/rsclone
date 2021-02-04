/* eslint-disable import/no-cycle */
import createElement from "../CreateSprite/createGameElement";
import sendResponse from "../otherScripts/network";

let res: any[];
let roomsArr: any;

export async function uploadRooms() {
    res = await sendResponse.get("level");
    roomsArr = await res[0].firstLvl;
}

export async function createElementsInAllRooms(rooms: any): Promise<any> {
    const createStatic: createElement = new createElement(rooms);
    return await roomsArr.forEach((room: { [x: string]: any[] }) => {
        for (const func in room) {
            room[func].forEach((element) => {
                if (func === "createGameElement") {
                    createStatic.createGameElement(element);
                } else if (func === "createAnimateElement") {
                    createStatic.createAnimateElement(element);
                }
            });
        }
    });
}
