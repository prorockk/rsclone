import * as PIXI from "pixi.js";
import { app, getApp } from "../script";
import { onOff, soundGame } from "./sound";

let musicIsOn = true;
let soundsIsOn = true;

const style = new PIXI.TextStyle({
    fontSize: 40,
    fontFamily: "DRKrapka",
    fontWeight: "900",
});
const styleOptions = new PIXI.TextStyle({
    fontSize: 32,
    fontFamily: "DRKrapka",
    fontWeight: "900",
});

const cont: any = getPauseScreen();

export function renderPause(isShow: boolean) {
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

function getPauseScreen() {
    const music = new PIXI.Text("Music", styleOptions);
    music.x = 50;
    music.y = 60;

    const musicOnOff = new PIXI.Container();
    musicOnOff.x = 200;
    musicOnOff.y = 60;
    musicOnOff.interactive = true;
    musicOnOff.buttonMode = true;
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

    const musicOn = new PIXI.Text("On", styleOptions);

    const sounds = new PIXI.Text("Sounds", styleOptions);
    sounds.x = 50;
    sounds.y = 110;

    const soundsOnOff = new PIXI.Container();
    soundsOnOff.x = 200;
    soundsOnOff.y = 110;
    soundsOnOff.interactive = true;
    soundsOnOff.buttonMode = true;
    soundsOnOff.on("click", () => {
        app.ticker.start();
        soundsOnOff.removeChildren();
        if (soundsIsOn) {
            soundsOnOff.addChild(new PIXI.Text("Off", styleOptions));
            onOff(true, "sounds");
        } else {
            soundsOnOff.addChild(new PIXI.Text("On", styleOptions));
            onOff(false, "dounds");
        }
        setTimeout(() => app.ticker.stop(), 30);
        soundsIsOn = !soundsIsOn;
    });
    const soundsOn = new PIXI.Text("On", styleOptions);

    const pauseScreen = new PIXI.Container();
    pauseScreen.width = 350;
    pauseScreen.height = 350;
    pauseScreen.x = 225;
    pauseScreen.y = 125;

    const pauseBackground = PIXI.Sprite.from("../../../images/pausecard.png");
    pauseBackground.width = 350;
    pauseBackground.height = 350;
    // pauseBackground.zIndex = -1;

    const resumeGame = new PIXI.Text(`Resume Game`, style);
    resumeGame.x = 45;
    resumeGame.y = 200;
    resumeGame.interactive = true;
    resumeGame.buttonMode = true;
    resumeGame.on("click", () => {
        const event = new KeyboardEvent("keydown", { code: "Escape" });
        document.dispatchEvent(event);
        renderPause(false);
    });

    const mainMenu = new PIXI.Text(`Main menu`, style);
    mainMenu.x = 75;
    mainMenu.y = 250;
    mainMenu.interactive = true;
    mainMenu.buttonMode = true;
    mainMenu.on("click", () => {
        document.dispatchEvent(new KeyboardEvent("keydown", { code: "deleteEvent" }));
        app.view.dispatchEvent(new Event("mouseup"));
        app.stage.removeChildren();
        getApp();
    });
    musicOnOff.addChild(musicOn);
    soundsOnOff.addChild(soundsOn);
    pauseScreen.addChild(pauseBackground, mainMenu, resumeGame, music, sounds, musicOnOff, soundsOnOff);

    return pauseScreen;
}
