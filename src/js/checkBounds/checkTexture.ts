// ЭТО ПУСТЬ БУДЕТ ТОЛЬКО ДЛЯ ПУЛЬ
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { currentRoom } from "../Rooms/startGame";
import { player } from "../Rooms/startGame";

let isDamage = true;

export default function checkTexture(delay: number, bullets: any, shooter: any | undefined) {
    let hit = false;

    const bulletsBounds = bullets.getBounds();

    bullets.centerX = bulletsBounds.x;
    bullets.centerY = bulletsBounds.y;
    let denominator = delay > 0 ? 2 : 4;
    bullets.halfWidth = bulletsBounds.width / denominator;
    bullets.halfHeight = bulletsBounds.height / denominator;

    const roomArray = objectOfGameObjects[currentRoom];

    for (let groupEl in roomArray) {
        for (let i = 0; i < roomArray[groupEl].length; i += 1) {
            const colObj = roomArray[groupEl][i].getBounds();
            if (shooter && shooter === colObj) {
                return hit;
            }
            let itsAngryMob = false;

            if (colObj.hasOwnProperty("angryMob")) itsAngryMob = colObj.angryMob; //если это моб, при косании с которым идет дамаг

            colObj.centerX = colObj.x;
            colObj.centerY = colObj.y;
            colObj.halfWidth = colObj.width / 2;
            colObj.halfHeight = colObj.height / 2;

            let vx = bullets.centerX - colObj.centerX;
            let vy = bullets.centerY - colObj.centerY;

            let combineHalfWidths = bullets.halfWidth + colObj.halfWidth;
            let combineHalfHeights = bullets.halfHeight + colObj.halfHeight;

            if (Math.abs(vx) < combineHalfWidths) {
                if (Math.abs(vy) < combineHalfHeights) {
                    console.log(groupEl);
                    const impulse = [(bullets.centerX - colObj.x) / 72, (bullets.centerY - colObj.y) / 72];
                    if (delay > 0 && itsAngryMob) {
                        //столкновение мобов с игроком
                        //значит колизия по игроку и мобам
                        const playerHead = bullets;

                        if (isDamage) {
                            //урон по герою
                            isDamage = false;
                            const int = setInterval(() => {
                                player.x += impulse[0]; //откдывание героя от противника
                                player.y += impulse[1];
                                playerHead.x += impulse[0];
                                playerHead.y += impulse[1];
                            }, 10);
                            setTimeout(() => {
                                isDamage = true;

                                clearInterval(int);
                            }, 400); //уронная пауза

                            playerHead.hp -= colObj.damage;
                        }
                    } else if (colObj.hasOwnProperty("hp") && bullets.hasOwnProperty("forMobs") && delay === 0) {
                        //попадание слез по мобам
                        if (shooter && shooter === colObj) {
                            return hit;
                        } else {
                            colObj.froze = true; //прерываем стандартное перемещение моба
                            colObj.hp--;
                            const int = setInterval(() => {
                                colObj.x -= impulse[0]; //откдывание противника от выстрелов
                                colObj.y -= impulse[1];
                            }, 10);
                            setTimeout(() => {
                                clearInterval(int);
                            }, 400); //конец перемещения
                        }
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
