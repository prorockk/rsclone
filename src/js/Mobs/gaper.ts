import { app } from "../script";
import tearsSheets from "../CreateSprite/tearsSheets";
import Mobs from "./Mobs";

class Gaper extends Mobs {
    boolDeath: boolean;
    moveCurrent: number;
    sheetsBullets: any;
    bullets: any[];
    animateBullets: any;
    constructor() {
        super("gaper");
        this.boolDeath = true;
        this.moveCurrent = 0;
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
    }
    loadUp() {
        this.mob.forEach((gaperOne: any) => {
            gaperOne.hp = 4;
            gaperOne.angryMob = true;
            gaperOne.froze = false;
            gaperOne.damage = 1;
            gaperOne.play();
        });
        app.ticker.add(() => {
            this.moveGaper();
        });
    }
    moveGaper() {
        this.mob.forEach((gaperOne: any, currentGap: number) => {
            if (gaperOne.hp === 0 && this.boolDeath) {
                gaperOne.animationSpeed = 0.6;
                gaperOne.scale.set(1.6);
                this.deleteMob(gaperOne);
            } else if (gaperOne.froze) {
                //анимация нанесения урона
                this.frozeMob(gaperOne);
            }

            if (this.moveCurrent % 8 === 4) {
                //перемещение
                gaperOne.x += 3;
            } else if (this.moveCurrent % 8 === 0) {
                gaperOne.x -= 3;
            }
            if (this.moveCurrent % (100 + currentGap * 30) === 0) {
                //направление пуль и создание
                gaperOne.textures = this.sheets.angry;
                gaperOne.play();
                const bullet = this.shootIntoPlayer(gaperOne);
                bullet.x += bullet.bulletSpeedX * 4; // перемещаем начало выстрела на границу моба
                bullet.y += bullet.bulletSpeedY * 4;
            }
        });
        this.trackShot();
        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}

export default Gaper;
