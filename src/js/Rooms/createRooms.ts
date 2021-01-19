import * as PIXI from "pixi.js";
import createStaticElement from "../CreateSprite/createGameElement";
import { app } from "../script";

export default async function createElementsInAllRooms(rooms: any) {
    // New JSON
    const res = await fetch("../src/js/Rooms/rooms.json");
    const roomsArr = await res.json();
    //1

    const createStatic = new createStaticElement(rooms);
    roomsArr.forEach((room: { [x: string]: any[] }) => {
        for (let func in room) {
            room[func].forEach((element) => {
                createStatic.createGameElement(element);
            });
        }
    });
}

//top ../assets/invisibleBlock.png
//     createGameElement(145, 95, "invisibleBlock.png", 215, 35, rooms["inFirstRoom"], "inFirstRoom");
//     createGameElement(390, 95, "invisibleBlock.png", 215, 35, rooms["inFirstRoom"], "inFirstRoom");
//     //left
//     createGameElement(25, 235, "invisibleBlock.png", 60, 300, rooms["inFirstRoom"], "inFirstRoom");
//     //right
//     createGameElement(500, 235, "invisibleBlock.png", 40, 300, rooms["inFirstRoom"], "inFirstRoom");
//     //bot
//     createGameElement(
//         app.view.width / 3,
//         365,
//         "invisibleBlock.png",
//         app.view.width / 1.5,
//         40,
//         rooms["inFirstRoom"],
//         "inFirstRoom"
//     );

//     createGameElement(
//         app.view.width / 2.5,
//         app.view.height / 2.5,
//         "box.png",
//         30,
//         23,
//         rooms["inFirstRoom"],
//         "inFirstRoom"
//     );
//     createGameElement(
//         app.view.width / 3,
//         app.view.height / 2.5,
//         "box.png",
//         30,
//         23,
//         rooms["inFirstRoom"],
//         "inFirstRoom"
//     );

//     createGameElement(
//         app.view.width / 2.5,
//         app.view.height / 3,
//         "9KvNB.png",
//         30,
//         23,
//         rooms["inFirstRoom"],
//         "inFirstRoom"
//     );
//     createGameElement(
//         app.view.width / 3,
//         app.view.height / 6.5,
//         "door.png",
//         52,
//         52,
//         rooms["inFirstRoom"],
//         "inFirstRoom"
//     );

//     //2

//     createGameElement(
//         app.view.width / 3,
//         app.view.height / 3,
//         "9KvNB.png",
//         30,
//         40,
//         rooms["inSecondRoom"],
//         "inSecondRoom"
//     );
//     //top
//     createGameElement(145, 95, "invisibleBlock.png", 215, 35, rooms["inSecondRoom"], "inSecondRoom");
//     createGameElement(390, 95, "invisibleBlock.png", 215, 35, rooms["inSecondRoom"], "inSecondRoom");
//     createGameElement(
//         app.view.width / 3,
//         app.view.height / 6.5,
//         "door.png",
//         52,
//         52,
//         rooms["inSecondRoom"],
//         "inSecondRoom"
//     );
//     //left
//     createGameElement(35, 130, "invisibleBlock.png", 42, 135, rooms["inSecondRoom"], "inSecondRoom");
//     createGameElement(35, 305, "invisibleBlock.png", 42, 135, rooms["inSecondRoom"], "inSecondRoom");
//     createGameElement(35, 208, "door.png", 52, 52, rooms["inSecondRoom"], "inSecondRoom");
//     //right
//     createGameElement(500, 130, "invisibleBlock.png", 42, 135, rooms["inSecondRoom"], "inSecondRoom");
//     createGameElement(500, 305, "invisibleBlock.png", 42, 135, rooms["inSecondRoom"], "inSecondRoom");
//     createGameElement(500, 208, "door.png", 52, 52, rooms["inSecondRoom"], "inSecondRoom");
//     //bot
//     createGameElement(390, 365, "invisibleBlock.png", 215, 35, rooms["inSecondRoom"], "inSecondRoom");
//     createGameElement(145, 365, "invisibleBlock.png", 215, 35, rooms["inSecondRoom"], "inSecondRoom");
//     createGameElement(
//         app.view.width / 3,
//         app.view.height - 245,
//         "door.png",
//         52,
//         52,
//         rooms["inSecondRoom"],
//         "inSecondRoom"
//     );

//     //3
//     createGameElement(
//         app.view.width / 1.5,
//         app.view.height / 1.5,
//         "9KvNB.png",
//         30,
//         40,
//         rooms["inThirdRoom"],
//         "inThirdRoom"
//     );

//     //top
//     createGameElement(
//         app.view.width / 3,
//         85,
//         "invisibleBlock.png",
//         app.view.width,
//         50,
//         rooms["inThirdRoom"],
//         "inThirdRoom"
//     );
//     //left
//     createGameElement(35, 130, "invisibleBlock.png", 42, 135, rooms["inThirdRoom"], "inThirdRoom");
//     createGameElement(35, 305, "invisibleBlock.png", 42, 135, rooms["inThirdRoom"], "inThirdRoom");
//     createGameElement(35, 208, "door.png", 52, 52, rooms["inThirdRoom"], "inThirdRoom");
//     //right
//     createGameElement(500, 235, "invisibleBlock.png", 40, 300, rooms["inThirdRoom"], "inThirdRoom");
//     //bot
//     createGameElement(
//         app.view.width / 3,
//         365,
//         "invisibleBlock.png",
//         app.view.width / 1.5,
//         40,
//         rooms["inThirdRoom"],
//         "inThirdRoom"
//     );

