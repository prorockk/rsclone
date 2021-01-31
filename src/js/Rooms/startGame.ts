import * as PIXI from "pixi.js";
import createPlayer from "../Player/createPlayer";
import { app } from "../script";
import controller from "../Keyboard/keyboard";
import createElementsInAllRooms from "./createRooms";
import { updateMap } from "../topPanel/map";
import loadMobs from "../Mobs/loadMobs";
import createTopPanel from "../topPanel/createTopPanel";

const PlayerMethod: createPlayer = new createPlayer();
let player: any = {};
let playerHead: any = {};
let countMobs: { count: number } = { count: 0 };

interface RoomsInterface {
    [room: string]: PIXI.Container | any;
}
const rooms: RoomsInterface = {
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

let currentRoom: string = "inFirstRoom";

for (let room in rooms) {
    rooms[room].scale.set(1.5);
    rooms[room].sortableChildren = true;
}

const topPanel: PIXI.Graphics = new PIXI.Graphics();

const BackGroundImage: PIXI.Sprite = PIXI.Sprite.from("../assets/floor.png");
BackGroundImage.width = 800;
BackGroundImage.height = 500;
BackGroundImage.x = 0;
BackGroundImage.y = 100;
BackGroundImage.anchor.set(0, 0);

function startGame(): void {
    const loader: PIXI.Loader = app.loader;
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
