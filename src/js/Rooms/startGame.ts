import * as PIXI from "pixi.js";
import createPlayer from "../Player/createPlayer";
import { app } from "../script";
import controller from "../Keyboard/keyboard";
import createElementsInAllRooms from "./createRooms";
import { updateMap } from "../topPanel/map";
import loadMobs from "../Mobs/loadMobs";
import createTopPanel from "../topPanel/createTopPanel";
import { soundGame } from "../otherScripts/sound";
import { createObjectOfGameObjects } from "../CreateSprite/GameObjects";
import { sendChangeUser } from "../otherScripts/login";
interface RoomsInterface {
    [room: string]: PIXI.Container | any;
}

let rooms: RoomsInterface;
let currentRoom: any;
let mainCounter: {
    count: number;
    user: { name: string; kills: number; death: number; win: number; [id: string]: string | number };
} = {
    count: 0,
    user: { name: "", kills: 0, death: 0, win: 0 },
};
let BackGroundImage: PIXI.Sprite;
let topPanel: PIXI.Graphics;
let PlayerMethod: any;
let player: any;
let playerHead: any;

function startGame(startGameImg?: PIXI.Sprite) {
    PlayerMethod = new createPlayer();
    player = {};
    playerHead = {};
    mainCounter.count = 0;

    rooms = {
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

    currentRoom = "inFirstRoom";

    for (let room in rooms) {
        rooms[room].scale.set(1.5);
        rooms[room].sortableChildren = true;
    }

    topPanel = new PIXI.Graphics();

    BackGroundImage = PIXI.Sprite.from("../assets/floor.png");
    BackGroundImage.width = 800;
    BackGroundImage.height = 500;
    BackGroundImage.x = 0;
    BackGroundImage.y = 100;
    BackGroundImage.anchor.set(0, 0);

    createObjectOfGameObjects();

    const loader: PIXI.Loader = app.loader;
    loader.load(async function () {
        await createElementsInAllRooms(rooms);
        loadMobs();
        PlayerMethod.doneLoading();
        [player, playerHead] = PlayerMethod.init.call(PlayerMethod);
        controller(PlayerMethod);
    });

    createTopPanel();
    app.stage.addChild(BackGroundImage);
    app.stage.addChild(rooms["inFirstRoom"]);
    app.stage.addChild(topPanel);
}

function moveTo(room: string): void {
    app.stage.removeChild(rooms[currentRoom]);
    app.stage.addChild(rooms[room]);
    app.stage.setChildIndex(rooms[room], 1);
    updateMap(currentRoom, room);
    currentRoom = room;
    mainCounter.count = 0;
    loadMobs();
    sendChangeUser();
}

export {
    startGame,
    PlayerMethod,
    moveTo,
    currentRoom,
    topPanel,
    player,
    rooms,
    playerHead,
    mainCounter,
    BackGroundImage,
};