//     //4
//     //top
//     createGameElement(
//         app.view.width / 3,
//         85,
//         "invisibleBlock.png",
//         app.view.width,
//         50,
//         rooms["inFourthRoom"],
//         "inFourthRoom"
//     );
//     //left
//     createGameElement(25, 235, "invisibleBlock.png", 60, 300, rooms["inFourthRoom"], "inFourthRoom");
//     //right
//     createGameElement(500, 130, "invisibleBlock.png", 42, 135, rooms["inFourthRoom"], "inFourthRoom");
//     createGameElement(500, 305, "invisibleBlock.png", 42, 135, rooms["inFourthRoom"], "inFourthRoom");
//     createGameElement(500, 208, "door.png", 52, 52, rooms["inFourthRoom"], "inFourthRoom");
//     //bot
//     createGameElement(
//         app.view.width / 3,
//         365,
//         "invisibleBlock.png",
//         app.view.width / 1.5,
//         40,
//         rooms["inFourthRoom"],
//         "inFourthRoom"
//     );

//     //5
//     //top
//     createGameElement(
//         app.view.width / 3,
//         85,
//         "invisibleBlock.png",
//         app.view.width,
//         50,
//         rooms["inFifthRoom"],
//         "inFifthRoom"
//     );
//     //left
//     createGameElement(25, 235, "invisibleBlock.png", 60, 300, rooms["inFifthRoom"], "inFifthRoom");
//     //right
//     createGameElement(500, 130, "invisibleBlock.png", 42, 135, rooms["inFifthRoom"], "inFifthRoom");
//     createGameElement(500, 305, "invisibleBlock.png", 42, 135, rooms["inFifthRoom"], "inFifthRoom");
//     createGameElement(500, 208, "door.png", 52, 52, rooms["inFifthRoom"], "inFifthRoom");
//     //bot
//     createGameElement(
//         app.view.width / 3,
//         365,
//         "invisibleBlock.png",
//         app.view.width / 1.5,
//         40,
//         rooms["inFifthRoom"],
//         "inFifthRoom"
//     );

//     createGameElement(
//         app.view.width / 2.25,
//         app.view.height / 2.25,
//         "box.png",
//         30,
//         23,
//         rooms["inFifthRoom"],
//         "inFifthRoom"
//     );

//     //6
//     //top
//     createGameElement(145, 95, "invisibleBlock.png", 215, 35, rooms["inSixthRoom"], "inSixthRoom");
//     createGameElement(390, 95, "invisibleBlock.png", 215, 35, rooms["inSixthRoom"], "inSixthRoom");
//     createGameElement(
//         app.view.width / 3,
//         app.view.height / 6.5,
//         "door.png",
//         52,
//         52,
//         rooms["inSixthRoom"],
//         "inSixthRoom"
//     );
//     //left
//     createGameElement(35, 130, "invisibleBlock.png", 42, 135, rooms["inSixthRoom"], "inSixthRoom");
//     createGameElement(35, 305, "invisibleBlock.png", 42, 135, rooms["inSixthRoom"], "inSixthRoom");
//     createGameElement(35, 208, "door.png", 52, 52, rooms["inSixthRoom"], "inSixthRoom");
//     //right
//     createGameElement(500, 235, "invisibleBlock.png", 40, 300, rooms["inSixthRoom"], "inSixthRoom");
//     //bot
//     createGameElement(390, 365, "invisibleBlock.png", 215, 35, rooms["inSixthRoom"], "inSixthRoom");
//     createGameElement(145, 365, "invisibleBlock.png", 215, 35, rooms["inSixthRoom"], "inSixthRoom");
//     createGameElement(
//         app.view.width / 3,
//         app.view.height - 245,
//         "door.png",
//         52,
//         52,
//         rooms["inSixthRoom"],
//         "inSixthRoom"
//     );

//     //7
//     //top
//     createGameElement(
//         app.view.width / 3,
//         85,
//         "invisibleBlock.png",
//         app.view.width,
//         50,
//         rooms["inSeventhRoom"],
//         "inSeventhRoom"
//     );
//     //left
//     createGameElement(25, 235, "invisibleBlock.png", 60, 300, rooms["inSeventhRoom"], "inSeventhRoom");
//     //right
//     createGameElement(500, 235, "invisibleBlock.png", 40, 300, rooms["inSeventhRoom"], "inSeventhRoom");
//     //bot
//     createGameElement(390, 365, "invisibleBlock.png", 215, 35, rooms["inSeventhRoom"], "inSeventhRoom");
//     createGameElement(145, 365, "invisibleBlock.png", 215, 35, rooms["inSeventhRoom"], "inSeventhRoom");
//     createGameElement(
//         app.view.width / 3,
//         app.view.height - 245,
//         "door.png",
//         52,
//         52,
//         rooms["inSeventhRoom"],
//         "inSeventhRoom"
//     );

//     createGameElement(
//         app.view.width / 1.5,
//         app.view.height / 1.5,
//         "tear.png",
//         100,
//         100,
//         rooms["inSeventhRoom"],
//         "inSeventhRoom"
//     );
// }
