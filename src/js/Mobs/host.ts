import { app } from "../script";
import tearsSheets from "../CreateSprite/tearsSheets";
import Mobs from "./Mobs";

class Gaper extends Mobs {
    boolDeath: boolean;
    moveCurrent: number;
    sheetsBullets: any;
    bullets: any[];
    animateBullets: any;
    block: boolean;
    constructor() {
        super("host");
        this.boolDeath = true;
        this.moveCurrent = 0;
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
        this.block = true;
    }
    loadUp() {
        this.mob.forEach((hostOne: any) => {
            hostOne.hp = 4;
            hostOne.anchor.set(0.5, 1);
            hostOne.angryMob = true;
            hostOne.froze = false;
            hostOne.damage = 2;
            hostOne.play();
        });
        app.ticker.add(() => {
            this.moveGaper();
        });
    }
    moveGaper() {
        this.mob.forEach((hostOne: any, countHost: number) => {
            if (hostOne.hp === 0 && this.boolDeath) {
                hostOne.animationSpeed = 0.6;
                hostOne.scale.set(1.6);
                this.deleteMob(hostOne);
            } else if (hostOne.froze && !this.block) {
                //анимация нанесения урона
                this.frozeMob(hostOne);
            } else if (this.moveCurrent % (180 + countHost * 50) === 0) {
                //направление пуль и создание
                hostOne.textures = this.sheets.shoot;
                hostOne.play();
                hostOne.onComplete = () => {
                    this.block = false;
                    const bullet = this.shootIntoPlayer(hostOne);
                    bullet.scale.set(1.2);
                    bullet.x += bullet.bulletSpeedX * 3; // перемещаем начало выстрела на границу моба
                    bullet.y += bullet.bulletSpeedY * 3;
                };
            } else if (this.moveCurrent % (180 + countHost * 50) === 20) {
                hostOne.textures = this.sheets.block;
                hostOne.play();
                hostOne.onComplete = () => (this.block = true);
            }
        });
        this.trackShot();
        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}

export default Gaper;
