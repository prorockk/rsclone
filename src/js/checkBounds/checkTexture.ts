// ЭТО ПУСТЬ БУДЕТ ТОЛЬКО ДЛЯ ПУЛЬ

import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";

export default function checkTexture(bullets: any) {
    let hit = false;
    bullets.centerX = bullets.position.x;
    bullets.centerY = bullets.position.y;
    bullets.halfWidth = bullets.width / 2;
    bullets.halfHeight = bullets.height / 2;

    for (let groupEl in objectOfGameObjects) {
        for (let i = 0; i < objectOfGameObjects[groupEl].length; i += 1) {
            objectOfGameObjects[groupEl][i].centerX = objectOfGameObjects[groupEl][i].position.x;
            objectOfGameObjects[groupEl][i].centerY = objectOfGameObjects[groupEl][i].position.y;
            objectOfGameObjects[groupEl][i].halfWidth = objectOfGameObjects[groupEl][i].width / 2;
            objectOfGameObjects[groupEl][i].halfHeight = objectOfGameObjects[groupEl][i].height / 2;

            let vx = bullets.centerX - objectOfGameObjects[groupEl][i].centerX;
            let vy = bullets.centerY - objectOfGameObjects[groupEl][i].centerY;

            let combineHalfWidths = bullets.halfWidth + objectOfGameObjects[groupEl][i].halfWidth;
            let combineHalfHeights = bullets.halfHeight + objectOfGameObjects[groupEl][i].halfHeight;

            if (Math.abs(vx) < combineHalfWidths) {
                if (Math.abs(vy) < combineHalfHeights) {
                    hit = true;
                    console.log(true);
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

    // gameObjects.centerX = gameObjects.position.x;
    // gameObjects.centerY = gameObjects.position.y;
    // gameObjects.halfWidth = gameObjects.width / 2;
    // gameObjects.halfHeight = gameObjects.height / 2;

    // let vx = bullets.centerX - gameObjects.centerX;
    // let vy = bullets.centerY - gameObjects.centerY;

    // let combineHalfWidths = bullets.halfWidth + gameObjects.halfWidth;
    // let combineHalfHeights = bullets.halfHeight + gameObjects.halfHeight;

    // if (Math.abs(vx) < combineHalfWidths) {
    //     if (Math.abs(vy) < combineHalfHeights) {
    //         hit = true;
    //         console.log(true);
    //     } else {
    //         hit = false;
    //     }
    // } else {
    //     hit = false;
    // }
    // return hit;
}
