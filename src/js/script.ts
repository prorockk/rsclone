import * as PIXI from "pixi.js";
import createGameElement from "./CreateSprite/createGameElement";
import createPlayer from "./Player/createPlayer";
import Fly from "./Mobs/fly";
import checkBounds from "./checkBounds/checkBounds";
import addPlayerActions from "./Player/addPlayerActions";
import controller from "./Keyboard/keyboard";

const app = new PIXI.Application({
    width: 512, //469
    height: 512, //312
    backgroundColor: 0xaaaaaa,
    antialias: true,
});

const PlayerMethod = new createPlayer();
const FlyClass = new Fly();
const globalEl: any = {};
app.loader.add("isaac", "../assets/isaac_moving_table.json"); //загрузка спрайта
app.loader.load(() => {
    PlayerMethod.doneLoading();
    globalEl.player = PlayerMethod.init.call(PlayerMethod);
    FlyClass.doneLoading();
    controller(PlayerMethod /*player, box*/);
});
app.screen.x = app.screen.x + 50;
console.log(app.screen);

const BackGroundImage = PIXI.Sprite.from("../assets/floor.png");
BackGroundImage.width = 512;
BackGroundImage.height = 512;
BackGroundImage.anchor.set(0, 0);
app.stage.addChild(BackGroundImage);

const box = createGameElement(app.view.width / 2, app.view.height / 4, "../assets/box.png", 30, 23);
globalEl.box = box;

// const gameWrapper = document.getElementById('gameWrapper');
document.body.appendChild(app.view);

//const box = createGameElement('../images/box.png', (app.view.width / 4), (app.view.height / 4))
export { app, PlayerMethod, globalEl };
