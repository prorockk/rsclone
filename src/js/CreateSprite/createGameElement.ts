import * as PIXI from "pixi.js";
import { app } from "../script";
import { gameObjects } from "./GameObjects";
import { AnimateMobType } from "../types/Types";

class createElement {
    rooms: any;

    constructor(rooms?: any) {
        this.rooms = rooms;
    }

    createGameElement = (paramObj: any) => {
        const { coords, url, size, room } = paramObj;
        const [positionX, positionY]: number[] = coords;
        const [width, height]: number[] = size;
        const texture: PIXI.Texture = PIXI.Texture.from(url);
        const gameElement: any = PIXI.Sprite.from(texture);
        for (const key in paramObj) {
            gameElement[key] = paramObj[key];
        }
        gameElement.anchor.set(0.5);
        gameElement.x = positionX;
        gameElement.y = positionY;
        gameElement.width = width;
        gameElement.height = height;

        this.sendToObject(gameElement, room, url);

        return gameElement;
    };

    createAnimateElement = (animateObj: AnimateMobType) => {
        const Sheets: any = {};
        const { texture } = animateObj;
        for (const key in texture) {
            Sheets[key] = texture[key].map((element: string) => PIXI.Texture.from(element));
        }
        if (animateObj.setBool) return Sheets;
        animateObj.sheets = Sheets;
        const mobAr = this.addAnimateElement(animateObj);
        return [Sheets, ...mobAr];
    };

    addAnimateElement = (animateObj: any) => {
        const { propertiesAr, sheets, room, name } = animateObj;

        const mobAr = propertiesAr.map((property: any) => {
            const mob: any = new PIXI.AnimatedSprite(sheets[property.sheetSpriteStr]);
            mob.anchor.set(property.anchor);
            mob.x = property.x;
            mob.y = property.y;
            mob.sheetSpriteStr = property.sheetSpriteStr;
            mob.sheets = sheets;
            for (const key in property) {
                if (mob.hasOwnProperty(key) || key === "rotation") {
                    mob[key] = property[key];
                }
            }
            if (!this.rooms) {
                app.stage.addChild(mob);
            } else this.sendToObject(mob, room, name);
            return mob;
        });
        return mobAr;
    };

    sendToObject = (gameElement: any, room: string | number, url: string | number) => {
        this.rooms[room].addChild(gameElement);
        if (gameElement.hasOwnProperty("picture")) return;
        if (gameObjects[room].hasOwnProperty(url)) {
            gameObjects[room][url].push(gameElement);
        } else {
            gameObjects[room][url] = [gameElement];
        }
    };
}
export default createElement;
