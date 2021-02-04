import * as PIXI from "pixi.js";
import { soundGame } from "../otherScripts/sound";
import renderEndScreen from "../otherScripts/endScreen";
import { BackGroundImage, currentRoom, rooms } from "./startGame";
import { app } from "../script";
import { panelContainer } from "../topPanel/map";

function deathPlayer(): void {
    soundGame("isaacDeath");
    soundGame("deathMusic");
    soundGame("flyLoop1", true);
    soundGame("flyLoop2", true);
    soundGame("floorMusic", true);
    soundGame("bossMusic", true);
    const { ticker } = app;
    const blurFilter1: PIXI.filters.BlurFilter = new PIXI.filters.BlurFilter();
    blurFilter1.blur = 0;
    BackGroundImage.filters = [blurFilter1];
    rooms[currentRoom].filters = [blurFilter1];
    panelContainer.filters = [blurFilter1];
    ticker.add(() => {
        if (ticker.speed > 0.1) {
            ticker.speed -= 0.01;
            blurFilter1.blur += 0.1;
        }
    });

    setTimeout(() => {
        renderEndScreen(true);
    }, 300);
    setTimeout(() => {
        ticker.stop();
    }, 330);
}
export default deathPlayer;
