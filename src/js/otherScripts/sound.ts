import * as storage from "./storage";
import PIXISound from "pixi-sound";

let musicVolume: number = storage.get("musicVolume") === null ? 0.5 : storage.get("musicVolume");
let soundVolume: number = storage.get("soundVolume") === null ? 0.5 : storage.get("soundVolume");

interface sounds {
    [sound: string]: oneSound;
}
interface oneSound {
    url: string;
    loop?: boolean;
}

const sound: sounds = {
    menuMusic: { url: "../assets/music/titleScreenLoop.ogg", loop: true },
    floorMusic: { url: "../assets/music/basementLoop.ogg", loop: true }, // муузыка на этаже
    deathMusic: { url: "../assets/music/death.ogg", loop: true }, // музычка при смерти
    bossMusic: { url: "../assets/music/bossFight.ogg", loop: true }, // музычка на босе
    flyLoop1: { url: "../assets/sounds/fly.mp3", loop: true }, // муха бз
    flyLoop2: { url: "../assets/sounds/fly2.mp3", loop: true }, // муха бз
    mobShoot1: { url: "../assets/sounds/bloodshoot0.mp3" }, // моб стреляет
    mobShoot2: { url: "../assets/sounds/bloodshoot1.mp3" }, // моб стреляет
    mobShoot3: { url: "../assets/sounds/bloodshoot2.mp3" }, // моб стреляет
    mobDeath1: { url: "../assets/sounds/Death_Burst_Small_0.mp3" }, // моб умер
    mobDeath2: { url: "../assets/sounds/Death_Burst_Small_1.mp3" }, // моб умер
    mobDeath3: { url: "../assets/sounds/Death_Burst_Small_2.mp3" }, // моб умер
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
    boom: { url: "../assets/sounds/explosion.wav" }, // взрыв бомбы
    fart: { url: "../assets/sounds/Fart.mp3" }, // пердёж
    meatJump1: { url: "../assets/sounds/Meat_jumps0.mp3" }, // кусок мяса прыгает
    meatJump2: { url: "../assets/sounds/Meat_jumps1.mp3" }, // кусок мяса прыгает
    meatJump3: { url: "../assets/sounds/Meat_jumps2.mp3" }, // кусок мяса прыгает
    meatJump4: { url: "../assets/sounds/Meat_jumps3.mp3" }, // кусок мяса прыгает
    meatJump5: { url: "../assets/sounds/Meat_jumps4.mp3" }, // кусок мяса прыгает
    miligan1: { url: "../assets/sounds/miligan0.mp3" }, // Милиган хнык
    miligan2: { url: "../assets/sounds/miligan1.mp3" }, // Милиган хнык
    miligan3: { url: "../assets/sounds/miligan2.mp3" }, // Милиган хнык
    summon: { url: "../assets/sounds/summon.wav" }, // спавн мобов
    roar1: { url: "../assets/sounds/Roar_0.mp3" }, // башка кричит
    roar2: { url: "../assets/sounds/Roar_1.mp3" }, // башка кричит
    roar3: { url: "../assets/sounds/Roar_2.mp3" }, // башка кричит
};

for (let name in sound) {
    PIXISound.add(name, sound[name]);
}

function soundGame(soundName: String, isStop: Boolean) {
    if (isStop) {
        PIXISound.stop(`${soundName}`);
        return;
    }
    if (soundName.match(/start/)) PIXISound.stop("menuMusic");
    else if (soundName.match(/death|boss/)) PIXISound.stop("floorMusic");
    if (soundName.match(/Music/)) PIXISound.play(`${soundName}`, { volume: musicVolume });
    else PIXISound.play(`${soundName}`, { volume: soundVolume });
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
    PIXISound.find("menuMusic").volume = musicVolume;
}

export { soundGame, changeVolume };
