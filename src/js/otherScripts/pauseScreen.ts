import * as PIXI from "pixi.js";
import { app, getApp } from "../script";
import { onOff, soundGame } from "./sound";
import * as storage from "./storage";

let musicIsOn = true;
let soundsIsOn = true;

let currentSoundVolume = storage.get("soundVolume") === null ? 5 : storage.get("soundVolume") * 10;
let currentMusicVolume = storage.get("musicVolume") === null ? 5 : storage.get("musicVolume") * 10;

export const closePause = (e: KeyboardEvent) => {
    if (e.keyCode === 27) renderPause(false);
};
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
    musicOnOff.on("click", (e: Event) => {
        app.ticker.start();
        musicOnOff.removeChildren();
        if (musicIsOn) {
            console.log(2);
            musicOnOff.addChild(new PIXI.Text("Off", styleOptions));
            onOff(true);
        } else {
            console.log(currentMusicVolume);

            musicOnOff.addChild(new PIXI.Text("On", styleOptions));
            onOff(false);
        }
        setTimeout(() => app.ticker.stop(), 30);
        musicIsOn = !musicIsOn;
    });

    const musicOn = new PIXI.Text("On", styleOptions);

    const sounds = new PIXI.Text("Sounds", styleOptions);
    sounds.x = 50;
    sounds.y = 110;

    const pauseScreen = new PIXI.Container();
    pauseScreen.width = 350;
    pauseScreen.height = 350;
    pauseScreen.x = 225;
    pauseScreen.y = 125;

    const pauseBackground = PIXI.Sprite.from("../../../images/pausecard.png");
    pauseBackground.width = 350;
    pauseBackground.height = 350;
    pauseBackground.zIndex = -1;

    const resumeGame = new PIXI.Text(`Resume Game`, style);
    resumeGame.x = 45;
    resumeGame.y = 200;
    resumeGame.interactive = true;
    resumeGame.buttonMode = true;
    resumeGame.on("click", () => {
        // const t = new KeyboardEvent('keydown', {keyCode: 27})
        // document.dispatchEvent(t)
        renderPause(false);
    });

    const mainMenu = new PIXI.Text(`Main menu`, style);
    mainMenu.x = 75;
    mainMenu.y = 250;
    mainMenu.interactive = true;
    mainMenu.buttonMode = true;
    mainMenu.on("click", () => {
        const t = new KeyboardEvent("keydown");
        document.dispatchEvent(t);
        // app.ticker.start()
        app.view.dispatchEvent(new Event("mouseup"));
        app.stage.removeChildren();
        getApp();
        // setTimeout(()=>app.ticker.destroy(), 100)
    });
    musicOnOff.addChild(musicOn);
    pauseScreen.addChild(pauseBackground);
    pauseScreen.addChild(mainMenu);
    pauseScreen.addChild(resumeGame);
    pauseScreen.addChild(music);
    pauseScreen.addChild(sounds);
    pauseScreen.addChild(musicOnOff);

    // pauseScreen.addChild(renderOptionVolume(0, 0, 0));
    return pauseScreen;
}
