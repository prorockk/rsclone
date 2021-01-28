import * as PIXI from "pixi.js";
import createPlayer from "../Player/createPlayer";
import { app } from "../script";
import controller from "../Keyboard/keyboard";
import createElementsInAllRooms from "./createRooms";
import { updateMap } from "../topPanel/map";
import loadMobs from "../Mobs/loadMobs";
import createTopPanel from "../topPanel/createTopPanel";

const PlayerMethod = new createPlayer();
let player: any = {};
let playerHead: any = {};
let countMobs: number = 0;

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

function startGame() {
    const loader = app.loader;
    loader.add("isaac", "../assets/isaac_moving_table.json");
    loader.load(() => {
        createElementsInAllRooms(rooms);
        setTimeout(() => {
            loadMobs();
        }, 100);
    });
    loader.onComplete.add(() => {
        PlayerMethod.doneLoading(); //РЕАЛИЗОВАТЬ ЗАГРУЗКУ СПРАЙТОВ В ОТДЕЛЬНОМ ПРОМИСЕ
        [player, playerHead] = PlayerMethod.init.call(PlayerMethod);
        controller(PlayerMethod);
        app.stage.addChild(topPanel);
    });

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
    app.stage.setChildIndex(rooms[room], 1);
    updateMap(currentRoom, room);
    currentRoom = room;
    countMobs = 0;
    loadMobs();
    //mapCells.tint = 0x7b28a4;
    //cell.endFill();
}

export { startGame, PlayerMethod, moveTo, currentRoom, topPanel, player, rooms, playerHead, countMobs };
/*
            {
                "coords": [266, 170],
                "url": "instruction.png",
                "size": [400, 90],
                "room": "inFirstRoom"
            },
*/
