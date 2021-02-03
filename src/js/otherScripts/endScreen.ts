import * as PIXI from "pixi.js";
import { mainCounter } from "../Rooms/startGame";
import { app, getApp } from "../script";
import { sendChangeUser } from "./login";
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
    let titleText: string;
    let newRunText: string;

    if (isDeath) {
        titleText = "Game over";
        newRunText = "Try again";
        mainCounter.user.death++;
    } else {
        titleText = "Congratulation";
        newRunText = "New Run";
        mainCounter.user.win++;
    }
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
        app.ticker.start();
        app.stage.removeChildren();
        soundGame("deathMusic", true);
        getApp(true);
    });

    const mainMenu = new PIXI.Text("Main menu", styleOptions);
    mainMenu.x = 100;
    mainMenu.y = 230;
    mainMenu.interactive = true;
    mainMenu.buttonMode = true;
    mainMenu.on("click", () => {
        app.ticker.start();
        app.stage.removeChildren();
        soundGame("deathMusic", true);
        soundGame("endMusic", true);
        app.view.dispatchEvent(new Event("mouseup"));
        getApp();
    });

    sendChangeUser();

    endScreen.addChild(endBackground, title, tryAgain, mainMenu);

    app.stage.addChild(endScreen);
}
