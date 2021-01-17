import * as PIXI from "pixi.js";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";

class CheckBounds {
    player: any;
    constructor(gameMember: any) {
        this.player = gameMember;
    }

    init(playerDirection: string) {
        const playerBounds = this.player.getBounds();
        //добавить параметры для внутренних препятсвий
        return playerDirection === "right"
            ? playerBounds.x + this.player.width >= 465
            : playerDirection === "down"
            ? playerBounds.y + this.player.height >= 430
            : playerDirection === "left"
            ? playerBounds.x <= 50
            : playerBounds.y <= 60;
    }
    hitTexture() {
        const playerBounds = this.player.getBounds();
        for (let groupEl in objectOfGameObjects) {
            for (let i = 0; i < objectOfGameObjects[groupEl].length; i += 1) {
                const gameObject = objectOfGameObjects[groupEl][i];
                const boundsOfGameObject = gameObject.getBounds();
                let hit = false;

                let vx = boundsOfGameObject.x - playerBounds.x;
                let vy = boundsOfGameObject.y - playerBounds.y;

                let combineHalfWidths = (boundsOfGameObject.width + playerBounds.width) / 2;
                let combineHalfHeights = (boundsOfGameObject.height + playerBounds.height) / 2;

                if (Math.abs(vx) < combineHalfWidths) {
                    if (Math.abs(vy) < combineHalfHeights) {
                        hit = true;
                        console.log(hit);
                    } else {
                        hit = false;
                    }
                } else {
                    hit = false;
                }
                return hit;
            }
        }
    }
}
export default CheckBounds;
