import "../styles.css";
import * as PIXI from "pixi.js";
import { renderMenu } from "./otherScripts/menu";
import renderPreview from "./otherScripts/preview";
import { startGame } from "./Rooms/startGame";

let app: PIXI.Application;

let isFirstTime = true;

function getApp(isRun?: boolean) {
    if (app) {
        // app.ticker.destroy()
        app.ticker.stop();
        app.destroy(true, { children: true, texture: true, baseTexture: true });

        // document.body.removeChild(app.view)
    }
    app = new PIXI.Application({
        width: 800, //469
        height: 600, //312
        backgroundColor: 0x000000,
        antialias: true,
    });
    app.loader.add("isaac", "../assets/isaac_moving_table.json");

    // const defaultIcon = "url('examples/assets/bunny.png'),auto";
    // const hoverIcon = "url('examples/assets/bunny_saturated.png'),auto";

    // app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
    // app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;
    if (isFirstTime) renderPreview();
    else {
        isFirstTime = false;
        isRun ? startGame() : renderMenu();
    }
    document.body.appendChild(app.view);
}
getApp();
document.body.append("Need to load font");
document.body.style.height = `${window.innerHeight}px`;
window.onresize = () => (document.body.style.height = `${window.innerHeight}px`);

export { app, getApp };
