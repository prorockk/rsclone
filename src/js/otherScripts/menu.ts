import * as PIXI from "pixi.js";
import { app } from "../script";
import { startGame } from "../Rooms/startGame";
import { soundGame, changeVolume } from "./sound";
import { changeControls, moveControls } from "./changeControls";
import * as storage from "./storage";

let currentSoundVolume = storage.get("soundVolume") === null ? 5 : storage.get("soundVolume") * 10;
let currentMusicVolume = storage.get("musicVolume") === null ? 5 : storage.get("musicVolume") * 10;

let isMusic = false;

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

let sheet: any;

export default function renderMenu() {
    const backgroundMenu = PIXI.Sprite.from("./images/menuBack.png");
    backgroundMenu.width = 800;
    backgroundMenu.height = 600;
    app.stage.addChild(backgroundMenu);

    const newGame = new PIXI.Text("NEW RUN", style);
    newGame.x = 200;
    newGame.y = 120;
    newGame.rotation = -0.1;
    newGame.interactive = true;
    newGame.buttonMode = true;
    newGame.on("mouseover", (e: any) => {
        e.target.scale.set(1.1);
        soundGame("select", true);
    });
    newGame.on("mouseout", () => {
        newGame.scale.set(1);
        soundGame("unselect", true);
    });
    newGame.on("click", () => {
        app.stage.removeChildren();
        soundGame("startMusic", true);
        setTimeout(() => {
            startGame();
            soundGame("floorMusic", true);
        }, 4000);
    });

    const options = new PIXI.Text("OPTIONS", style);
    options.x = 215;
    options.y = 250;
    options.rotation = -0.1;
    options.interactive = true;
    options.buttonMode = true;
    options.on("mouseover", (e: any) => {
        e.target.scale.set(1.1);
        soundGame("select", true);
    });
    options.on("mouseout", () => {
        options.scale.set(1);
        soundGame("unselect", true);
    });
    options.on("click", () => {
        app.stage.removeChild(menuList);
        renderOptions();
        soundGame("pageTurn", true);
    });

    const stat = new PIXI.Text("STATS", style);
    stat.x = 225;
    stat.y = 370;
    stat.rotation = -0.1;
    stat.interactive = true;
    stat.buttonMode = true;
    stat.on("mouseover", (e: any) => {
        e.target.scale.set(1.1);
        soundGame("select", true);
    });
    stat.on("mouseout", () => {
        stat.scale.set(1);
        soundGame("unselect", true);
    });
    stat.on("click", () => {
        app.stage.removeChild(menuList);
        renderStats();
        soundGame("pageTurn", true);
    });

    const exit = new PIXI.Text("X", style);
    exit.x = 525;
    exit.y = 420;
    exit.rotation = -0.1;
    exit.interactive = true;
    exit.buttonMode = true;
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
        soundGame("menuMusic", true);
    }
}

function renderStats() {
    const death = new PIXI.Text("Death:   0", style);
    death.x = 200;
    death.y = 150;
    death.rotation = -0.1;
    death.interactive = true;
    death.buttonMode = true;

    const kills = new PIXI.Text("Kills:   0", style);
    kills.x = 210;
    kills.y = 250;
    kills.rotation = -0.1;
    kills.interactive = true;
    kills.buttonMode = true;

    const back = new PIXI.Text("X", style);
    back.x = 525;
    back.y = 420;
    back.rotation = -0.1;
    back.interactive = true;
    back.buttonMode = true;
    back.on("click", () => {
        app.stage.removeChild(statList);
        renderMenu();
        soundGame("pageTurn", true);
    });

    const statList = new PIXI.Container();
    statList.addChild(death);
    statList.addChild(kills);
    statList.addChild(back);
    app.stage.addChild(statList);
}

