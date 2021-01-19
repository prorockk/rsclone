import * as PIXI from "pixi.js";
import createGameElement from "../CreateSprite/createGameElement";
import { app } from "../script";

export default function createElementsInAllRooms(rooms: any) {
    //1

    //top ../assets/invisibleBlock.png
    createGameElement(145, 95, "../assets/invisibleBlock.png", 215, 35, rooms["inFirstRoom"], "inFirstRoom");
    createGameElement(390, 95, "../assets/invisibleBlock.png", 215, 35, rooms["inFirstRoom"], "inFirstRoom");
    //left
    createGameElement(25, 235, "../assets/invisibleBlock.png", 60, 300, rooms["inFirstRoom"], "inFirstRoom");
    //right
    createGameElement(500, 235, "../assets/invisibleBlock.png", 40, 300, rooms["inFirstRoom"], "inFirstRoom");
    //bot
    createGameElement(300, 365, "../assets/floor.png", 480, 40, rooms["inFirstRoom"], "inFirstRoom");

    createGameElement(
        app.view.width / 2.5,
        app.view.height / 2.5,
        "../assets/box.png",
        30,
        23,
        rooms["inFirstRoom"],
        "inFirstRoom"
    );
    createGameElement(
        app.view.width / 3,
        app.view.height / 2.5,
        "../assets/box.png",
        30,
        23,
        rooms["inFirstRoom"],
        "inFirstRoom"
    );

    createGameElement(
        app.view.width / 2.5,
        app.view.height / 3,
        "../assets/9KvNB.png",
        30,
        23,
        rooms["inFirstRoom"],
        "inFirstRoom"
    );
    createGameElement(
        app.view.width / 3,
        app.view.height / 6.5,
        "../assets/door.png",
        52,
        52,
        rooms["inFirstRoom"],
        "inFirstRoom"
    );

    //2

    createGameElement(
        app.view.width / 3,
        app.view.height / 3,
        "../assets/9KvNB.png",
        30,
        40,
        rooms["inSecondRoom"],
        "inSecondRoom"
    );
    //top
    createGameElement(145, 95, "../assets/invisibleBlock.png", 215, 35, rooms["inSecondRoom"], "inSecondRoom");
    createGameElement(390, 95, "../assets/invisibleBlock.png", 215, 35, rooms["inSecondRoom"], "inSecondRoom");
    createGameElement(
        app.view.width / 3,
        app.view.height / 6.5,
        "../assets/door.png",
        52,
        52,
        rooms["inSecondRoom"],
        "inSecondRoom"
    );
    //left
    createGameElement(35, 130, "../assets/invisibleBlock.png", 42, 135, rooms["inSecondRoom"], "inSecondRoom");
    createGameElement(35, 305, "../assets/invisibleBlock.png", 42, 135, rooms["inSecondRoom"], "inSecondRoom");
    createGameElement(35, 208, "../assets/door.png", 52, 52, rooms["inSecondRoom"], "inSecondRoom");
    //right
    createGameElement(500, 130, "../assets/invisibleBlock.png", 42, 135, rooms["inSecondRoom"], "inSecondRoom");
    createGameElement(500, 305, "../assets/invisibleBlock.png", 42, 135, rooms["inSecondRoom"], "inSecondRoom");
    createGameElement(500, 208, "../assets/door.png", 52, 52, rooms["inSecondRoom"], "inSecondRoom");
    //bot
    createGameElement(390, 365, "../assets/invisibleBlock.png", 215, 35, rooms["inSecondRoom"], "inSecondRoom");
    createGameElement(145, 365, "../assets/invisibleBlock.png", 215, 35, rooms["inSecondRoom"], "inSecondRoom");
    createGameElement(
        app.view.width / 3,
        app.view.height - 245,
        "../assets/door.png",
        52,
        52,
        rooms["inSecondRoom"],
        "inSecondRoom"
    );

    //3
    createGameElement(
        app.view.width / 1.5,
        app.view.height / 1.5,
        "../assets/9KvNB.png",
        30,
        40,
        rooms["inThirdRoom"],
        "inThirdRoom"
    );

    //top
    createGameElement(
        app.view.width / 3,
        85,
        "../assets/invisibleBlock.png",
        app.view.width,
        50,
        rooms["inThirdRoom"],
        "inThirdRoom"
    );
    //left
    createGameElement(35, 130, "../assets/invisibleBlock.png", 42, 135, rooms["inThirdRoom"], "inThirdRoom");
    createGameElement(35, 305, "../assets/invisibleBlock.png", 42, 135, rooms["inThirdRoom"], "inThirdRoom");
    createGameElement(35, 208, "../assets/door.png", 52, 52, rooms["inThirdRoom"], "inThirdRoom");
    //right
    createGameElement(500, 235, "../assets/invisibleBlock.png", 40, 300, rooms["inThirdRoom"], "inThirdRoom");
    //bot
    createGameElement(
        app.view.width / 3,
        365,
        "../assets/invisibleBlock.png",
        app.view.width / 1.5,
        40,
        rooms["inThirdRoom"],
        "inThirdRoom"
    );

    //4
    //top
    createGameElement(
        app.view.width / 3,
        85,
        "../assets/invisibleBlock.png",
        app.view.width,
        50,
        rooms["inFourthRoom"],
        "inFourthRoom"
    );
    //left
    createGameElement(25, 235, "../assets/invisibleBlock.png", 60, 300, rooms["inFourthRoom"], "inFourthRoom");
    //right
    createGameElement(500, 130, "../assets/invisibleBlock.png", 42, 135, rooms["inFourthRoom"], "inFourthRoom");
    createGameElement(500, 305, "../assets/invisibleBlock.png", 42, 135, rooms["inFourthRoom"], "inFourthRoom");
    createGameElement(500, 208, "../assets/door.png", 52, 52, rooms["inFourthRoom"], "inFourthRoom");
    //bot
    createGameElement(
        app.view.width / 3,
        365,
        "../assets/invisibleBlock.png",
        app.view.width / 1.5,
        40,
        rooms["inFourthRoom"],
        "inFourthRoom"
    );

    //5
    //top
    createGameElement(
        app.view.width / 3,
        85,
        "../assets/invisibleBlock.png",
        app.view.width,
        50,
        rooms["inFifthRoom"],
        "inFifthRoom"
    );
    //left
    createGameElement(25, 235, "../assets/invisibleBlock.png", 60, 300, rooms["inFifthRoom"], "inFifthRoom");
    //right
    createGameElement(500, 130, "../assets/invisibleBlock.png", 42, 135, rooms["inFifthRoom"], "inFifthRoom");
    createGameElement(500, 305, "../assets/invisibleBlock.png", 42, 135, rooms["inFifthRoom"], "inFifthRoom");
    createGameElement(500, 208, "../assets/door.png", 52, 52, rooms["inFifthRoom"], "inFifthRoom");
    //bot
    createGameElement(
        app.view.width / 3,
        365,
        "../assets/invisibleBlock.png",
        app.view.width / 1.5,
        40,
        rooms["inFifthRoom"],
        "inFifthRoom"
    );

    createGameElement(
        app.view.width / 2.25,
        app.view.height / 2.25,
        "../assets/box.png",
        30,
        23,
        rooms["inFifthRoom"],
        "inFifthRoom"
    );

    //6
    //top
    createGameElement(145, 95, "../assets/invisibleBlock.png", 215, 35, rooms["inSixthRoom"], "inSixthRoom");
    createGameElement(390, 95, "../assets/invisibleBlock.png", 215, 35, rooms["inSixthRoom"], "inSixthRoom");
    createGameElement(
        app.view.width / 3,
        app.view.height / 6.5,
        "../assets/door.png",
        52,
        52,
        rooms["inSixthRoom"],
        "inSixthRoom"
    );
    //left
    createGameElement(35, 130, "../assets/invisibleBlock.png", 42, 135, rooms["inSixthRoom"], "inSixthRoom");
    createGameElement(35, 305, "../assets/invisibleBlock.png", 42, 135, rooms["inSixthRoom"], "inSixthRoom");
    createGameElement(35, 208, "../assets/door.png", 52, 52, rooms["inSixthRoom"], "inSixthRoom");
    //right
    createGameElement(500, 235, "../assets/invisibleBlock.png", 40, 300, rooms["inSixthRoom"], "inSixthRoom");
    //bot
    createGameElement(390, 365, "../assets/invisibleBlock.png", 215, 35, rooms["inSixthRoom"], "inSixthRoom");
    createGameElement(145, 365, "../assets/invisibleBlock.png", 215, 35, rooms["inSixthRoom"], "inSixthRoom");
    createGameElement(
        app.view.width / 3,
        app.view.height - 245,
        "../assets/door.png",
        52,
        52,
        rooms["inSixthRoom"],
        "inSixthRoom"
    );

    //7
    //top
    createGameElement(
        app.view.width / 3,
        85,
        "../assets/invisibleBlock.png",
        app.view.width,
        50,
        rooms["inSeventhRoom"],
        "inSeventhRoom"
    );
    //left
    createGameElement(25, 235, "../assets/invisibleBlock.png", 60, 300, rooms["inSeventhRoom"], "inSeventhRoom");
    //right
    createGameElement(500, 235, "../assets/invisibleBlock.png", 40, 300, rooms["inSeventhRoom"], "inSeventhRoom");
    //bot
    createGameElement(390, 365, "../assets/invisibleBlock.png", 215, 35, rooms["inSeventhRoom"], "inSeventhRoom");
    createGameElement(145, 365, "../assets/invisibleBlock.png", 215, 35, rooms["inSeventhRoom"], "inSeventhRoom");
    createGameElement(
        app.view.width / 3,
        app.view.height - 245,
        "../assets/door.png",
        52,
        52,
        rooms["inSeventhRoom"],
        "inSeventhRoom"
    );

    createGameElement(
        app.view.width / 1.5,
        app.view.height / 1.5,
        "../assets/tear.png",
        100,
        100,
        rooms["inSeventhRoom"],
        "inSeventhRoom"
    );
}
