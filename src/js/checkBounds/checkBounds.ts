import * as PIXI from "pixi.js";
import { currentRoom } from "../Rooms/startGame";
import { objectOfGameObjects } from "../CreateSprite/objectOfGameObjects";

class CheckBounds {
    player: any;
    constructor(gameMember: any) {
        this.player = gameMember;
    }

    init(playerDirection: string) {
        const playerBounds = this.player.getBounds();

        if (playerBounds.y < 150) {
            this.player.y = 490;
            objectOfGameObjects[currentRoom]["toUpperRoom"]();
        }

        if (playerBounds.y > 505) {
            this.player.y = 190;
            objectOfGameObjects[currentRoom]["toBottomRoom"]();
        }

        if (playerBounds.x > 720) {
            this.player.x = 100;
            objectOfGameObjects[currentRoom]["toRightRoom"]();
        }

        if (playerBounds.x < 50) {
            this.player.x = 700;
            objectOfGameObjects[currentRoom]["toLeftRoom"]();
        }

        return false;
    }
}
export default CheckBounds;
