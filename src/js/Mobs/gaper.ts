import { app } from "../script";
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
            gaperOne.freeze = false;
            gaperOne.damage = 2;
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
            } else if (gaperOne.freeze) {
                this.freezeMob(gaperOne);
            }

            if (this.moveCurrent % 8 === 4) {
                gaperOne.x += 3;
                gaperOne.y -= 0.5;
            } else if (this.moveCurrent % 8 === 0) {
                gaperOne.x -= 3;
                gaperOne.y += 0.5;
            }
            if (this.moveCurrent % (100 + currentGap * 30) === 0) {
                this.sound(`roar${(currentGap % 3) + 1}`, false);
                gaperOne.textures = this.sheets.angry;
                gaperOne.play();
                const bullet = this.shootIntoPlayer(gaperOne);
                bullet.x += bullet.bulletSpeedX * 4;
                bullet.y += bullet.bulletSpeedY * 4;
            }
        });
        this.trackShot();
        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}

export default Gaper;
