import * as PIXI from "pixi.js";
import { soundGame } from "../otherScripts/sound";
import { BackGroundImage, currentRoom, rooms } from "../Rooms/startGame";
import { app } from "../script";
import { panelContainer } from "../topPanel/map";

function deathPlayer(): void {
    soundGame("isaacDeath", false);
    soundGame("deathMusic", false);
    const ticker: PIXI.Ticker = app.ticker;
    const blurFilter1: PIXI.filters.BlurFilter = new PIXI.filters.BlurFilter();
    blurFilter1.blur = 0;
    BackGroundImage.filters = [blurFilter1];
    rooms[currentRoom].filters = [blurFilter1];
    panelContainer.filters = [blurFilter1];
    ticker.add(() => {
        if (ticker.speed > 0.1) {
            ticker.speed -= 0.01;
            blurFilter1.blur += 0.1;
        } else {
            ticker.stop();
        }
    });
}
export default deathPlayer;
