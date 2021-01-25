import * as PIXI from "pixi.js";
import createPlayer from "../Player/createPlayer";
import Fly from "../Mobs/fly";
import { app } from "../script";
import controller from "../Keyboard/keyboard";
import createElementsInAllRooms from "./createRooms";
import { createMap, updateMap } from "../topPanel/map";

import createGameElement from "../CreateSprite/createGameElement";
import checkBounds from "../checkBounds/checkBounds";
import addPlayerActions from "../Player/addPlayerActions";
import Gaper from "../Mobs/gaper";
import Milligan from "../Mobs/Milligan";

import createTopPanel from "../topPanel/createTopPanel";

const PlayerMethod = new createPlayer();
let player: any = {};
let playerHead: any = {};

const rooms: any = {
    inFirstRoom: new PIXI.Container(),
    inSecondRoom: new PIXI.Container(),
    inThirdRoom: new PIXI.Container(),
    inFourthRoom: new PIXI.Container(),
    inFifthRoom: new PIXI.Container(),
    inSixthRoom: new PIXI.Container(),
    inSeventhRoom: new PIXI.Container(),
    inEighthRoom: new PIXI.Container(),
    inNinthRoom: new PIXI.Container(),
    inTenthRoom: new PIXI.Container(),
};

let currentRoom = "inFirstRoom";

for (let room in rooms) {
    rooms[room].scale.set(1.5);
    rooms[room].sortableChildren = true;
}

const topPanel = new PIXI.Graphics();
const FlyClass = new Fly();
const GaperClass = new Gaper();
const MilliganClass = new Milligan();

function startGame() {
    app.loader.add("isaac", "../assets/isaac_moving_table.json");

    app.loader.load(() => {
        createElementsInAllRooms(rooms);
        PlayerMethod.doneLoading(); //РЕАЛИЗОВАТЬ ЗАГРУЗКУ СПРАЙТОВ В ОТДЕЛЬНОМ ПРОМИСЕ
        [player, playerHead] = PlayerMethod.init.call(PlayerMethod);
        setTimeout(() => {
            FlyClass.doneLoading.call(FlyClass);
            GaperClass.doneLoading.call(GaperClass);
            MilliganClass.doneLoading.call(MilliganClass);
        }, 500);
        controller(PlayerMethod);
    });

    app.stage.addChild(topPanel);

    const BackGroundImage = PIXI.Sprite.from("../assets/floor.png");
    BackGroundImage.width = 800;
    BackGroundImage.height = 500;
    BackGroundImage.x = 0;
    BackGroundImage.y = 100;
    BackGroundImage.anchor.set(0, 0);
    BackGroundImage.scale.set(1.5);

    app.stage.addChild(BackGroundImage);
    app.stage.addChild(rooms["inFirstRoom"]); // O N E

    createTopPanel();
}

function moveTo(room: string) {
    app.stage.removeChild(
        rooms["inFirstRoom"],
        rooms["inSecondRoom"],
        rooms["inThirdRoom"],
        rooms["inFourthRoom"],
        rooms["inFifthRoom"],
        rooms["inSixthRoom"],
        rooms["inSeventhRoom"],
        rooms["inEighthRoom"],
        rooms["inNinthRoom"],
        rooms["inTenthRoom"]
    );
    app.stage.addChild(rooms[room]);
    updateMap(currentRoom, room);
    currentRoom = room;
    //mapCells.tint = 0x7b28a4;
    //cell.endFill();
}

export { startGame, PlayerMethod, moveTo, currentRoom, topPanel, player, rooms, playerHead, FlyClass };
/*

            {
                "coords": [266, 170],
                "url": "instruction.png",
                "size": [400, 90],
                "room": "inFirstRoom"
            },
*/
