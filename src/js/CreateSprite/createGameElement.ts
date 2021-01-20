import * as PIXI from "pixi.js";
import { app } from "../script";
import { objectOfGameObjects } from "./objectOfGameObjects";

class createElement {
    rooms: any;
    constructor(rooms: any) {
        this.rooms = rooms;
    }
    createGameElement = (paramObj: any) => {
        const { coords, url, size, room } = paramObj;
        let [positionX, positionY] = coords;
        let [width, height] = size;
        positionX =
            positionX < 10
                ? app.view.width / positionX
                : positionX ** 2 === 60025
                ? app.view.width + positionX
                : positionX;
        positionY =
            positionY < 10
                ? app.view.height / positionY
                : positionY ** 2 === 60025
                ? app.view.height + positionY
                : positionY;
        width = width === 0 ? app.view.width : width < 2 ? app.view.width / width : width;
        //сделать тут проверку url на массив, для разрушающихся камней
        const texture: any = PIXI.Texture.from(url);
        const gameElement: any = PIXI.Sprite.from(texture);
        for (let key in paramObj) {
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
    createAnimateElement = (animateObj: any) => {
        const Sheets: any = {};
        const { texture } = animateObj;
        for (const key in texture) {
            Sheets[key] = texture[key].map((element: string) => {
                return PIXI.Texture.from(element);
            });
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
            mob.sheets = sheets;
            for (const key in property) {
                if (mob.hasOwnProperty(key)) {
                    mob[key] = property[key];
                }
            }
            this.sendToObject(mob, room, name);
            return mob;
        });
        return mobAr;
    };
    sendToObject = (gameElement: any, room: string | number, url: string | number) => {
        this.rooms[room].addChild(gameElement);

        if (objectOfGameObjects[room].hasOwnProperty(url)) {
            objectOfGameObjects[room][url].push(gameElement);
        } else {
            objectOfGameObjects[room][url] = [gameElement];
        }
    };
}
export default createElement;
