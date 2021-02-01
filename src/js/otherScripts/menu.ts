import * as PIXI from "pixi.js";
import { app } from "../script";
import { startGame } from "../Rooms/startGame";
import { soundGame, changeVolume } from "./sound";
import { changeControls, moveControls } from "./changeControls";
import * as storage from "./storage";
import createFontStyle from "./createFontStyle";
import { setParamsToPixiElem } from "./setParamsToPixiElem";

let currentSoundVolume = storage.get("soundVolume") === null ? 5 : storage.get("soundVolume") * 10;
let currentMusicVolume = storage.get("musicVolume") === null ? 5 : storage.get("musicVolume") * 10;

let isMusic: boolean = false;

const style: PIXI.TextStyle = new PIXI.TextStyle(createFontStyle(40, "DRKrapka", "900"));
const styleOptions: PIXI.TextStyle = new PIXI.TextStyle(createFontStyle(32, "DRKrapka", "900"));

let sheet: any;

function renderMenu() {
    const backgroundMenu = PIXI.Sprite.from("./images/menuBack.png");
    backgroundMenu.width = 800;
    backgroundMenu.height = 600;
    app.stage.addChild(backgroundMenu);

    const newGame = new PIXI.Text("NEW RUN", style);
    setParamsToPixiElem(newGame, 200, 120, -0.1, true, true);
    // newGame.x = 200;
    // newGame.y = 120;
    // newGame.rotation = -0.1;
    // newGame.interactive = true;
    // newGame.buttonMode = true;
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
        const startGameImg = PIXI.Sprite.from("../../../images/startGameBook.png");
        startGameImg.anchor.set(0.5);
        startGameImg.x = 400;
        startGameImg.y = 300;
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
    // options.x = 215;
    // options.y = 250;
    // options.rotation = -0.1;
    // options.interactive = true;
    // options.buttonMode = true;
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
    // stat.x = 225;
    // stat.y = 370;
    // stat.rotation = -0.1;
    // stat.interactive = true;
    // stat.buttonMode = true;
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

    const exit: PIXI.Text = new PIXI.Text("X", style);
    setParamsToPixiElem(exit, 525, 420, -0.1, true, true);
    // exit.x = 525;
    // exit.y = 420;
    // exit.rotation = -0.1;
    // exit.interactive = true;
    // exit.buttonMode = true;
    exit.on("mouseover", (e: any) => e.target.scale.set(1.1));
    exit.on("mouseout", () => exit.scale.set(1));
    exit.on("click", () => window.close());

    const menuList = new PIXI.Container();
    menuList.addChild(newGame);
    menuList.addChild(options);
    menuList.addChild(stat);
    menuList.addChild(exit);

    app.stage.addChild(menuList);

    if (!isMusic) {
        PIXI.Loader.shared.add("../../../assets/volume.json").load(setup);
        function setup() {
            sheet = PIXI.Loader.shared.resources["../../../assets/volume.json"].spritesheet;
        }
        isMusic = true;
        soundGame("menuMusic");
    }
}

function renderStats() {
    const death: PIXI.Text = new PIXI.Text("Death:   0", style);
    setParamsToPixiElem(death, 200, 150, -0.1, true, true);
    // death.x = 200;
    // death.y = 150;
    // death.rotation = -0.1;
    // death.interactive = true;
    // death.buttonMode = true;

    const kills: PIXI.Text = new PIXI.Text("Kills:   0", style);
    setParamsToPixiElem(kills, 210, 250, -0.1, true, true);
    // kills.x = 210;
    // kills.y = 250;
    // kills.rotation = -0.1;
    // kills.interactive = true;
    // kills.buttonMode = true;

    const back: PIXI.Text = new PIXI.Text("X", style);
    setParamsToPixiElem(back, 525, 420, -0.1, true, true);
    // back.x = 525;
    // back.y = 420;
    // back.rotation = -0.1;
    // back.interactive = true;
    // back.buttonMode = true;
    back.on("click", () => {
        app.stage.removeChild(statList);
        renderMenu();
        soundGame("pageTurn");
    });

    const statList: PIXI.Container = new PIXI.Container();
    statList.addChild(death);
    statList.addChild(kills);
    statList.addChild(back);
    app.stage.addChild(statList);
}

