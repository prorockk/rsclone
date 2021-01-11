import { app } from "../script.js";
import createAnimateSheets from "../CreateSprite/createAnimateSheets.js";
import checkBoundsConstructor from "../checkBounds/checkBounds.js";

class createPlayer {
    constructor () {
    this.playerSheets = {};
    this.playerSpeed = 3;
    this.activeKeys = {};
    this.player = {};
    }
    init() {
        app.loader.add('isaac', './images/isaac_moving_table.png'); //загрузка спрайта
        app.loader.load(this.doneLoading()); //спрайт загрузился

        window.addEventListener('keydown', (key) => {
            this.activeKeys[key.keyCode] = true;
          })

          window.addEventListener('keyup', (key) => {
            this.activeKeys[key.keyCode] = false;
          })

        return this.player;
    }
    doneLoading() {
        //createSheets...........
        this.playerSheets = new createAnimateSheets(app.loader.resources['isaac'].url).createPlayerSheets();
        //createPlayer...........
        this.player = new PIXI.AnimatedSprite(this.playerSheets.walkUp);
        this.player.anchor.set(0.5);
        this.player.animationSpeed = 0.2;
        this.player.loop = false;
        this.player.x = app.view.width / 2;
        this.player.y = app.view.height / 2;
        app.stage.addChild(this.player);

        this.player.play();
    }
    movePlayer() {
        const checkBounds = checkBoundsConstructor(this.player)
        const playerPlay = (direction) => {
                this.player.textures = this.playerSheets[`walk${direction}`];
                this.player.play();
        }
        if (this.activeKeys['39'] && !checkBounds('right')) {
          if (!this.player.playing) {
              playerPlay('Right')
          }
          this.player.x += this.playerSpeed
        }
        if (this.activeKeys['38'] && !checkBounds('down')) {
          if (!this.player.playing) {
            playerPlay('Down');
          }
          this.player.y -= this.playerSpeed
        }
        if (this.activeKeys['37'] && !checkBounds('left')) {
          if (!this.player.playing) {
            playerPlay('Left');
          }
          this.player.x -= this.playerSpeed
        }
        if (this.activeKeys['40'] && !checkBounds('top')) {
          if (!this.player.playing) {
            playerPlay('Up');
          }
          this.player.y += this.playerSpeed
        }
      }
}

export default createPlayer

