// ЭТО ПУСТЬ БУДЕТ ТОЛЬКО ДЛЯ ПУЛЬ
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { currentRoom, PlayerMethod, rooms } from "../Rooms/startGame";
import { player, playerHead } from "../Rooms/startGame";

let isDamage = true;

export default function checkTexture(delay: number, bullets: any, shooter?: any | undefined) {
    let hit = false;

    const bulletsBounds = bullets.getBounds();
    let correctForHeadCollisionWidth = 0;
    let correctForHeadCollisionHeight = 0;
    let denominator = 2;

    if (delay > 0) {
        // коллизия игрока с мобами
        correctForHeadCollisionWidth = 5;
        correctForHeadCollisionHeight = 10;
        denominator = 4;
    }

    bullets.centerX = bulletsBounds.x + correctForHeadCollisionWidth;
    bullets.centerY = bulletsBounds.y + correctForHeadCollisionHeight;

    bullets.halfWidth = bulletsBounds.width / denominator;
    bullets.halfHeight = bulletsBounds.height / denominator;
    const roomArray = objectOfGameObjects[currentRoom];
    if (shooter) {
        return check(playerHead);
    } else {
        for (let groupEl in roomArray) {
            for (let i = 0; i < roomArray[groupEl].length; i += 1) {
                if (typeof shooter === "boolean" && roomArray[groupEl][i].hasOwnProperty("angryMob")) return false; //что бы мобы не стреляли сами в себя, передаем shooter = false
                if (check(roomArray[groupEl][i])) {
                    return true;
                }
            }
        }
    }
    function check(colObj: PIXI.Sprite | any) {
        let correctForHeadCollisionWidth = 0;
        let correctForHeadCollisionHeight = 0;
        let denominator = 2;
        if (shooter) {
            // коллизия игрока с выстрелами мобов
            correctForHeadCollisionWidth = 5;
            correctForHeadCollisionHeight = 10;
            denominator = 2.2;
        }
        const colObjBounds = colObj.getBounds();

        let itsAngryMob = false;

        const objCenterX = colObjBounds.x + correctForHeadCollisionWidth;
        const objCenterY = colObjBounds.y + correctForHeadCollisionHeight;
        const objHalfWidth = colObjBounds.width / denominator;
        const objHalfHeight = colObjBounds.height / denominator;

        let vx = bullets.centerX - objCenterX;
        let vy = bullets.centerY - objCenterY;

        let combineHalfWidths = bullets.halfWidth + objHalfWidth;
        let combineHalfHeights = bullets.halfHeight + objHalfHeight;

        if (Math.abs(vx) < combineHalfWidths) {
            if (Math.abs(vy) < combineHalfHeights) {
                const haveAngryMob = colObj.hasOwnProperty("angryMob");
                const haveBullForPlayer = bullets.hasOwnProperty("forPlayer");
                const haveBullForMobs = bullets.hasOwnProperty("forMobs");
                const haveMobHp = colObj.hasOwnProperty("hp");
                const haveUrl = colObj.hasOwnProperty("url");
                if (haveAngryMob) itsAngryMob = colObj.angryMob; //если это моб, при косании с которым идет дамаг

                let impulse = [(bullets.centerX - objCenterX) / 150, (bullets.centerY - objCenterY) / 150];

                if (impulse.reduce((acc, num) => Math.abs(acc) + Math.abs(num)) > 0.5) {
                    impulse = impulse.map((num) => num / 2);
                }

                if ((delay > 0 && itsAngryMob) || (haveBullForPlayer && shooter)) {
                    //вызывается в app.ticker (delay, head, false) и в move у мобов во время стрельбы
                    //столкновение мобов ИЛИ их слез с игроком
                    if (haveBullForPlayer) impulse = impulse.map((cord: number) => cord * -1);

                    const int = setInterval(() => {
                        if (!checkTexture(1, playerHead, false)) {
                            player.x += impulse[0]; //откдывание героя от противника
                            player.y += impulse[1];
                            playerHead.x += impulse[0];
                            playerHead.y += impulse[1];
                        }
                    }, 20);
                    setTimeout(() => {
                        //уронная пауза
                        clearInterval(int);
                    }, 250);

                    if (isDamage) {
                        //урон по герою
                        isDamage = false;
                        setTimeout(() => {
                            isDamage = true;
                        }, 800); //уронная пауза
                        playerHead.hp -= colObj.damage || bullets.damage;
                    }
                } else if (haveMobHp && haveBullForMobs && delay === 0) {
                    //вызывается в AddPlayerActions
                    //попадание слез по мобам
                    if (haveUrl) {
                        //попадание по камням
                        rooms[currentRoom].removeChild(colObj);
                    }
                    colObj.freeze = impulse.slice(); //прерываем стандартное перемещение моба и передаем направление движения
                } else if (delay > 0 && haveAngryMob && !itsAngryMob) {
                    if (haveUrl) {
                        if (PlayerMethod.buffPlayer.call(PlayerMethod, colObj)) {
                            rooms[currentRoom].removeChild(colObj);
                            return true;
                        }
                    }
                    const int = setInterval(() => {
                        if (!checkTexture(0, colObj, false)) {
                            colObj.x -= impulse[0] * 1.5; //откдывание предметов и мух
                            colObj.y -= impulse[1] * 1.5;
                        }
                    }, 20);
                    setTimeout(() => clearInterval(int), 250);
                }
                return true;
            } else {
                hit = false;
            }
        } else {
            hit = false;
        }
    }

    return hit;
}
