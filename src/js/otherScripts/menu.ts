import * as PIXI from "pixi.js";
import { app } from "../script";
import { mainCounter, startGame } from "../Rooms/startGame";
import { soundGame, changeVolume } from "./sound";
import { changeControls, moveControls } from "./changeControls";
import * as storage from "./storage";
import createFontStyle from "./createFontStyle";
import { setParamsToPixiElem } from "./setParamsToPixiElem";

let currentSoundVolume = storage.get("soundVolume") === null ? 5 : storage.get("soundVolume") * 10;
let currentMusicVolume = storage.get("musicVolume") === null ? 5 : storage.get("musicVolume") * 10;

let isFirstTime: boolean = true;

const style: PIXI.TextStyle = new PIXI.TextStyle(createFontStyle(40, "DRKrapka", "900"));
const styleOptions: PIXI.TextStyle = new PIXI.TextStyle(createFontStyle(32, "DRKrapka", "900"));

let sheet: any;

function renderMenu() {
    const backgroundMenu = PIXI.Sprite.from("./images/menuBack.png");
    backgroundMenu.width = 800;
    backgroundMenu.height = 600;

    const newGame = new PIXI.Text("NEW RUN", style);
    setParamsToPixiElem(newGame, 200, 120, -0.1, true, true);

    newGame.on("mouseover", (e: any) => {
        e.target.scale.set(1.1);
        soundGame("select");
    });
    newGame.on("mouseout", () => {
        newGame.scale.set(1);
        soundGame("unselect");
    });
    newGame.on("click", () => {
        app.stage.removeChildren();
        const startGameImg = PIXI.Sprite.from("../../../images/pentagramma.png");
        startGameImg.anchor.set(0.5);
        startGameImg.x = 400;
        startGameImg.y = 300;
        app.ticker.add(() => (startGameImg.rotation += 0.03));
        app.stage.addChild(startGameImg);
        soundGame("menuMusic", true);
        soundGame("startMusic");
        setTimeout(() => {
            app.stage.removeChildren();
            startGame();
            soundGame("floorMusic");
        }, 4000);
    });

    const options: PIXI.Text = new PIXI.Text("OPTIONS", style);
    setParamsToPixiElem(options, 215, 250, -0.1, true, true);

    options.on("mouseover", (e: any) => {
        e.target.scale.set(1.1);
        soundGame("select");
    });
    options.on("mouseout", () => {
        options.scale.set(1);
        soundGame("unselect");
    });
    options.on("click", () => {
        app.stage.removeChild(menuList);
        renderOptions();
        soundGame("pageTurn");
    });

    const stat: PIXI.Text = new PIXI.Text("STATS", style);
    setParamsToPixiElem(stat, 225, 370, -0.1, true, true);

    stat.on("mouseover", (e: any) => {
        e.target.scale.set(1.1);
        soundGame("select");
    });
    stat.on("mouseout", () => {
        stat.scale.set(1);
        soundGame("unselect");
    });
    stat.on("click", () => {
        app.stage.removeChild(menuList);
        renderStats();
        soundGame("pageTurn");
    });

    const menuList = new PIXI.Container();
    menuList.addChild(newGame, options, stat);

    app.stage.addChild(backgroundMenu, menuList);

    if (isFirstTime) {
        PIXI.Loader.shared.add("../../../assets/volume.json").load(setup);
        function setup() {
            sheet = PIXI.Loader.shared.resources["../../../assets/volume.json"].spritesheet;
        }
        isFirstTime = false;
    }
}

function renderStats() {
    const user = mainCounter.user;

    const statList: PIXI.Container = new PIXI.Container();

    const name: PIXI.Text = new PIXI.Text(`${user.name}`, style);
    setParamsToPixiElem(name, 310, 150, -0.1, false, false);
    name.anchor.set(0.5);

    const death: PIXI.Text = new PIXI.Text(`Deaths:   ${user.death}`, style);
    setParamsToPixiElem(death, 210, 220, -0.1, false, false);

    const kills: PIXI.Text = new PIXI.Text(`Kills:   ${user.kills}`, style);
    setParamsToPixiElem(kills, 220, 290, -0.1, false, false);

    const wins: PIXI.Text = new PIXI.Text(`Wins:   ${user.win}`, style);
    setParamsToPixiElem(wins, 230, 360, -0.1, false, false);

    const back: PIXI.Text = new PIXI.Text("X", style);
    setParamsToPixiElem(back, 525, 420, -0.1, true, true);

    back.on("click", () => {
        app.stage.removeChild(statList);
        renderMenu();
        soundGame("pageTurn");
    });
    statList.addChild(name, death, kills, back, wins);
    app.stage.addChild(statList);
}

