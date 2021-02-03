import createElement from "../CreateSprite/createGameElement";
import sendResponse from "../otherScripts/network";

export default async function createElementsInAllRooms(rooms: any): Promise<any> {
    const res: any[] = await sendResponse.get("level");
    const roomsArr: any = await res[0].firstLvl;

    const createStatic: createElement = new createElement(rooms);
    return await roomsArr.forEach((room: { [x: string]: any[] }) => {
        for (let func in room) {
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