function renderOptions() {
    const controls = new PIXI.Text("Controls", style);
    controls.x = 220;
    controls.y = 260;
    controls.rotation = -0.1;

    const backFromOptions: PIXI.Text = new PIXI.Text("X", style);
    setParamsToPixiElem(backFromOptions, 525, 420, -0.1, true, true);
    // backFromOptions.x = 525;
    // backFromOptions.y = 420;
    // backFromOptions.rotation = -0.1;
    // backFromOptions.interactive = true;
    // backFromOptions.buttonMode = true;
    backFromOptions.on("click", () => {
        app.stage.removeChild(optionsList);
        renderMenu();
        soundGame("pageTurn");
    });

    const movesControl: PIXI.Sprite = new PIXI.Sprite(sheet.textures[`controls.png`]);
    movesControl.x = 330;
    movesControl.y = 390;
    movesControl.rotation = -0.1;
    movesControl.scale.set(1.5);

    const up: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(up, 310, 320, -0.1, true, true, 33, 33);
    // up.x = 310;
    // up.y = 320;
    // up.width = 33;
    // up.height = 33;
    // up.rotation = -0.1;
    // up.interactive = true;
    // up.buttonMode = true;
    up.on("click", () => pressControls(up, "up", `${storage.get("up").slice(3)}`));
    const upKey = new PIXI.Text(`${storage.get("up").slice(3)}`, styleOptions);
    up.addChild(upKey);

    const right: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(right, 370, 370, -0.1, true, true, 33, 33);
    // right.x = 370;
    // right.y = 370;
    // right.width = 33;
    // right.height = 33;
    // right.rotation = -0.1;
    // right.interactive = true;
    // right.buttonMode = true;
    right.on("click", () => pressControls(right, "right", `${storage.get("right").slice(3)}`));
    const rightKey = new PIXI.Text(`${storage.get("right").slice(3)}`, styleOptions);
    right.addChild(rightKey);

    const down: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(down, 320, 430, -0.1, true, true, 33, 33);
    // down.x = 320;
    // down.y = 430;
    // down.width = 33;
    // down.height = 33;
    // down.rotation = -0.1;
    // down.interactive = true;
    // down.buttonMode = true;
    down.on("click", () => pressControls(down, "down", `${storage.get("down").slice(3)}`));
    const downKey = new PIXI.Text(`${storage.get("down").slice(3)}`, styleOptions);
    down.addChild(downKey);

    const left: PIXI.Container = new PIXI.Container();
    setParamsToPixiElem(left, 260, 380, -0.1, true, true, 33, 33);
    // left.x = 260;
    // left.y = 380;
    // left.width = 33;
    // left.height = 33;
    // left.rotation = -0.1;
    // left.interactive = true;
    // left.buttonMode = true;
    left.on("click", () => pressControls(left, "left", "A"));
    const leftKey = new PIXI.Text(`${storage.get("left").slice(3)}`, styleOptions);
    left.addChild(leftKey);

    const optionsList = new PIXI.Container();

    optionsList.addChild(backFromOptions);

    optionsList.addChild(controls);
    optionsList.addChild(movesControl);
    optionsList.addChild(up);
    optionsList.addChild(right);
    optionsList.addChild(down);
    optionsList.addChild(left);
    optionsList.addChild(renderOptionVolume(150, 95, -0.1));
    app.stage.addChild(optionsList);
}

function renderOptionVolume(left: number, top: number, rotation: number) {
    const volume = new PIXI.Text("Volume", style);
    volume.x = 85;
    volume.rotation = rotation;

    const music = new PIXI.Text("Music", styleOptions);
    music.x = 10;
    music.y = 60;
    music.rotation = rotation;

    const musicVolumeLeft = PIXI.Sprite.from("../../images/arrow.png");
    setParamsToPixiElem(musicVolumeLeft, 150, 87, 3.3, true, true, 30, 30);
    // musicVolumeLeft.width = 30;
    // musicVolumeLeft.height = 30;
    // musicVolumeLeft.x = 150;
    // musicVolumeLeft.y = 87;
    // musicVolumeLeft.rotation = 3.3;
    // musicVolumeLeft.interactive = true;
    // musicVolumeLeft.buttonMode = true;
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
    musicVolume.x = 205;
    musicVolume.y = 60;
    musicVolume.rotation = -0.15;

    const musicVolumeRight = PIXI.Sprite.from("../../images/arrow.png");
    setParamsToPixiElem(musicVolumeRight, 260, 35, -0.1, true, true, 30, 30);
    // musicVolumeRight.width = 30;
    // musicVolumeRight.height = 30;
    // musicVolumeRight.x = 260;
    // musicVolumeRight.y = 35;
    // musicVolumeRight.rotation = -0.1;
    // musicVolumeRight.interactive = true;
    // musicVolumeRight.buttonMode = true;
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
    sounds.x = 10;
    sounds.y = 110;
    sounds.rotation = -0.1;

    const soundsVolumeLeft = PIXI.Sprite.from("../../images/arrow.png");
    setParamsToPixiElem(soundsVolumeLeft, 150, 135, 3.3, true, true, 30, 30);
    // soundsVolumeLeft.width = 30;
    // soundsVolumeLeft.height = 30;
    // soundsVolumeLeft.x = 150;
    // soundsVolumeLeft.y = 135;
    // soundsVolumeLeft.rotation = 3.3;
    // soundsVolumeLeft.interactive = true;
    // soundsVolumeLeft.buttonMode = true;
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
    soundsVolume.x = 210;
    soundsVolume.y = 110;
    soundsVolume.rotation = -0.15;

    const soundsVolumeRight = PIXI.Sprite.from("../../images/arrow.png");
    setParamsToPixiElem(soundsVolumeRight, 265, 85, -0.1, true, true, 30, 30);
    // soundsVolumeRight.width = 30;
    // soundsVolumeRight.height = 30;
    // soundsVolumeRight.x = 265;
    // soundsVolumeRight.y = 85;
    // soundsVolumeRight.rotation = -0.1;
    // soundsVolumeRight.interactive = true;
    // soundsVolumeRight.buttonMode = true;
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
    volumeContainer.width = 330;
    volumeContainer.height = 150;
    volumeContainer.x = left;
    volumeContainer.y = top;
    volumeContainer.zIndex = 100;

    volumeContainer.addChild(soundsVolumeRight);
    volumeContainer.addChild(soundsVolumeLeft);
    volumeContainer.addChild(musicVolumeRight);
    volumeContainer.addChild(musicVolumeLeft);
    volumeContainer.addChild(volume);
    volumeContainer.addChild(music);
    volumeContainer.addChild(musicVolume);
    volumeContainer.addChild(sounds);
    volumeContainer.addChild(soundsVolume);
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
