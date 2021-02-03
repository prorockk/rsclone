import PIXISound from "pixi-sound";
import * as storage from "./storage";

interface oneSound {
    url: string;
    loop?: boolean;
}

interface sounds {
    [sound: string]: oneSound;
}

let musicVolume: number = storage.get("musicVolume") === null ? 5 : storage.get("musicVolume");
let soundVolume: number = storage.get("soundVolume") === null ? 5 : storage.get("soundVolume");

const volumeArr = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

const soundsArr: string[] = [];
const musicArr: string[] = [];

const sound: sounds = {
    menuMusic: { url: "../assets/music/titleScreenLoop.ogg", loop: true },
    floorMusic: { url: "../assets/music/basementLoop.ogg", loop: true },
    deathMusic: { url: "../assets/music/death.ogg", loop: true },
    bossMusic: { url: "../assets/music/bossFight.ogg", loop: true },
    bossEnter: { url: "../assets/sounds/bossEnter.wav" },
    endMusic: { url: "../assets/music/credits.ogg", loop: true },
    flyLoop1: { url: "../assets/sounds/fly.wav", loop: true },
    flyLoop2: { url: "../assets/sounds/fly2.wav", loop: true },
    mobShoot1: { url: "../assets/sounds/bloodshoot0.wav" },
    mobShoot2: { url: "../assets/sounds/bloodshoot1.wav" },
    mobShoot3: { url: "../assets/sounds/bloodshoot2.wav" },
    mobDeath1: { url: "../assets/sounds/Death_Burst_Small_0.wav" },
    mobDeath2: { url: "../assets/sounds/Death_Burst_Small_1.wav" },
    mobDeath3: { url: "../assets/sounds/Death_Burst_Small_2.wav" },
    mobDeath4: { url: "../assets/sounds/deathBurst.wav" },
    startMusic: { url: "../assets/music/titleScreenJingle.ogg" },
    select: { url: "../assets/sounds/selectLeft.wav" },
    unselect: { url: "../assets/sounds/selectRight.wav" },
    tear1: { url: "../assets/sounds/tear1.wav" },
    tear2: { url: "../assets/sounds/tear2.wav" },
    tearPop: { url: "../assets/sounds/tearPop.wav" },
    tearSplat: { url: "../assets/sounds/tearSplat.wav" },
    hurt1: { url: "../assets/sounds/hurt1.wav" },
    hurt2: { url: "../assets/sounds/hurt2.wav" },
    hurt3: { url: "../assets/sounds/hurt3.wav" },
    doorOpen: { url: "../assets/sounds/doorOpen.wav" },
    doorClose: { url: "../assets/sounds/doorClose.wav" },
    isaacDeath: { url: "../assets/sounds/isaacDeath.wav" },
    pageTurn: { url: "../assets/sounds/pageTurn.wav" },
    takeCoin: { url: "../assets/sounds/holy.wav" },
    heal: { url: "../assets/sounds/heartIntake.wav" },
    pop: { url: "../assets/sounds/pop.wav" },
    win: { url: "../assets/sounds/superholy.wav" },
    boom: { url: "../assets/sounds/explosion.wav" },
    meatJump1: { url: "../assets/sounds/Meat_jumps0.wav" },
    meatJump2: { url: "../assets/sounds/Meat_jumps1.wav" },
    meatJump3: { url: "../assets/sounds/Meat_jumps2.wav" },
    meatJump4: { url: "../assets/sounds/Meat_jumps3.wav" },
    meatJump5: { url: "../assets/sounds/Meat_jumps4.wav" },
    miligan1: { url: "../assets/sounds/miligan0.wav" },
    miligan2: { url: "../assets/sounds/miligan1.wav" },
    miligan3: { url: "../assets/sounds/miligan2.wav" },
    summon: { url: "../assets/sounds/summon.wav" },
    roar1: { url: "../assets/sounds/Roar_0.wav" },
    roar2: { url: "../assets/sounds/Roar_1.wav" },
    roar3: { url: "../assets/sounds/Roar_2.wav" },
    gurdyShoot1: { url: "../assets/sounds/Monster_Yell_A_0.wav" },
    gurdyShoot2: { url: "../assets/sounds/Monster_Yell_A_1.wav" },
    bosswin: { url: "../assets/sounds/boswin.wav" },
};

for (const name in sound) {
    PIXISound.add(name, sound[name]);
}

function soundGame(soundName: string, isStop?: Boolean): void {
    if (isStop) {
        PIXISound.stop(soundName);
        if (soundName.match(/fly/)) soundsArr.pop();
        else musicArr.splice(musicArr.indexOf(soundName), 1);
    } else if (soundName.match(/Music/)) {
        PIXISound.play(soundName);
        musicArr.push(soundName);
        PIXISound.find(soundName).volume = volumeArr[musicVolume];
    } else {
        PIXISound.play(soundName, { volume: volumeArr[soundVolume] });
        if (soundName.match(/fly/)) soundsArr.push(soundName);
    }
}

function changeVolume(music: number, sounds: number): void {
    if (musicVolume === 0) {
        PIXISound.stop("menuMusic");
        PIXISound.play("menuMusic");
    }
    musicVolume = music;
    soundVolume = sounds;
    storage.set("musicVolume", musicVolume);
    storage.set("soundVolume", soundVolume);
    PIXISound.find("menuMusic").volume = volumeArr[musicVolume];
}

function onOff(mute: boolean, type: string) {
    if (mute) {
        if (type === "music") {
            musicVolume = 0;
            musicArr.forEach((element: string) => {
                PIXISound.find(element).muted = true;
            });
        } else {
            soundVolume = 0;
            soundsArr.forEach((element: string) => {
                PIXISound.find(element).muted = true;
            });
        }
    } else if (type === "music") {
        musicVolume = storage.get("musicVolume");
        musicArr.forEach((element: string) => {
            PIXISound.find(element).muted = false;
            PIXISound.find(element).volume = volumeArr[musicVolume];
        });
    } else {
        soundVolume = storage.get("soundVolume");
        soundsArr.forEach((element: string) => {
            PIXISound.find(element).muted = false;
            PIXISound.find(element).volume = volumeArr[soundVolume];
        });
    }
}

export { soundGame, changeVolume, onOff };
