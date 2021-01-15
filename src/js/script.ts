import * as PIXI from "pixi.js";
import createGameElement from "./CreateSprite/createGameElement";
import createPlayer from "./Player/createPlayer";
import Menu from "./menu";
//import addPlayerActions from "./Player/addPlayerActions"
import addPlayerActions from "./Player/addPlayerActions";

const app = new PIXI.Application({
    width: 512, //469
    height: 512, //312
    backgroundColor: 0xaaaaaa,
    antialias: true,
});

// PIXI.settings.SCALE_MODE;

const PlayerMethod = new createPlayer();

const player = PlayerMethod.init.call(PlayerMethod);

addPlayerActions();
Menu();

const BackGroundImage = PIXI.Sprite.from("../assets/floor.png");
BackGroundImage.width = 512;
BackGroundImage.height = 512;
BackGroundImage.anchor.set(0, 0);
app.stage.addChild(BackGroundImage);

createGameElement(app.view.width / 2, app.view.height / 4, "../assets/box.png", 30, 23);

// const gameWrapper = document.getElementById('gameWrapper');
document.body.appendChild(app.view);
document.addEventListener("pointerdown", PlayerMethod.playerShooting.bind(PlayerMethod));

app.ticker.add(() => {
    PlayerMethod.movePlayer();
    PlayerMethod.updateBullets.call(PlayerMethod);
});

//const box = createGameElement('../images/box.png', (app.view.width / 4), (app.view.height / 4))
export { app, player, PlayerMethod };
