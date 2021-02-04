/* eslint-disable import/no-cycle */
import * as PIXI from "pixi.js";
import { app, getApp } from "../script";
import { sendChangeUser } from "./login";
import { onOff, soundGame } from "./sound";
import createFontStyle from "./createFontStyle";
import { setParamsToPixiElem } from "./setParamsToPixiElem";

let musicIsOn: boolean = true;
let soundsIsOn: boolean = true;

const style: PIXI.TextStyle = new PIXI.TextStyle(createFontStyle(40, "DRKrapka", "900"));

const styleOptions: PIXI.TextStyle = new PIXI.TextStyle(createFontStyle(32, "DRKrapka", "900"));

function getPauseScreen(): PIXI.Container {
    const music = new PIXI.Text("Music", styleOptions);
    setParamsToPixiElem(music, 50, 60, 0, false, false);

    const musicOnOff = new PIXI.Container();
    setParamsToPixiElem(musicOnOff, 200, 60, 0, true, true);

    musicOnOff.on("click", () => {
        app.ticker.start();
        musicOnOff.removeChildren();
        if (musicIsOn) {
            musicOnOff.addChild(new PIXI.Text("Off", styleOptions));
            onOff(true, "music");
        } else {
            musicOnOff.addChild(new PIXI.Text("On", styleOptions));
            onOff(false, "music");
        }
        setTimeout(() => app.ticker.stop(), 30);
        musicIsOn = !musicIsOn;
    });

    const musicOn: PIXI.Text = new PIXI.Text("On", styleOptions);

    const sounds: PIXI.Text = new PIXI.Text("Sounds", styleOptions);
    setParamsToPixiElem(sounds, 50, 110, 0, false, false);

    const soundsOnOff: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(soundsOnOff, 200, 110, 0, true, true);

    soundsOnOff.on("click", () => {
        app.ticker.start();
        soundsOnOff.removeChildren();
        if (soundsIsOn) {
            soundsOnOff.addChild(new PIXI.Text("Off", styleOptions));
            onOff(true, "sounds");
        } else {
            soundsOnOff.addChild(new PIXI.Text("On", styleOptions));
            onOff(false, "sounds");
        }
        setTimeout(() => app.ticker.stop(), 30);
        soundsIsOn = !soundsIsOn;
    });
    const soundsOn: PIXI.Text = new PIXI.Text("On", styleOptions);

    const pauseScreen: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(pauseScreen, 225, 125, 0, false, false, 350, 350);

    const pauseBackground: PIXI.Sprite = PIXI.Sprite.from("../../../images/pausecard.png");
    pauseBackground.width = 350;
    pauseBackground.height = 350;

    const resumeGame: PIXI.Text = new PIXI.Text("Resume Game", style);
    setParamsToPixiElem(resumeGame, 45, 200, 0, true, true);

    resumeGame.on("click", () => {
        document.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        renderPause(false);
        sendChangeUser();
    });

    const mainMenu: PIXI.Text = new PIXI.Text("Main menu", style);
    setParamsToPixiElem(mainMenu, 75, 250, 0, true, true);

    mainMenu.on("click", () => {
        soundGame("floorMusic", true);
        soundGame("flyLoop1", true);
        soundGame("bossMusic", true);
        soundGame("flyLoop2", true);
        soundGame("menuMusic");
        document.dispatchEvent(new KeyboardEvent("keydown", { code: "deleteEvent" }));
        app.view.dispatchEvent(new Event("mouseup"));
        app.stage.removeChildren();
        getApp();
        sendChangeUser();
    });

    musicOnOff.addChild(musicOn);
    soundsOnOff.addChild(soundsOn);
    pauseScreen.addChild(pauseBackground, mainMenu, resumeGame, music, sounds, musicOnOff, soundsOnOff);

    return pauseScreen;
}
const cont: PIXI.Container = getPauseScreen();

export function renderPause(isShow: boolean): void {
    if (isShow) {
        soundGame("pageTurn");
        app.stage.addChild(cont);
        setTimeout(() => app.ticker.stop(), 100);
    } else {
        app.ticker.start();
        app.stage.removeChild(cont);
        soundGame("pageTurn");
    }
}

export const closePause = (e: KeyboardEvent) => {
    if (e.keyCode === 27) renderPause(false);
};
