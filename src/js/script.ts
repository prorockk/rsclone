import "../styles.css";
import * as PIXI from "pixi.js";
import { renderMenu } from "./otherScripts/menu";
import renderPreview from "./otherScripts/preview";
import { startGame } from "./Rooms/startGame";
import network from "./otherScripts/network";

let app: PIXI.Application;

let isFirstTime = true;

function getApp(isRun?: boolean) {
    if (app) {
        app.ticker.stop();
        app.destroy(true, { children: true, texture: true, baseTexture: true });
    }
    app = new PIXI.Application({
        width: 800, //469
        height: 600, //312
        backgroundColor: 0x1b1818,
        antialias: true,
    });
    PIXI.utils.clearTextureCache();
    app.loader.add("isaac", "../assets/sprite-sheets.json");

    const defaultIcon = "url('../images/cursor.png'),auto";
    app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
    app.renderer.plugins.interaction.cursorStyles.hover = defaultIcon;
    if (isFirstTime) {
        renderPreview();
        isFirstTime = false;
    } else {
        isRun ? startGame() : renderMenu();
    }
    document.body.appendChild(app.view);
}
// async function setJSON () {
//     const res: Response = await fetch("../src/js/Rooms/rooms.json");
//     const roomsArr: any = await res.json();
//     const lvlObj = { firstLvl: roomsArr }
//     network.create(lvlObj).then((f) => {
//         console.log(f);
//     });

// }

// setJSON()
getApp();
document.body.append("Need to load font");
document.body.style.height = `${window.innerHeight}px`;
window.onresize = () => (document.body.style.height = `${window.innerHeight}px`);

export { app, getApp };
