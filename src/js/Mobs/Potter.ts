import { app } from "../script";
import Mobs from "./Mobs";

class Potter extends Mobs {
    boolDeath: boolean;
    moveCurrent: number;
    sheetsBullets: any;
    bullets: any[];
    animateBullets: any;
    constructor() {
        super("potter");
        this.boolDeath = true;
        this.moveCurrent = 0;
        this.sheetsBullets = {};
        this.bullets = [];
        this.animateBullets = {};
    }
    loadUp(): void {
        this.mob.forEach((potterOne: any) => {
            potterOne.hp = 2;
            potterOne.angryMob = true;
            potterOne.damage = 1;
            potterOne.freeze = false;
            potterOne.play();
        });
        this.sound("flyLoop2", false);
        app.ticker.add(() => {
            this.movePotter();
        });
    }
    movePotter(): void {
        this.mob.forEach((potterOne: any, countPotter) => {
            if (potterOne.hp === 0 && this.boolDeath) {
                if (this.mob.length === 1) this.sound("flyLoop2", true);
                this.deleteMob(potterOne);
            } else if (potterOne.freeze) {
                this.freezeMob(potterOne);
            } else {
                if (this.moveCurrent % 5 === 0) {
                    const randomNum = (Math.random() - 0.5) * 3;
                    potterOne.x += randomNum;
                    potterOne.y += randomNum;
                }
                if (this.moveCurrent % (100 + countPotter * 30) === 0) {
                    potterOne.textures = this.sheets.shoot;
                    potterOne.loop = false;
                    potterOne.play();
                    potterOne.onComplete = () => {
                        potterOne.textures = this.sheets.fly;
                        potterOne.loop = true;
                        potterOne.play();
                        const bullet = this.shootIntoPlayer(potterOne);
                        bullet.scale.set(0.8);
                        bullet.x += bullet.bulletSpeedX * 2;
                        bullet.y += bullet.bulletSpeedY * 2;
                    };
                }
            }
        });
        this.trackShot();
        this.moveCurrent = (this.moveCurrent % 10 ** 4) + 1;
    }
}

export default Potter;
