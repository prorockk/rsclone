import * as PIXI from "pixi.js";
import { mainCounter } from "../Rooms/startGame";
import { app, getApp } from "../script";
import { sendChangeUser } from "./login";
import { soundGame } from "./sound";
import { setParamsToPixiElem } from "./setParamsToPixiElem";
import createFontStyle from "./createFontStyle";

const styleOptions: PIXI.TextStyle = new PIXI.TextStyle(createFontStyle(32, "DRKrapka", "900"));
const style: PIXI.TextStyle = new PIXI.TextStyle(createFontStyle(40, "DRKrapka", "900"));

export default function renderEndGame(isDeath?: boolean): void {
    let titleText: string;
    let newRunText: string;
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "deleteEvent" }));

    if (isDeath) {
        titleText = "Game over";
        newRunText = "Try again";
        mainCounter.user.death++;
    } else {
        titleText = "Congratulation";
        newRunText = "New Run";
        mainCounter.user.win++;
    }
    const endScreen: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(endScreen, 225, 125, 0, false, false, 350, 350);

    const endBackground: PIXI.Sprite = PIXI.Sprite.from("../../../images/pausecard.png");
    endBackground.width = 350;
    endBackground.height = 350;

    const title: PIXI.Text = new PIXI.Text(titleText, style);
    title.x = isDeath ? 80 : 25;
    title.y = 40;

    const tryAgain: PIXI.Text = new PIXI.Text(newRunText, styleOptions);
    setParamsToPixiElem(tryAgain, isDeath ? 100 : 110, 130, 0, true, true);
    tryAgain.on("click", () => {
        soundGame("floorMusic");
        leaveFromEndScreen();
        getApp(true);
    });

    const mainMenu: PIXI.Text = new PIXI.Text("Main menu", styleOptions);
    setParamsToPixiElem(mainMenu, 100, 230, 0, true, true);
    mainMenu.on("click", () => {
        soundGame("menuMusic");
        leaveFromEndScreen();
        getApp();
    });

    function leaveFromEndScreen(): void {
        app.ticker.start();
        app.stage.removeChildren();
        soundGame("endMusic", true);
        soundGame("deathMusic", true);
        soundGame("flyLoop1", true);
        soundGame("flyLoop2", true);
        soundGame("bossMusic", true);
        app.view.dispatchEvent(new Event("mouseup"));
    }

    sendChangeUser();

    endScreen.addChild(endBackground, title, tryAgain, mainMenu);

    app.stage.addChild(endScreen);
}
