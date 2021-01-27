const hearts: any = {
    firstHeart: {},
    secondHeart: {},
    thirdHeart: {},
};
const heartsTypes: any = ["empty", "half", "full"];
const heartsNames: any = ["firstHeart", "secondHeart", "thirdHeart"];

function createLifeContainer(PIXI: any, topPanel: any) {
    const heartsUrl = ["../../assets/heart.png", "../../assets/heartHalf.png", "../../assets/heartFull.png"];

    const lifeLabel = PIXI.Sprite.from("../../assets/lifeLabel.png");
    lifeLabel.width = 110;
    lifeLabel.height = 20;
    lifeLabel.x = 620;
    lifeLabel.y = 10;
    topPanel.addChild(lifeLabel);

    for (let currentHeart = 0; currentHeart < heartsNames.length; currentHeart += 1) {
        for (let currentHeartType = 0; currentHeartType < heartsTypes.length; currentHeartType += 1) {
            const heart = PIXI.Sprite.from(heartsUrl[currentHeartType]);
            heart.width = 35;
            heart.height = 30;
            heart.x = 580 + 40 * currentHeart;
            heart.y = 30;
            topPanel.addChild(heart);

            hearts[heartsNames[currentHeart]][heartsTypes[currentHeartType]] = heart;
        }
    }
}

function changeLife(hitPoints: number) {
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
    }
}

export { createLifeContainer, changeLife };
