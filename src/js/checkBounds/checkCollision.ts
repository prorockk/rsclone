import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { countMobs, currentRoom } from "../Rooms/startGame";

export default function checkCollision(player: any, side: string): boolean | undefined {
    const playerBounds: any = player.getBounds();

    const roomArray: any = objectOfGameObjects[currentRoom];

    for (let groupEl in roomArray) {
        if (groupEl.match(/door/) && countMobs.count === 0) {
            continue;
        }
        for (let i = 0; i < roomArray[groupEl].length; i += 1) {
            if (roomArray[groupEl][i].hasOwnProperty("angryMob")) {
                continue;
            }
            const boundsOfGameObject = roomArray[groupEl][i].getBounds();
            if (side === "right") {
                if (
                    playerBounds.x + playerBounds.width > boundsOfGameObject.x &&
                    playerBounds.x < boundsOfGameObject.x &&
                    playerBounds.y + playerBounds.height > boundsOfGameObject.y + player.speed &&
                    playerBounds.y + player.speed < boundsOfGameObject.y + boundsOfGameObject.height
                )
                    return true;
            }
            if (side === "left") {
                if (
                    playerBounds.x < boundsOfGameObject.x + boundsOfGameObject.width &&
                    playerBounds.x + playerBounds.width > boundsOfGameObject.x + boundsOfGameObject.width &&
                    playerBounds.y + playerBounds.height > boundsOfGameObject.y + player.speed &&
                    playerBounds.y + player.speed < boundsOfGameObject.y + boundsOfGameObject.height
                )
                    return true;
            }
            if (side === "top") {
                if (
                    boundsOfGameObject.x + boundsOfGameObject.width - player.speed > playerBounds.x &&
                    boundsOfGameObject.x + player.speed < playerBounds.x + playerBounds.width &&
                    playerBounds.y < boundsOfGameObject.y + boundsOfGameObject.height &&
                    playerBounds.y > boundsOfGameObject.y
                ) {
                    return true;
                }
            }
            if (side === "down") {
                if (
                    boundsOfGameObject.x + boundsOfGameObject.width - player.speed > playerBounds.x &&
                    boundsOfGameObject.x + player.speed < playerBounds.x + playerBounds.width &&
                    playerBounds.y + playerBounds.height > boundsOfGameObject.y &&
                    playerBounds.y + playerBounds.height < boundsOfGameObject.y + boundsOfGameObject.height
                )
                    return true;
            }
        }
    }
}
