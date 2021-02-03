import { playerHead } from "../Rooms/startGame";
import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "../CreateSprite/GameObjects";
import { app } from "../script";

interface HeartsCells {
    [heartGroup: string]: HeartIcon;
}

interface HeartIcon {
    [oneHeart: string]: PIXI.Sprite;
}

const hearts: HeartsCells = {
    firstHeart: {},
    secondHeart: {},
    thirdHeart: {},
};

let bossPanel: PIXI.Sprite;
let bossMask: PIXI.Graphics;

const heartsNames: string[] = ["firstHeart", "secondHeart", "thirdHeart"];

function createLifeContainer(topPanel: PIXI.Graphics, setParamsTopElement: Function): void {
    const heartsTypes: string[] = ["empty", "half", "full"];

    bossPanel = PIXI.Sprite.from("../../assets/bossPanel.png");
    setParamsTopElement(bossPanel, 185, 30, 308, 125);

    bossMask = new PIXI.Graphics();
    bossMask.beginFill(0x800000);
    bossMask.lineStyle(1, 0x000000, 0);
    bossMask.drawRoundedRect(335, 134, 150, 10, 5);
    bossMask.endFill();

    bossMask.alpha = 0;
    bossPanel.alpha = 0;

    app.stage.addChild(bossPanel, bossMask);

    const heartsUrl: string[] = ["../../assets/heart.png", "../../assets/heartHalf.png", "../../assets/heartFull.png"];
    const lifeLabel: PIXI.Sprite = PIXI.Sprite.from("../../assets/lifeLabel.png");
    setParamsTopElement(lifeLabel, 110, 20, 620, 10);
    topPanel.addChild(lifeLabel);

    for (let currentHeart = 0; currentHeart < heartsNames.length; currentHeart += 1) {
        for (let currentHeartType = 0; currentHeartType < heartsTypes.length; currentHeartType += 1) {
            const heart: PIXI.Sprite = PIXI.Sprite.from(heartsUrl[currentHeartType]);
            setParamsTopElement(heart, 35, 30, 580 + 40 * currentHeart, 30);
            hearts[heartsNames[currentHeart]][heartsTypes[currentHeartType]] = heart;
            topPanel.addChild(heart);
        }
    }
}

function changeLife(hitPoints: number | string): void {
    switch (hitPoints) {
        case 2:
            for (let healHeart = 0; healHeart < 3; healHeart += 1) {
                if (hearts[heartsNames[healHeart]]["half"].alpha === 0) {
                    hearts[heartsNames[healHeart]]["half"].alpha = 1;
                    hearts[heartsNames[healHeart]]["full"].alpha = 1;
                    return;
                } else if (hearts[heartsNames[healHeart]]["full"].alpha === 0) {
                    hearts[heartsNames[healHeart]]["full"].alpha = 1;
                    if (healHeart !== 2) {
                        hearts[heartsNames[healHeart + 1]]["half"].alpha = 1;
                    }
                    return;
                }
            }
            break;
        case 1:
            for (let healHeart = 0; healHeart < 3; healHeart += 1) {
                if (hearts[heartsNames[healHeart]]["half"].alpha === 0) {
                    hearts[heartsNames[healHeart]]["half"].alpha = 1;
                    return;
                } else if (hearts[heartsNames[healHeart]]["full"].alpha === 0) {
                    hearts[heartsNames[healHeart]]["full"].alpha = 1;
                    return;
                }
            }
            break;
        case -1:
            for (let damageHeart = 2; damageHeart >= 0; damageHeart -= 1) {
                //const currentDamageHeart = hearts[heartsNames[damageHeart]]
                if (hearts[heartsNames[damageHeart]]["full"].alpha !== 0) {
                    hearts[heartsNames[damageHeart]]["full"].alpha = 0;
                    return;
                } else if (hearts[heartsNames[damageHeart]]["half"].alpha !== 0) {
                    hearts[heartsNames[damageHeart]]["half"].alpha = 0;
                    return;
                }
            }
            break;
        case -2:
            for (let damageHeart = 2; damageHeart >= 0; damageHeart -= 1) {
                if (hearts[heartsNames[damageHeart]]["full"].alpha !== 0) {
                    hearts[heartsNames[damageHeart]]["full"].alpha = 0;
                    hearts[heartsNames[damageHeart]]["half"].alpha = 0;
                    return;
                } else if (hearts[heartsNames[damageHeart]]["half"].alpha !== 0) {
                    hearts[heartsNames[damageHeart]]["half"].alpha = 0;
                    if (damageHeart !== 0) {
                        hearts[heartsNames[damageHeart - 1]]["full"].alpha = 0;
                    }
                    return;
                }
            }
            break;
        case "boss":
            bossMask.width -= 3;
            bossMask.x += 6.72;
    }
}

export { createLifeContainer, changeLife, bossPanel, bossMask };
