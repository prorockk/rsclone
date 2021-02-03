import * as PIXI from "pixi.js";
import { app, getApp } from "../script";
import { soundGame } from "./sound";

const styleOptions = new PIXI.TextStyle({
    fontSize: 32,
    fontFamily: "DRKrapka",
    fontWeight: "900",
});
const style = new PIXI.TextStyle({
    fontSize: 40,
    fontFamily: "DRKrapka",
    fontWeight: "900",
});

export default function renderEndGame(isDeath?: boolean) {
    document.dispatchEvent(new KeyboardEvent("keydown", { code: "deleteEvent" }));
    const titleText: string = isDeath ? "Game over" : "Congratulation";
    const newRunText: string = isDeath ? "Try again" : "New Run";

    const endScreen = new PIXI.Container();
    endScreen.width = 350;
    endScreen.height = 350;
    endScreen.x = 225;
    endScreen.y = 125;

    const endBackground = PIXI.Sprite.from("../../../images/pausecard.png");
    endBackground.width = 350;
    endBackground.height = 350;

    const title = new PIXI.Text(titleText, style);
    title.x = isDeath ? 80 : 25;
    title.y = 40;

    const tryAgain = new PIXI.Text(newRunText, styleOptions);
    tryAgain.x = isDeath ? 100 : 110;
    tryAgain.y = 130;
    tryAgain.interactive = true;
    tryAgain.buttonMode = true;
    tryAgain.on("click", () => {
        leaveFromEndScreen();
        getApp(true);
    });

    const mainMenu = new PIXI.Text("Main menu", styleOptions);
    mainMenu.x = 100;
    mainMenu.y = 230;
    mainMenu.interactive = true;
    mainMenu.buttonMode = true;
    mainMenu.on("click", () => {
        soundGame("menuMusic");
        leaveFromEndScreen();
        getApp();
    });

    function leaveFromEndScreen() {
        app.ticker.start();
        app.stage.removeChildren();
        soundGame("endMusic", true);
        soundGame("deathMusic", true);
        app.view.dispatchEvent(new Event("mouseup"));
    }

    endScreen.addChild(endBackground, title, tryAgain, mainMenu);

    app.stage.addChild(endScreen);
}
