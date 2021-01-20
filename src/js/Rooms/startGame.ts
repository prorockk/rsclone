import * as PIXI from "pixi.js";
import createPlayer from "../Player/createPlayer";
import Fly from "../Mobs/fly";
import { app } from "../script";
import controller from "../Keyboard/keyboard";
import createElementsInAllRooms from "./createRooms";
import { createMap, updateMap } from "./map";

import createGameElement from "../CreateSprite/createGameElement";
import checkBounds from "../checkBounds/checkBounds";
import addPlayerActions from "../Player/addPlayerActions";
import Gaper from "../Mobs/gaper";

const PlayerMethod = new createPlayer();
let player: any = {};

const rooms: any = {
    inFirstRoom: new PIXI.Container(),
    inSecondRoom: new PIXI.Container(),
    inThirdRoom: new PIXI.Container(),
    inFourthRoom: new PIXI.Container(),
    inFifthRoom: new PIXI.Container(),
    inSixthRoom: new PIXI.Container(),
    inSeventhRoom: new PIXI.Container(),
};

let currentRoom = "inFirstRoom";

for (let room in rooms) {
    rooms[room].scale.set(1.5);
}

const topPanel = new PIXI.Graphics();
//const mapCells: any = createMap();

function startGame() {
    const FlyClass = new Fly();
    const GaperClass = new Gaper();
    app.loader.add("isaac", "../assets/isaac_moving_table.json");

    app.loader.load(() => {
        createElementsInAllRooms(rooms);
        PlayerMethod.doneLoading(); //РЕАЛИЗОВАТЬ ЗАГРУЗКУ СПРАЙТОВ В ОТДЕЛЬНОМ ПРОМИСЕ
        player = PlayerMethod.init.call(PlayerMethod);
        setTimeout(FlyClass.doneLoading.bind(FlyClass), 500);
        //GaperClass.doneLoading();
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
    createMap();
    //createElementsInAllRooms(rooms); // Не было
}

function moveTo(room: string) {
    app.stage.removeChild(
        rooms["inFirstRoom"],
        rooms["inSecondRoom"],
        rooms["inThirdRoom"],
        rooms["inFourthRoom"],
        rooms["inFifthRoom"],
        rooms["inSixthRoom"],
        rooms["inSeventhRoom"]
    );
    app.stage.addChild(rooms[room]);
    updateMap(currentRoom, room);
    currentRoom = room;
    //mapCells.tint = 0x7b28a4;
    //cell.endFill();
}

export { startGame, PlayerMethod, moveTo, currentRoom, topPanel, player, rooms };
