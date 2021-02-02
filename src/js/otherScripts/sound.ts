import * as storage from "./storage";
import PIXISound from "pixi-sound";

interface oneSound {
    url: string;
    loop?: boolean;
}

interface sounds {
    [sound: string]: oneSound;
}

let musicVolume: number = storage.get("musicVolume") === null ? 0.5 : storage.get("musicVolume");
let soundVolume: number = storage.get("soundVolume") === null ? 0.5 : storage.get("soundVolume");

const soundsArr: string[] = [];
const musicArr: string[] = [];

const sound: sounds = {
    menuMusic: { url: "../assets/music/titleScreenLoop.ogg", loop: true },
    floorMusic: { url: "../assets/music/basementLoop.ogg", loop: true }, // муузыка на этаже
    deathMusic: { url: "../assets/music/death.ogg", loop: true }, // музычка при смерти
    bossMusic: { url: "../assets/music/bossFight.ogg", loop: true }, // музычка на босе
    endMusic: { url: "../assets/music/credits.ogg", loop: true },
    bossEnter: { url: "../assets/sounds/bossEnter.wav" }, //сломали
    flyLoop1: { url: "../assets/sounds/fly.wav", loop: true }, // муха бз
    flyLoop2: { url: "../assets/sounds/fly2.wav", loop: true }, // муха бз
    mobShoot1: { url: "../assets/sounds/bloodshoot0.wav" }, // моб стреляет
    mobShoot2: { url: "../assets/sounds/bloodshoot1.wav" }, // моб стреляет
    mobShoot3: { url: "../assets/sounds/bloodshoot2.wav" }, // моб стреляет
    mobDeath1: { url: "../assets/sounds/Death_Burst_Small_0.wav" }, // моб умер
    mobDeath2: { url: "../assets/sounds/Death_Burst_Small_1.wav" }, // моб умер
    mobDeath3: { url: "../assets/sounds/Death_Burst_Small_2.wav" }, // моб умер
    mobDeath4: { url: "../assets/sounds/deathBurst.wav" }, // моб умер
    startMusic: { url: "../assets/music/titleScreenJingle.ogg" },
    select: { url: "../assets/sounds/selectLeft.wav" },
    unselect: { url: "../assets/sounds/selectRight.wav" },
    tear1: { url: "../assets/sounds/tear1.wav" }, // слеза выстрел
    tear2: { url: "../assets/sounds/tear2.wav" }, // слеза выстрел другим глазом
    tearPop: { url: "../assets/sounds/tearPop.wav" }, // слеза шмяк о стену
    tearSplat: { url: "../assets/sounds/tearSplat.wav" }, // слеза плюх об пол
    hurt1: { url: "../assets/sounds/hurt1.wav" },
    hurt2: { url: "../assets/sounds/hurt2.wav" }, // получение урона
    hurt3: { url: "../assets/sounds/hurt3.wav" },
    doorOpen: { url: "../assets/sounds/doorOpen.wav" }, // открылась дверь при зачистке комнаты
    doorClose: { url: "../assets/sounds/doorClose.wav" }, // закрылась дверь при зачистке комнаты
    isaacDeath: { url: "../assets/sounds/isaacDeath.wav" }, // умер гг
    pageTurn: { url: "../assets/sounds/pageTurn.wav" },
    takeCoin: { url: "../assets/sounds/coinPickup.wav" }, // лутаем монетку
    heal: { url: "../assets/sounds/heartIntake.wav" }, // лутаем сердечко
    pop: { url: "../assets/sounds/pop.wav" }, // какаху сломали
    win: { url: "../assets/sounds/superholy.wav" }, // сломали
    boom: { url: "../assets/sounds/explosion.wav" }, // взрыв бомбы
    fart: { url: "../assets/sounds/Fart.wav" }, //
    meatJump1: { url: "../assets/sounds/Meat_jumps0.wav" }, // кусок мяса прыгает
    meatJump2: { url: "../assets/sounds/Meat_jumps1.wav" }, // кусок мяса прыгает
    meatJump3: { url: "../assets/sounds/Meat_jumps2.wav" }, // кусок мяса прыгает
    meatJump4: { url: "../assets/sounds/Meat_jumps3.wav" }, // кусок мяса прыгает
    meatJump5: { url: "../assets/sounds/Meat_jumps4.wav" }, // кусок мяса прыгает
    miligan1: { url: "../assets/sounds/miligan0.wav" }, // Милиган хнык
    miligan2: { url: "../assets/sounds/miligan1.wav" }, // Милиган хнык
    miligan3: { url: "../assets/sounds/miligan2.wav" }, // Милиган хнык
    summon: { url: "../assets/sounds/summon.wav" }, // спавн мобов
    roar1: { url: "../assets/sounds/Roar_0.wav" }, // башка кричит
    roar2: { url: "../assets/sounds/Roar_1.wav" }, // башка кричит
    roar3: { url: "../assets/sounds/Roar_2.wav" }, // башка кричит
    gurdyShoot1: { url: "../assets/sounds/Monster_Yell_A_0.wav" }, // башка кричит
    gurdyShoot2: { url: "../assets/sounds/Monster_Yell_A_1.wav" }, // башка кричит
};

for (let name in sound) {
    PIXISound.add(name, sound[name]);
}

function soundGame(soundName: string, isStop?: Boolean) {
    if (isStop) {
        PIXISound.stop(`${soundName}`);
        if (soundName.match(/fly/)) soundsArr.pop();
        else musicArr.splice(musicArr.indexOf(soundName), 1);
    } else {
        if (soundName.match(/Music/)) {
            PIXISound.play(`${soundName}`, { volume: musicVolume });
            musicArr.push(soundName);
        } else {
            PIXISound.play(`${soundName}`, { volume: soundVolume });
            if (soundName.match(/fly/)) soundsArr.push(soundName);
        }
    }
}

function changeVolume(music: number, sounds: number): void {
    if (musicVolume === 0) {
        PIXISound.stop("menuMusic");
        PIXISound.play("menuMusic", { volume: music / 10 });
    }
    musicVolume = music / 10;
    soundVolume = sounds / 10;
    storage.set("musicVolume", musicVolume);
    storage.set("soundVolume", soundVolume);
    PIXISound.find(musicArr[0]).volume = musicVolume;
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
    } else {
        if (type === "music") {
            musicVolume = storage.get("musicVolume");
            musicArr.forEach((element: string) => {
                PIXISound.find(element).muted = false;
            });
        } else {
            soundVolume = storage.get("soundVolume");
            soundsArr.forEach((element: string) => {
                PIXISound.find(element).muted = false;
            });
        }
    }
}

export { soundGame, changeVolume, onOff };
