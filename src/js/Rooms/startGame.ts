import * as PIXI from "pixi.js";
import createPlayer from "../Player/createPlayer";
import { app } from "../script";
import controller from "../Keyboard/keyboard";
import createElementsInAllRooms from "./createRooms";
import { updateMap } from "../topPanel/map";
import loadMobs from "../Mobs/loadMobs";
import createTopPanel from "../topPanel/createTopPanel";
import { soundGame } from "../otherScripts/sound";
import { createObjectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
interface RoomsInterface {
    [room: string]: PIXI.Container | any;
}

let rooms: RoomsInterface;
let currentRoom: any;
let countMobs: { count: number };
let BackGroundImage: PIXI.Sprite;
let topPanel: PIXI.Graphics;
let PlayerMethod: any;
let player: any;
let playerHead: any;

function startGame() {
    PlayerMethod = new createPlayer();
    player = {};
    playerHead = {};
    countMobs = { count: 0 };

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

    const loader = app.loader;
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

    app.stage.addChild(BackGroundImage);
    app.stage.addChild(rooms["inFirstRoom"]);

    createTopPanel();
}

function moveTo(room: string): void {
    app.stage.removeChild(rooms[currentRoom]);
    app.stage.addChild(rooms[room]);
    app.stage.setChildIndex(rooms[room], 1);
    updateMap(currentRoom, room);
    currentRoom = room;
    countMobs.count = 0;
    loadMobs();
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
    countMobs,
    BackGroundImage,
};
