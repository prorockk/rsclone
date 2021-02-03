import { app } from "../script";
import Mobs from "./Mobs";

class Clotty extends Mobs {
    boolDeath: boolean;

    moveCurrent: number;

    sheetsBullets: any;

    bullets: any[];

    animateBullets: any;

    jump: boolean;

    constructor() {
        super("clotty");
        this.boolDeath = true;
        this.moveCurrent = 0;
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
        this.jump = false;
    }

    loadUp() {
        this.mob.forEach((clottyOne: any) => {
            clottyOne.hp = 6;
            clottyOne.anchor.set(0.5, 1);
            clottyOne.angryMob = true;
            clottyOne.freeze = false;
            clottyOne.damage = 2;
            clottyOne.play();
        });
        app.ticker.add(() => {
            this.moveClotty();
        });
    }

    moveClotty() {
        this.mob.forEach((clottyOne: any, countClotty: number) => {
            const timeOut = this.moveCurrent % (130 + countClotty * 50);
            if (clottyOne.hp === 0 && this.boolDeath) {
                clottyOne.animationSpeed = 0.6;
                clottyOne.scale.set(1.5);
                clottyOne.anchor.set(0.5, 0.5);
                this.deleteMob(clottyOne);
            } else if (clottyOne.freeze) {
                this.freezeMob(clottyOne);
            } else if (timeOut === 0) {
                clottyOne.textures = this.sheets.jump;
                clottyOne.play();
                this.jump = true;
                clottyOne.onComplete = () => {
                    this.jump = false;
                    clottyOne.textures = this.sheets.stand;
                    clottyOne.play();
                };
            } else if (timeOut === 60) {
                clottyOne.textures = this.sheets.shoot;
                clottyOne.play();
                clottyOne.onComplete = () => {
                    clottyOne.scale.x *= -1;
                    const bullet = this.shootToFourDirection(clottyOne);
                };
            }
            if (this.jump && timeOut > 7 && timeOut < 35) {
                if (timeOut === 34) this.sound(`meatJump${this.generateRandNum(5)}`);
                const clottySpeed = clottyOne.scale.x > 0 ? 1.5 : -1.5;
                clottyOne.x += clottySpeed;
            }
        });
        this.trackShot();
        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}

export default Clotty;
