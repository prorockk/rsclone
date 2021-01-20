import * as PIXI from "pixi.js";
import { currentRoom } from "../Rooms/startGame";
import { app } from "../script";
import { AnimateMobType } from "../types/Types";
import createElement from "./createGameElement";

const createAnimateElement = (animateObj: AnimateMobType) => {
    const Sheets: any = {};
    const { texture, propertiesAr } = animateObj;
    for (const key in texture) {
        Sheets[key] = texture[key].map((element: string) => {
            return PIXI.Texture.from(element);
        });
    }
    if (animateObj.setBool) return Sheets;
    const mobAr = addAnimateElement(Sheets, propertiesAr);
    return [Sheets, ...mobAr];
};
const addAnimateElement = (Sheets: { [x: string]: PIXI.Texture[] }, propertiesAr: any[]) => {
    return propertiesAr.map((property: any) => {
        const mob: any = new PIXI.AnimatedSprite(Sheets[property.sheetSpriteStr]);
        mob.anchor.set(property.anchor);
        mob.x = property.x;
        mob.y = property.y;

        for (const key in property) {
            if (mob.hasOwnProperty(key)) {
                mob[key] = property[key];
            }
        }
        app.stage.addChild(mob);
        mob.play();
        return mob;
    });
};

export { createAnimateElement, addAnimateElement };
