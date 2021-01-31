import * as PIXI from "pixi.js";
import { app, getApp } from "../script";
import { startGame } from "../Rooms/startGame";
import { renderMenu, renderOptionVolume } from "./menu";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";

const cont: any = getPauseScreen();

export default function renderPause(isShow: boolean) {
    if (isShow) {
        app.stage.addChild(cont);
        setTimeout(() => app.ticker.stop(), 100);
    } else {
        app.ticker.start();
        app.stage.removeChild(cont);
    }
}

function getPauseScreen() {
    const pauseScreen = new PIXI.Container();
    pauseScreen.width = 350;
    pauseScreen.height = 350;
    pauseScreen.x = 225;
    pauseScreen.y = 125;

    const pauseBackground = PIXI.Sprite.from("../../../images/pausecard.png");
    pauseBackground.width = 350;
    pauseBackground.height = 350;
    pauseBackground.zIndex = -1;

    const mainMenu = new PIXI.Text(`Main menu`, {
        fontSize: 40,
        fontFamily: "DRKrapka",
        fontWeight: "900",
    });
    mainMenu.x = 75;
    mainMenu.y = 250;
    mainMenu.interactive = true;
    mainMenu.buttonMode = true;
    mainMenu.on("click", () => {
        // app.ticker.start()
        app.view.dispatchEvent(new Event("mouseup"));
        app.stage.removeChildren();
        getApp();
        // setTimeout(()=>app.ticker.destroy(), 100)
    });

    pauseScreen.addChild(pauseBackground);
    pauseScreen.addChild(mainMenu);

    // pauseScreen.addChild(renderOptionVolume(0, 0, 0));
    return pauseScreen;
}
