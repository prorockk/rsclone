import * as PIXI from "pixi.js";
import { gameObjects } from "../CreateSprite/GameObjects";
import { soundGame } from "../otherScripts/sound";
import { currentRoom, PlayerMethod, rooms, player, playerHead } from "../Rooms/startGame";

let isDamage: boolean = true;

export default function checkTexture(delay: number, bullets: any, shooter?: number | boolean): boolean | undefined {
    let hit: boolean = false;

    const bulletsBounds = bullets.getBounds();
    let correctForHeadCollisionWidth: number = 0;
    let correctForHeadCollisionHeight: number = 0;
    let denominator: number = 2;

    if (delay > 0) {
        correctForHeadCollisionWidth = 5;
        correctForHeadCollisionHeight = 10;
        denominator = 4;
    }

    bullets.centerX = bulletsBounds.x + correctForHeadCollisionWidth;
    bullets.centerY = bulletsBounds.y + correctForHeadCollisionHeight;

    bullets.halfWidth = bulletsBounds.width / denominator;
    bullets.halfHeight = bulletsBounds.height / denominator;
    const roomArray = gameObjects[currentRoom];
    if (shooter) {
        return check(playerHead);
    }
    for (const groupEl in roomArray) {
        for (let i = 0; i < roomArray[groupEl].length; i += 1) {
            if (typeof shooter === "boolean" && roomArray[groupEl][i].hasOwnProperty("angryMob")) return false;
            if (check(roomArray[groupEl][i])) {
                return true;
            }
        }
    }

    function check(colObj: PIXI.Sprite | any): boolean | undefined {
        const haveUrl: boolean = colObj.hasOwnProperty("url");
        const haveBullForPlayer: boolean = bullets.hasOwnProperty("forPlayer");
        const haveBullForMobs: boolean = bullets.hasOwnProperty("forMobs");
        if (haveUrl && colObj.url === "invisibleBlock.png" && (haveBullForMobs || haveBullForPlayer)) {
            return false;
        }
        let correctForHeadCollisionWidth: number = 0;
        let correctForHeadCollisionHeight: number = 0;
        let denominator: number = 2;
        if (shooter) {
            correctForHeadCollisionWidth = 5;
            correctForHeadCollisionHeight = 10;
            denominator = 2.2;
        }
        const colObjBounds = colObj.getBounds();

        let itsAngryMob: boolean = false;

        const objCenterX: number = colObjBounds.x + correctForHeadCollisionWidth;
        const objCenterY: number = colObjBounds.y + correctForHeadCollisionHeight;
        const objHalfWidth: number = colObjBounds.width / denominator;
        const objHalfHeight: number = colObjBounds.height / denominator;

        const vx: number = bullets.centerX - objCenterX;
        const vy: number = bullets.centerY - objCenterY;

        const combineHalfWidths: number = bullets.halfWidth + objHalfWidth;
        const combineHalfHeights: number = bullets.halfHeight + objHalfHeight;

        if (Math.abs(vx) < combineHalfWidths) {
            if (Math.abs(vy) < combineHalfHeights) {
                const haveAngryMob: boolean = colObj.hasOwnProperty("angryMob");
                const haveMobHp: boolean = colObj.hasOwnProperty("hp");
                if (haveAngryMob) itsAngryMob = colObj.angryMob;

                let impulse: number[] = [(bullets.centerX - objCenterX) / 150, (bullets.centerY - objCenterY) / 150];

                if (impulse.reduce((acc, num) => Math.abs(acc) + Math.abs(num)) > 0.5) {
                    impulse = impulse.map((num) => num / 2);
                }

                if (
                    ((delay > 0 && itsAngryMob) || (haveBullForPlayer && shooter)) &&
                    !player.hasOwnProperty("godMode")
                ) {
                    if (haveBullForPlayer) impulse = impulse.map((cord: number) => cord * -1);

                    const int = setInterval(() => {
                        if (!checkTexture(1, playerHead, false)) {
                            player.x += impulse[0];
                            player.y += impulse[1];
                            playerHead.x += impulse[0];
                            playerHead.y += impulse[1];
                        }
                    }, 20);
                    setTimeout(() => {
                        clearInterval(int);
                    }, 250);

                    if (isDamage) {
                        isDamage = false;
                        setTimeout(() => {
                            isDamage = true;
                        }, 800);
                        playerHead.hp -= colObj.damage || bullets.damage;
                    }
                } else if (haveMobHp && haveBullForMobs && delay === 0) {
                    if (haveUrl) {
                        colObj.anchor.set(0.5);
                        if (colObj.hp.length === 0) {
                            soundGame("pop");
                            rooms[currentRoom].removeChild(colObj);
                            roomArray[colObj.url].splice(roomArray[colObj.url].indexOf(colObj), 1);
                        } else colObj.texture = PIXI.Texture.from(colObj.hp.shift());
                    }
                    colObj.freeze = impulse.slice();
                } else if (delay > 0 && haveAngryMob && !itsAngryMob) {
                    if (haveUrl) {
                        if (PlayerMethod.buffPlayer.call(PlayerMethod, colObj)) {
                            rooms[currentRoom].removeChild(colObj);
                            return true;
                        }
                    }
                    const int = setInterval(() => {
                        if (!checkTexture(0, colObj, false)) {
                            colObj.x -= impulse[0] * 1.5;
                            colObj.y -= impulse[1] * 1.5;
                        }
                    }, 20);
                    setTimeout(() => clearInterval(int), 250);
                }
                return true;
            }
            hit = false;
        } else {
            hit = false;
        }
    }

    return hit;
}
