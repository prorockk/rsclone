//import createGameElement from "./CreateSprite/createGameElement";
import createPlayer from "./Player/createPlayer.js";
//import addPlayerActions from "./Player/addPlayerActions"
import addPlayerActions from "./Player/addPlayerActions.js";

const app = new PIXI.Application({
  width: 512,
  height: 512,
  backgroundColor: 0xAAAAAA,
  antialias: true,
});

const PlayerMethod = new createPlayer();

const player = PlayerMethod.init();

addPlayerActions();

const gameWrapper = document.getElementById('gameWrapper');
gameWrapper.appendChild( app.view );
gameWrapper.addEventListener('pointerdown', PlayerMethod.playerShooting.bind(PlayerMethod));



app.ticker.add(() => {
    PlayerMethod.movePlayer();
    PlayerMethod.updateBullets.call(PlayerMethod);
  });

//const box = createGameElement('../images/box.png', (app.view.width / 4), (app.view.height / 4))
 export {
   app,
   player,
   PlayerMethod
}