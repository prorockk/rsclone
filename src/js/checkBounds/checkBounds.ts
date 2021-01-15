import * as PIXI from "pixi.js";

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
}
export default CheckBounds;
