import {app} from "../script.js" //еще пригодится


class createAnimateElement{
    constructor (url) {
        this.element;
        this.url = url;
    }
    createPlayerSheets(w = 30, h = 36) {
        const sSheets = new PIXI.BaseTexture.from(this.url);
        // const pixiLoadTexture = (moveX, moveY = 0) => {
        //     // сделать аргументом объект, пушить значения в массив
        //     return [
        //     new PIXI.Texture(sSheets, new PIXI.Rectangle(moveX*w, moveY*h, w, h)),
        //     new PIXI.Texture(sSheets, new PIXI.Rectangle(moveX*w, moveY*h, w, h)),
        //     new PIXI.Texture(sSheets, new PIXI.Rectangle(moveX*w, moveY*h, w, h))
        //     ]
        // }
        const playerSheets = {};
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
        return playerSheets
    }
    //тут должна быть createAnimateSprite, но всеравно пробуем передлать
    // на реакт, а там она будет совсем другая, и этого класса наверно тоже не будет
}
 export default createAnimateElement