function renderOptions() {
    const controls = new PIXI.Text("Controls", style);
    setParamsToPixiElem(controls, 220, 260, -0.1, false, false);

    const backFromOptions: PIXI.Text = new PIXI.Text("X", style);
    setParamsToPixiElem(backFromOptions, 525, 420, -0.1, true, true);

    backFromOptions.on("click", () => {
        app.stage.removeChild(optionsList);
        renderMenu();
        soundGame("pageTurn");
    });

    const movesControl: PIXI.Sprite = new PIXI.Sprite(sheet.textures[`controls.png`]);
    setParamsToPixiElem(movesControl, 330, 390, -0.1, false, false);
    movesControl.scale.set(1.5);

    const up: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(up, 310, 320, -0.1, true, true, 33, 33);

    up.on("click", () => pressControls(up, "up", `${storage.get("up").slice(3)}`));
    const upKey = new PIXI.Text(`${storage.get("up").slice(3)}`, styleOptions);
    up.addChild(upKey);

    const right: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(right, 370, 370, -0.1, true, true, 33, 33);

    right.on("click", () => pressControls(right, "right", `${storage.get("right").slice(3)}`));
    const rightKey = new PIXI.Text(`${storage.get("right").slice(3)}`, styleOptions);
    right.addChild(rightKey);

    const down: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(down, 320, 430, -0.1, true, true, 33, 33);

    down.on("click", () => pressControls(down, "down", `${storage.get("down").slice(3)}`));
    const downKey = new PIXI.Text(`${storage.get("down").slice(3)}`, styleOptions);
    down.addChild(downKey);

    const left: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(left, 260, 380, -0.1, true, true, 33, 33);

    left.on("click", () => pressControls(left, "left", "A"));
    const leftKey = new PIXI.Text(`${storage.get("left").slice(3)}`, styleOptions);
    left.addChild(leftKey);

    const optionsList = new PIXI.Container();

    optionsList.addChild(
        backFromOptions,
        controls,
        movesControl,
        up,
        right,
        down,
        left,
        renderOptionVolume(150, 95, -0.1)
    );

    app.stage.addChild(optionsList);
}

function renderOptionVolume(left: number, top: number, rotation: number) {
    const volume = new PIXI.Text("Volume", style);
    setParamsToPixiElem(volume, 85, 0, -0.1, false, false);

    const music = new PIXI.Text("Music", styleOptions);
    setParamsToPixiElem(music, 10, 60, -0.1, false, false);

    const musicVolumeLeft = PIXI.Sprite.from("../../images/arrow.png");
    setParamsToPixiElem(musicVolumeLeft, 150, 87, 3.3, true, true, 30, 30);

    musicVolumeLeft.on("click", () => {
        if (currentMusicVolume > 0) {
            currentMusicVolume -= 1;
            musicVolume.removeChildren();
            musicVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentMusicVolume}.png`]));
            changeVolume(currentMusicVolume, currentSoundVolume);
            soundGame("select");
        }
    });

    const musicVolume = new PIXI.Container();
    musicVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentMusicVolume}.png`]));
    setParamsToPixiElem(musicVolume, 205, 30, -0.15, false, false);

    const musicVolumeRight = PIXI.Sprite.from("../../images/arrow.png");
    setParamsToPixiElem(musicVolumeRight, 260, 35, -0.1, true, true, 30, 30);

    musicVolumeRight.on("click", () => {
        if (currentMusicVolume < 10) {
            currentMusicVolume += 1;
            musicVolume.removeChildren();
            musicVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentMusicVolume}.png`]));
            changeVolume(currentMusicVolume, currentSoundVolume);
            soundGame("unselect");
        }
    });

    const sounds = new PIXI.Text("Sounds", styleOptions);
    setParamsToPixiElem(sounds, 10, 110, -0.1, false, false);

    const soundsVolumeLeft = PIXI.Sprite.from("../../images/arrow.png");
    setParamsToPixiElem(soundsVolumeLeft, 150, 135, 3.3, true, true, 30, 30);

    soundsVolumeLeft.on("click", () => {
        if (currentSoundVolume > 0) {
            currentSoundVolume -= 1;
            soundsVolume.removeChildren();
            soundsVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentSoundVolume}.png`]));
            changeVolume(currentMusicVolume, currentSoundVolume);
            soundGame("select");
        }
    });

    const soundsVolume = new PIXI.Container();
    soundsVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentSoundVolume}.png`]));
    setParamsToPixiElem(soundsVolume, 210, 110, -0.15, false, false);

    const soundsVolumeRight = PIXI.Sprite.from("../../images/arrow.png");
    setParamsToPixiElem(soundsVolumeRight, 265, 85, -0.1, true, true, 30, 30);

    soundsVolumeRight.on("click", () => {
        if (currentSoundVolume < 10) {
            currentSoundVolume += 1;
            soundsVolume.removeChildren();
            soundsVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentSoundVolume}.png`]));
            changeVolume(currentMusicVolume, currentSoundVolume);
            soundGame("unselect");
        }
    });

    const volumeContainer = new PIXI.Container();
    setParamsToPixiElem(volumeContainer, left, top, 0, false, false, 330, 150);
    // volumeContainer.zIndex = 100;

    volumeContainer.addChild(
        soundsVolumeRight,
        soundsVolumeLeft,
        musicVolumeRight,
        musicVolumeLeft,
        volume,
        music,
        musicVolume,
        sounds,
        soundsVolume
    );

    return volumeContainer;
}

function pressControls(container: PIXI.Container, direction: string, defaultKey: string) {
    container.children[0].alpha = 0;
    const keyPressListener = (e: KeyboardEvent): void => {
        container.removeChildren();
        if (Object.values(moveControls).indexOf(e.code) === -1 && e.code.match(/Key/)) {
            const text = new PIXI.Text(`${e.code.slice(3)}`, styleOptions);
            text.rotation = -0.1;
            container.addChild(text);
            changeControls(`${direction}`, `${e.code}`);
        } else {
            container.addChild(new PIXI.Text(`${defaultKey}`, styleOptions));
        }
        document.removeEventListener("keypress", keyPressListener);
    };
    document.addEventListener("keypress", keyPressListener);
}

export { renderMenu, renderOptionVolume };
