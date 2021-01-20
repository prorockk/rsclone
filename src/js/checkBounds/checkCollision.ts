import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";
import { currentRoom } from "../Rooms/startGame";

export default function checkCollision(player: any, playerHead: any, side: string) {
    const playerBounds = player.getBounds();

    const roomArray = objectOfGameObjects[currentRoom];

    for (let groupEl in roomArray) {
        if (groupEl === "door.png") {
            continue;
        }
        for (let i = 0; i < roomArray[groupEl].length; i += 1) {
            const boundsOfGameObject = roomArray[groupEl][i].getBounds();
            if (side === "right") {
                if (
                    playerBounds.x + playerBounds.width > boundsOfGameObject.x &&
                    playerBounds.x < boundsOfGameObject.x &&
                    playerBounds.y + playerBounds.height > boundsOfGameObject.y + 3 &&
                    playerBounds.y + 3 < boundsOfGameObject.y + boundsOfGameObject.height
                )
                    return true;
            }
            if (side === "left") {
                if (
                    playerBounds.x < boundsOfGameObject.x + boundsOfGameObject.width &&
                    playerBounds.x + playerBounds.width > boundsOfGameObject.x + boundsOfGameObject.width &&
                    playerBounds.y + playerBounds.height > boundsOfGameObject.y + 3 &&
                    playerBounds.y + 3 < boundsOfGameObject.y + boundsOfGameObject.height
                )
                    return true;
            }
            if (side === "top") {
                if (
                    boundsOfGameObject.x + boundsOfGameObject.width - 3 > playerBounds.x &&
                    boundsOfGameObject.x + 3 < playerBounds.x + playerBounds.width &&
                    playerBounds.y < boundsOfGameObject.y + boundsOfGameObject.height &&
                    playerBounds.y > boundsOfGameObject.y
                )
                    return true;
            }
            if (side === "down") {
                if (
                    boundsOfGameObject.x + boundsOfGameObject.width - 3 > playerBounds.x &&
                    boundsOfGameObject.x + 3 < playerBounds.x + playerBounds.width &&
                    playerBounds.y + playerBounds.height > boundsOfGameObject.y &&
                    playerBounds.y + playerBounds.height < boundsOfGameObject.y + boundsOfGameObject.height
                )
                    return true;
            }
        }
    }
}
