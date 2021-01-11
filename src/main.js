//import * as PIXI from '../node_modules/pixi.js/dist/pixi';

const activeKeys = {};
const bullets = [];
const bulletSpeed = 8;
const playerSpeed = 3;
const playerSheets = {};

const app = new PIXI.Application({
  width: 512,
  height: 512,
  backgroundColor: 0xAAAAAA,
  antialias: true,
});

const gameWrapper = document.getElementById('gameWrapper');
gameWrapper.appendChild( app.view );
gameWrapper.addEventListener('pointerdown', playerShooting);

function createGameElement(url, positionX, positionY) {

    const gameElement = new PIXI.Sprite.from(`${url}`);
    gameElement.anchor.set(0.5)
    gameElement.x = positionX;
    gameElement.y = positionY;
    app.stage.addChild(gameElement);
    return gameElement;
}

//const player = createGameElement('../images/9KvNB.png', (app.view.width / 2), (app.view.height / 2))

/**********************************************/
app.loader.add('isaac', '../images/isaac_moving_table.png'); //загрузка спрайта
app.loader.load(doneLoading); //спрайт загрузился

function doneLoading() {
  createPlayerSheets();
  createPlayer();
}

function createPlayerSheets() {
  const sSheets = new PIXI.BaseTexture.from(app.loader.resources['isaac'].url);
  const w = 30;
  const h = 36;

  playerSheets['walkDown'] = [
    new PIXI.Texture(sSheets, new PIXI.Rectangle(9*w, 0, w, h)),
    new PIXI.Texture(sSheets, new PIXI.Rectangle(11*w, 0, w, h)),
    new PIXI.Texture(sSheets, new PIXI.Rectangle(10*w, 0, w, h)),
  ];
  playerSheets['walkLeft'] = [
    new PIXI.Texture(sSheets, new PIXI.Rectangle(3*w, 0, w, h)),
    new PIXI.Texture(sSheets, new PIXI.Rectangle(5*w, 0, w, h)),
    new PIXI.Texture(sSheets, new PIXI.Rectangle(4*w, 0, w, h)),
  ];
  playerSheets['walkRight'] = [
    new PIXI.Texture(sSheets, new PIXI.Rectangle(6*w, 0, w, h)),
    new PIXI.Texture(sSheets, new PIXI.Rectangle(8*w, 0, w, h)),
    new PIXI.Texture(sSheets, new PIXI.Rectangle(7*w, 0, w, h)),
  ];
  playerSheets['walkUp'] = [
    new PIXI.Texture(sSheets, new PIXI.Rectangle(0*w, 0, w, h)),
    new PIXI.Texture(sSheets, new PIXI.Rectangle(2*w, 0, w, h)),
    new PIXI.Texture(sSheets, new PIXI.Rectangle(1*w, 0, w, h)),
  ];
}

let player;

function createPlayer() {
    player = new PIXI.AnimatedSprite(playerSheets.walkUp);
    player.anchor.set(0.5);
    player.animationSpeed = 0.2;
    player.loop = false;
    player.x = app.view.width / 2;
    player.y = app.view.height / 2;
    app.stage.addChild(player);

    player.play();
}
/**********************************************/


window.addEventListener('keydown', (key) => {
  activeKeys[key.keyCode] = true;
})

window.addEventListener('keyup', (key) => {
  activeKeys[key.keyCode] = false;
})

//const keysInHTML = document.getElementById('activeKey');

function movePlayer() {
  //keysInHTML.innerHTML = JSON.stringify(activeKeys)
  const checkBounds = checkBoundsConstructor(player)
  if (activeKeys['39'] && !checkBounds('right')) {
    if (!player.playing) {
        player.textures = playerSheets.walkRight;
        player.play();
    }
    player.x += playerSpeed
  }
  if (activeKeys['38'] && !checkBounds('down')) {
    if (!player.playing) {
        player.textures = playerSheets.walkDown;
        player.play();
    }
    player.y -= playerSpeed
  }
  if (activeKeys['37'] && !checkBounds('left')) {
    if (!player.playing) {
        player.textures = playerSheets.walkLeft;
        player.play();
    }
    player.x -= playerSpeed
  }
  if (activeKeys['40'] && !checkBounds('top')) {
    if (!player.playing) {
        player.textures = playerSheets.walkUp;
        player.play();
    }
    player.y += playerSpeed
  }
}
//проверка - не выходит ли персонаж за границы холста
function checkBounds(playerDirection) {
    const playerBounds = player.getBounds();

    return playerDirection === 'right' ? (playerBounds.x + player.width) >= 512 :
    playerDirection === 'down' ?  playerBounds.y <= 0 :
    playerDirection === 'left' ? playerBounds.x <= 0 : (playerBounds.y + player.height) >= 512;
}

function playerShooting(e) {

  let bulletDirection;
  const cursorPositionX = e.x;
  const cursorPositionY = e.y;

  if (Math.abs(cursorPositionX - player.x) > Math.abs(cursorPositionY - player.y)) {
    bulletDirection = cursorPositionX > player.x ? 'right' : 'left';
  } else {
    bulletDirection = cursorPositionY > player.y ? 'down' : 'up';
  }

  const bullet = createGameElement('../images/tear.png', (player.x), (player.y));
  bullet.speed = bulletSpeed;
  bullet.direction = bulletDirection;

  bullets.push(bullet);
}

function updateBullets() {

  for ( let i = 0; i < bullets.length; i++) {
    //определение направления выстрела
    switch(bullets[i].direction) {
        case 'up' :
          bullets[i].position.y -= bullets[i].speed;
        break;
        case 'down' :
          bullets[i].position.y += bullets[i].speed;
        break;
        case 'left' :
          bullets[i].position.x -= bullets[i].speed;
        break;
        case 'right' :
          bullets[i].position.x += bullets[i].speed;
        break;
    }

    //удаление пуль
    if (bullets[i].position.y < 0 || bullets[i].position.y > 512 || bullets[i].position.x < 0 || bullets[i].position.x > 512 ) {
      bullets[i].dead = true;
      app.stage.removeChild(bullets[i]);
      bullets.splice(i,1);
    }
  }
}

app.ticker.add(() => {
    movePlayer();
    updateBullets();
  });

//const box = createGameElement('../images/box.png', (app.view.width / 4), (app.view.height / 4))
 export {
   app
  }