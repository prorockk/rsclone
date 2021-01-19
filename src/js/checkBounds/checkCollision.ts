import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";

export default function checkCollision(player: any, playerHead: any, side: string) {
    let playerBounds = player.getBounds();

    for (let groupEl in objectOfGameObjects) {
        for (let i = 0; i < objectOfGameObjects[groupEl].length; i += 1) {
            const gameObject = objectOfGameObjects[groupEl][i];
            const boundsOfGameObject = gameObject.getBounds();
            let result = false;
            if (side === "right") {
                if (
                    playerBounds.x + playerBounds.width > boundsOfGameObject.x &&
                    playerBounds.x < boundsOfGameObject.x &&
                    playerBounds.y + playerBounds.height > boundsOfGameObject.y + 3 &&
                    playerBounds.y + 3 < boundsOfGameObject.y + boundsOfGameObject.height
                )
                    result = true;
            } else if (side === "left") {
                if (
                    playerBounds.x < boundsOfGameObject.x + boundsOfGameObject.width &&
                    playerBounds.x + playerBounds.width > boundsOfGameObject.x + boundsOfGameObject.width &&
                    playerBounds.y + playerBounds.height > boundsOfGameObject.y + 3 &&
                    playerBounds.y + 3 < boundsOfGameObject.y + boundsOfGameObject.height
                )
                    result = true;
            } else if (side === "top") {
                if (
                    boundsOfGameObject.x + boundsOfGameObject.width - 3 > playerBounds.x &&
                    boundsOfGameObject.x + 3 < playerBounds.x + playerBounds.width &&
                    playerBounds.y < boundsOfGameObject.y + boundsOfGameObject.height &&
                    playerBounds.y > boundsOfGameObject.y
                )
                    result = true;
            } else if (side === "down") {
                if (
                    boundsOfGameObject.x + boundsOfGameObject.width - 3 > playerBounds.x &&
                    boundsOfGameObject.x + 3 < playerBounds.x + playerBounds.width &&
                    playerBounds.y + playerBounds.height > boundsOfGameObject.y &&
                    playerBounds.y + playerBounds.height < boundsOfGameObject.y + boundsOfGameObject.height
                )
                    result = true;
            }
            if (result) {
                return true;
            }
        }
    }
}
