// ЭТО ПУСТЬ БУДЕТ ТОЛЬКО ДЛЯ ПУЛЬ
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { currentRoom } from "../Rooms/startGame";

export default function checkTexture(bullets: any) {
    let hit = false;
    bullets.centerX = bullets.position.x;
    bullets.centerY = bullets.position.y;
    bullets.halfWidth = bullets.width / 4;
    bullets.halfHeight = bullets.height / 4;

    const roomArray = objectOfGameObjects[currentRoom];

    for (let groupEl in roomArray) {
        for (let i = 0; i < roomArray[groupEl].length; i += 1) {
            roomArray[groupEl][i].centerX = roomArray[groupEl][i].position.x;
            roomArray[groupEl][i].centerY = roomArray[groupEl][i].position.y;
            roomArray[groupEl][i].halfWidth = roomArray[groupEl][i].width / 2;
            roomArray[groupEl][i].halfHeight = roomArray[groupEl][i].height / 2;

            let vx = bullets.centerX - roomArray[groupEl][i].centerX;
            let vy = bullets.centerY - roomArray[groupEl][i].centerY;

            let combineHalfWidths = bullets.halfWidth + roomArray[groupEl][i].halfWidth;
            let combineHalfHeights = bullets.halfHeight + roomArray[groupEl][i].halfHeight;

            if (Math.abs(vx) < combineHalfWidths) {
                if (Math.abs(vy) < combineHalfHeights) {
                    console.log(groupEl);

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
