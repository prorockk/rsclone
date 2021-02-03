import { app } from "../script";
import { mainCounter, currentRoom, player, rooms } from "../Rooms/startGame";
import Mobs from "./Mobs";
import createElement from "../CreateSprite/createGameElement";

class Fly extends Mobs {
    boolDeath: boolean;

    constructor() {
        super("fly");
        this.boolDeath = true;
    }

    loadUp() {
        this.mob.forEach((flyOne: any) => {
            if (flyOne.sheetSpriteStr === "fly") {
                flyOne.hp = 2;
                flyOne.angryMob = true;
                flyOne.damage = 1;
            } else {
                flyOne.hp = 1;
                flyOne.angryMob = false;
                flyOne.damage = 0;
            }
            flyOne.freeze = false;
            flyOne.play();
        });
        this.sound("flyLoop1", false);
        app.ticker.add(() => {
            this.moveFly();
        });
    }

    create() {
        const randCurrentFly = Math.ceil(Math.random() * 3.5);
        const properties = {
            sheetSpriteStr: "fly",
            anchor: 0.5,
            animationSpeed: 0.4,
            loop: true,
            x: 0,
            y: 0,
        };
        const animateObj = {
            sheets: this.sheets,
            propertiesAr: new Array(randCurrentFly).fill(properties),
            room: currentRoom,
            name: "fly",
        };
        if (this.mob.length === 0) this.sound("flyLoop1", false);
        const flyAr: any[] = new createElement(rooms).addAnimateElement(animateObj);
        flyAr.forEach((flyOne: any) => {
            flyOne.hp = 3;
            flyOne.angryMob = true;
            flyOne.freeze = false;
            flyOne.damage = 1;
            flyOne.play();
        });
        mainCounter.count += flyAr.length;
        return flyAr;
    }

    moveFly() {
        const playerX = player.getBounds().x;
        const playerY = player.getBounds().y;
        this.mob.forEach((flyOne: any) => {
            if (flyOne.hp === 0 && this.boolDeath) {
                if (this.mob.length === 1) this.sound("flyLoop1", true);
                this.deleteMob(flyOne);
            } else if (flyOne.freeze) {
                this.freezeMob(flyOne);
            } else if (flyOne.angryMob) {
                const randomSymbol = Math.ceil(Math.random() - 0.5) - 0.2;
                const flyX = flyOne.getBounds().x;
                const flyY = flyOne.getBounds().y;
                if (playerX > flyX) {
                    flyOne.x += 0.9;
                    flyOne.y += 0.4 * randomSymbol;
                } else {
                    flyOne.x -= 0.9;
                    flyOne.y += 0.4 * randomSymbol;
                }
                if (playerY > flyY) {
                    flyOne.y += 0.9;
                    flyOne.x += 0.4 * randomSymbol;
                } else {
                    flyOne.y -= 0.9;
                    flyOne.x += 0.4 * randomSymbol;
                }
                flyOne.y += 0.5 * randomSymbol;
                flyOne.x += 0.5 * randomSymbol;
            }
        });
    }
}

export default Fly;
