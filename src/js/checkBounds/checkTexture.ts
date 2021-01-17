// ЭТО ПУСТЬ БУДЕТ не ТОЛЬКО ДЛЯ ПУЛЬ, но и для домага по герою

import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { player } from "../Rooms/startGame";

let isDamage = true;

export default function checkTexture(delay: number, bullets: any) {
    let hit = false;
    bullets.centerX = bullets.position.x;
    bullets.centerY = bullets.position.y;
    let denominator = 4;
    if (delay > 0) denominator = 2;
    bullets.halfWidth = bullets.width / denominator;
    bullets.halfHeight = bullets.height / denominator;

    for (let groupEl in objectOfGameObjects) {
        for (let i = 0; i < objectOfGameObjects[groupEl].length; i += 1) {
            const colObj = objectOfGameObjects[groupEl][i];

            let itsAngryMob = false;

            if (colObj.hasOwnProperty("angryMob")) itsAngryMob = colObj.angryMob; //если это моб, при косании с которым идет дамаг

            colObj.centerX = colObj.position.x;
            colObj.centerY = colObj.position.y;
            colObj.halfWidth = colObj.width / 2;
            colObj.halfHeight = colObj.height / 2;

            let vx = bullets.centerX - colObj.centerX;
            let vy = bullets.centerY - colObj.centerY;

            let combineHalfWidths = bullets.halfWidth + colObj.halfWidth;
            let combineHalfHeights = bullets.halfHeight + colObj.halfHeight;

            if (Math.abs(vx) < combineHalfWidths) {
                if (Math.abs(vy) < combineHalfHeights) {
                    if (delay > 0 && itsAngryMob) {
                        //значит колизия по игроку и мобам
                        const playerHead = bullets;
                        const impulse = [(bullets.centerX - colObj.x) / 2, (bullets.centerY - colObj.y) / 2];
                        if (isDamage) {
                            //урон по герою
                            isDamage = false;
                            setTimeout(() => (isDamage = true), 500); //уронная пауза
                            player.x += impulse[0]; //откдывание героя от противника
                            player.y += impulse[1];
                            playerHead.x += impulse[0];
                            playerHead.y += impulse[1];
                            playerHead.hp -= objectOfGameObjects[groupEl][i].damage;
                        }
                    } else if (colObj.hasOwnProperty("hp")) {
                        colObj.hp--;
                        const calculateImpulse = (num1: number, num2: number) => (num1 - num2) / 2;
                        const impulseMob = [
                            calculateImpulse(bullets.centerX, colObj.x),
                            calculateImpulse(bullets.centerY, colObj.y),
                        ];
                        colObj.x -= impulseMob[0];
                        colObj.y -= impulseMob[1];
                    }
                    hit = true;
                    return hit;
                } else {
                    hit = false;
                }
            } else {
                hit = false;
            }
        }
    }
    return hit;
}
