import * as PIXI from "pixi.js";
import { BackGroundImage, currentRoom, rooms } from "../Rooms/startGame";
import { app } from "../script";

function deathPlayer() {
    const ticker = app.ticker;
    const blurFilter1 = new PIXI.filters.BlurFilter();
    blurFilter1.blur = 0;
    BackGroundImage.filters = [blurFilter1];
    ticker.add(() => {
        if (ticker.speed > 0.1) {
            ticker.speed -= 0.01;
            blurFilter1.blur += 0.5;
        } else {
            console.log("off");

            ticker.stop();
        }
    });
}
export default deathPlayer;
