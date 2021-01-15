import * as PIXI from "pixi.js";
import createGameElement from "./CreateSprite/createGameElement";
import createPlayer from "./Player/createPlayer";
//import addPlayerActions from "./Player/addPlayerActions"
import addPlayerActions from "./Player/addPlayerActions";
import controller from "./Keyboard/keyboard";

const app = new PIXI.Application({
    width: 512, //469
    height: 512, //312
    backgroundColor: 0xaaaaaa,
    antialias: true,
});

// PIXI.settings.SCALE_MODE;

const PlayerMethod = new createPlayer();

const player = PlayerMethod.init.call(PlayerMethod);

const BackGroundImage = PIXI.Sprite.from("../assets/floor.png");
BackGroundImage.width = 512;
BackGroundImage.height = 512;
BackGroundImage.anchor.set(0, 0);
app.stage.addChild(BackGroundImage);

createGameElement(app.view.width / 4, app.view.height / 4, "../assets/box.png", 30, 23);
createGameElement(app.view.width / 4, app.view.height / 2, "../assets/9KvNB.png", 30, 23);

const box = createGameElement(app.view.width / 2, app.view.height / 4, "../assets/box.png", 30, 23);

addPlayerActions();

console.log(PlayerMethod.player.player);

// const gameWrapper = document.getElementById('gameWrapper');
document.body.appendChild(app.view);

app.ticker.add(() => {
    PlayerMethod.movePlayer();
    PlayerMethod.updateBullets.call(PlayerMethod);
});
controller(PlayerMethod /*player, box*/);

//const box = createGameElement('../images/box.png', (app.view.width / 4), (app.view.height / 4))
export { app, player, PlayerMethod, box };
