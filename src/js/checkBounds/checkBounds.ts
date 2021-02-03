import { currentRoom } from "../Rooms/startGame";
import { gameObjects } from "../CreateSprite/GameObjects";

class CheckBounds {
    player: any;
    head: any;
    constructor(gameMember: any, gameHead: any) {
        this.player = gameMember;
        this.head = gameHead;
    }

    init(): boolean {
        const changeRoom = (func: () => void) => {
            try {
                func();
            } catch (e) {
                let visual = true;
                const intTint = setInterval(() => {
                    const changeAlpha = (current: number): void => {
                        this.player.alpha = current;
                        this.head.alpha = current;
                        visual = !visual;
                    };
                    visual ? changeAlpha(0) : changeAlpha(1);
                }, 100);
                setTimeout(() => {
                    clearInterval(intTint);
                    this.player.alpha = 1;
                    this.head.alpha = 1;
                }, 550);
                this.player.x = this.head.x = 400;
                this.player.y = this.head.y = 300;
            }
        };
        const playerBounds = this.player.getBounds();

        if (playerBounds.y < 150) {
            this.player.y = this.head.y = 490;
            changeRoom(gameObjects[currentRoom]["toUpperRoom"]);
            return true;
        }

        if (playerBounds.y > 515) {
            this.player.y = this.head.y = 190;
            changeRoom(gameObjects[currentRoom]["toBottomRoom"]);
            return true;
        }

        if (playerBounds.x > 720) {
            this.player.x = this.head.x = 100;
            changeRoom(gameObjects[currentRoom]["toRightRoom"]);
            return true;
        }

        if (playerBounds.x < 50) {
            this.player.x = this.head.x = 700;
            changeRoom(gameObjects[currentRoom]["toLeftRoom"]);
            return true;
        }
        return false;
    }
}
export default CheckBounds;
