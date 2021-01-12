import * as PIXI from "pixi.js";
import { stringify } from "querystring";
import { app } from "../script"; //еще пригодится

class createAnimateElement {
    [x: string]: any;
    constructor(resources: any) {
        this.element;
        this.resources = resources;
    }
    createPlayerSheets(w = 30, h = 36) {
        // const sSheets = new PIXI.BaseTexture.from(app.loader.resources['isaac'].textures);
        // const pixiLoadTexture = (moveX, moveY = 0) => {
        //     // сделать аргументом объект, пушить значения в массив
        //     return [
        //     new PIXI.Texture(sSheets, new PIXI.Rectangle(moveX*w, moveY*h, w, h)),
        //     new PIXI.Texture(sSheets, new PIXI.Rectangle(moveX*w, moveY*h, w, h)),
        //     new PIXI.Texture(sSheets, new PIXI.Rectangle(moveX*w, moveY*h, w, h))
        //     ]
        // }
        const playerSheets: any = {};
        const { textures } = app.loader.resources["isaac"];
        playerSheets["walkDown"] = [
            PIXI.Texture.from("isaac_moving_table-9.png"),
            PIXI.Texture.from("isaac_moving_table-11.png"),
            PIXI.Texture.from("isaac_moving_table-10.png"),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(11*w, 0, w, h)),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(10*w, 0, w, h)),
        ];
        playerSheets["walkLeft"] = [
            PIXI.Texture.from("isaac_moving_table-3.png"),
            PIXI.Texture.from("isaac_moving_table-5.png"),
            PIXI.Texture.from("isaac_moving_table-4.png"),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(3*w, 0, w, h)),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(5*w, 0, w, h)),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(4*w, 0, w, h)),
        ];
        playerSheets["walkRight"] = [
            PIXI.Texture.from("isaac_moving_table-6.png"),
            PIXI.Texture.from("isaac_moving_table-8.png"),
            PIXI.Texture.from("isaac_moving_table-7.png"),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(6*w, 0, w, h)),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(8*w, 0, w, h)),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(7*w, 0, w, h)),
        ];
        playerSheets["walkUp"] = [
            PIXI.Texture.from("isaac_moving_table-0.png"),
            PIXI.Texture.from("isaac_moving_table-2.png"),
            PIXI.Texture.from("isaac_moving_table-1.png"),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(0*w, 0, w, h)),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(2*w, 0, w, h)),
            // new PIXI.Texture(sSheets, new PIXI.Rectangle(1*w, 0, w, h)),
        ];
        return playerSheets;
    }
    //тут должна быть createAnimateSprite, но всеравно пробуем передлать
    // на реакт, а там она будет совсем другая, и этого класса наверно тоже не будет
}
export default createAnimateElement;
