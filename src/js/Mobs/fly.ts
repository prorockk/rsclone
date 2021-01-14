import * as PIXI from "pixi.js";
import { app } from "../script";
import {createAnimateElement} from "../CreateSprite/createAnimateSheets";
import checkBounds from "../checkBounds/checkBounds";
import {AnimateMobType} from "../types/Types";

class Fly {
    [x: string]: {};
    constructor () {
        this.flySheets = {};
        this.flyOne = {};
        this.flyTwo= {};
    }
    init(){
        return [this.flyOne, this.flyTwo]
    }
    doneLoading() {
        const animate: AnimateMobType = {
            texture:{
            "fly": [
                "fly1-1.png",
                "fly1-2.png"
            ],
            "death": [
                "fly-death1.png",
                "fly-death2.png",
                "fly-death3.png",
                "fly-death4.png",
                "fly-death5.png"
            ]},
            propertiesAr: [{
                sheetSpriteStr: 'fly',
                anchor: {set: 0.5},
                animationSpeed: 0.4,
                loop: true,
                x:app.view.width / 4,
                y:app.view.height / 4
            },
            {
             sheetSpriteStr: 'fly',
                anchor: {set: 0.5},
                animationSpeed: 0.4,
                loop: true,
                x:app.view.width / 1.5,
                y:app.view.height / 1.5
            }]
        };
        const [sheets, flyOne, flyTwo] = createAnimateElement(animate);
        this.flySheets = sheets;
        this.flyOne = flyOne;
        this.flyTwo = flyTwo
    }

}

export default Fly