function renderOptions() {
    const volume = new PIXI.Text("Volume", style);
    volume.x = 230;
    volume.y = 90;
    volume.rotation = -0.1;

    const music = new PIXI.Text("Music", styleOptions);
    music.x = 160;
    music.y = 150;
    music.rotation = -0.1;

    const musicVolumeLeft = PIXI.Sprite.from("../../images/arrow.png");
    musicVolumeLeft.width = 30;
    musicVolumeLeft.height = 30;
    musicVolumeLeft.x = 310;
    musicVolumeLeft.y = 175;
    musicVolumeLeft.rotation = 3.3;
    musicVolumeLeft.interactive = true;
    musicVolumeLeft.buttonMode = true;
    musicVolumeLeft.on("click", () => {
        if (currentMusicVolume > 0) {
            currentMusicVolume -= 1;
            musicVolume.removeChildren();
            musicVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentMusicVolume}.png`]));
            changeVolume(currentMusicVolume, currentSoundVolume);
            soundGame("select", true);
        }
    });

    const musicVolume = new PIXI.Container();
    musicVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentMusicVolume}.png`]));
    musicVolume.x = 365;
    musicVolume.y = 150;
    musicVolume.rotation = -0.15;

    const musicVolumeRight = PIXI.Sprite.from("../../images/arrow.png");
    musicVolumeRight.width = 30;
    musicVolumeRight.height = 30;
    musicVolumeRight.x = 420;
    musicVolumeRight.y = 125;
    musicVolumeRight.rotation = -0.1;
    musicVolumeRight.interactive = true;
    musicVolumeRight.buttonMode = true;
    musicVolumeRight.on("click", () => {
        if (currentMusicVolume < 10) {
            currentMusicVolume += 1;
            musicVolume.removeChildren();
            musicVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentMusicVolume}.png`]));
            changeVolume(currentMusicVolume, currentSoundVolume);
            soundGame("unselect", true);
        }
    });

    const sounds = new PIXI.Text("Sounds", styleOptions);
    sounds.x = 160;
    sounds.y = 200;
    sounds.rotation = -0.1;

    const soundsVolumeLeft = PIXI.Sprite.from("../../images/arrow.png");
    soundsVolumeLeft.width = 30;
    soundsVolumeLeft.height = 30;
    soundsVolumeLeft.x = 315;
    soundsVolumeLeft.y = 225;
    soundsVolumeLeft.rotation = 3.3;
    soundsVolumeLeft.interactive = true;
    soundsVolumeLeft.buttonMode = true;
    soundsVolumeLeft.on("click", () => {
        if (currentSoundVolume > 0) {
            currentSoundVolume -= 1;
            soundsVolume.removeChildren();
            soundsVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentSoundVolume}.png`]));
            changeVolume(currentMusicVolume, currentSoundVolume);
            soundGame("select", true);
        }
    });

    const soundsVolume = new PIXI.Container();
    soundsVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentSoundVolume}.png`]));
    soundsVolume.x = 370;
    soundsVolume.y = 195;
    soundsVolume.rotation = -0.15;

    const soundsVolumeRight = PIXI.Sprite.from("../../images/arrow.png");
    soundsVolumeRight.width = 30;
    soundsVolumeRight.height = 30;
    soundsVolumeRight.x = 425;
    soundsVolumeRight.y = 175;
    soundsVolumeRight.rotation = -0.1;
    soundsVolumeRight.interactive = true;
    soundsVolumeRight.buttonMode = true;
    soundsVolumeRight.on("click", () => {
        if (currentSoundVolume < 10) {
            currentSoundVolume += 1;
            soundsVolume.removeChildren();
            soundsVolume.addChild(new PIXI.Sprite(sheet.textures[`${currentSoundVolume}.png`]));
            changeVolume(currentMusicVolume, currentSoundVolume);
            soundGame("unselect", true);
        }
    });

    const controls = new PIXI.Text("Controls", style);
    controls.x = 220;
    controls.y = 260;
    controls.rotation = -0.1;

    const backFromOptions = new PIXI.Text("X", style);
    backFromOptions.x = 525;
    backFromOptions.y = 420;
    backFromOptions.rotation = -0.1;
    backFromOptions.interactive = true;
    backFromOptions.buttonMode = true;
    backFromOptions.on("click", () => {
        app.stage.removeChild(optionsList);
        renderMenu();
        soundGame("pageTurn", true);
    });

    const movesControl = new PIXI.Sprite(sheet.textures[`controls.png`]);
    movesControl.x = 330;
    movesControl.y = 390;
    movesControl.rotation = -0.1;
    movesControl.scale.set(1.5);

    const up = new PIXI.Container();
    up.x = 310;
    up.y = 320;
    up.width = 33;
    up.height = 33;
    up.rotation = -0.1;
    up.interactive = true;
    up.buttonMode = true;
    up.on("click", () => pressControls(up, "up", `${storage.get("up").slice(3)}`));
    const upKey = new PIXI.Text(`${storage.get("up").slice(3)}`, styleOptions);
    up.addChild(upKey);

    const right = new PIXI.Container();
    right.x = 370;
    right.y = 370;
    right.width = 33;
    right.height = 33;
    right.rotation = -0.1;
    right.interactive = true;
    right.buttonMode = true;
    right.on("click", () => pressControls(right, "right", `${storage.get("right").slice(3)}`));
    const rightKey = new PIXI.Text(`${storage.get("right").slice(3)}`, styleOptions);
    right.addChild(rightKey);

    const down = new PIXI.Container();
    down.x = 320;
    down.y = 430;
    down.width = 33;
    down.height = 33;
    down.rotation = -0.1;
    down.interactive = true;
    down.buttonMode = true;
    down.on("click", () => pressControls(down, "down", `${storage.get("down").slice(3)}`));
    const downKey = new PIXI.Text(`${storage.get("down").slice(3)}`, styleOptions);
    down.addChild(downKey);

    const left = new PIXI.Container();
    left.x = 260;
    left.y = 380;
    left.width = 33;
    left.height = 33;
    left.rotation = -0.1;
    left.interactive = true;
    left.buttonMode = true;
    left.on("click", () => pressControls(left, "left", "A"));
    const leftKey = new PIXI.Text(`${storage.get("left").slice(3)}`, styleOptions);
    left.addChild(leftKey);

    const optionsList = new PIXI.Container();
    optionsList.addChild(volume);
    optionsList.addChild(music);
    optionsList.addChild(musicVolume);
    optionsList.addChild(sounds);
    optionsList.addChild(soundsVolume);
    optionsList.addChild(backFromOptions);
    optionsList.addChild(soundsVolumeRight);
    optionsList.addChild(soundsVolumeLeft);
    optionsList.addChild(musicVolumeRight);
    optionsList.addChild(musicVolumeLeft);
    optionsList.addChild(controls);
    optionsList.addChild(movesControl);
    optionsList.addChild(up);
    optionsList.addChild(right);
    optionsList.addChild(down);
    optionsList.addChild(left);

    app.stage.addChild(optionsList);
}

function pressControls(container: PIXI.Container, direction: string, defaultKey: string) {
    container.children[0].alpha = 0;
    const keyPressListener = (e: any) => {
        container.removeChildren();
        console.log(e);
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
