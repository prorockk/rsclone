import * as PIXI from "pixi.js";
import createGameElement from "../CreateSprite/createGameElement";
import createPlayer from "../Player/createPlayer";
//import addPlayerActions from "./Player/addPlayerActions"
import Fly from "../Mobs/fly";
import checkBounds from "../checkBounds/checkBounds";
import addPlayerActions from "../Player/addPlayerActions";
import { app } from "../script";
const PlayerMethod = new createPlayer();
const globalEl: any = {};

function startGame() {
    const FlyClass = new Fly();

    app.loader.add("isaac", "../assets/isaac_moving_table.json"); //загрузка спрайта
    app.loader.load(() => {
        PlayerMethod.doneLoading();
        globalEl.player = PlayerMethod.init.call(PlayerMethod);
        FlyClass.doneLoading();
    });

    addPlayerActions();

    const BackGroundImage = PIXI.Sprite.from("../assets/floor.png");
    BackGroundImage.width = 512;
    BackGroundImage.height = 512;
    BackGroundImage.anchor.set(0, 0);
    app.stage.addChild(BackGroundImage);

    createGameElement(app.view.width / 2, app.view.height / 4, "../assets/box.png", 30, 23);

    // const gameWrapper = document.getElementById('gameWrapper');
    document.addEventListener("pointerdown", PlayerMethod.playerShooting.bind(PlayerMethod));

    app.ticker.add(() => {
        PlayerMethod.movePlayer();
        PlayerMethod.updateBullets.call(PlayerMethod);
    });

    // const box = createGameElement('../../images/box.png', (app.view.width / 4), (app.view.height / 4))
}
export { startGame, PlayerMethod, globalEl };
