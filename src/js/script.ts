import "../styles.css";
import * as PIXI from "pixi.js";
import { renderMenu } from "./otherScripts/menu";

let app: PIXI.Application;

let is = true;

function getApp() {
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

    setTimeout(renderMenu, 500);
    document.body.appendChild(app.view);
}
getApp();

document.body.style.height = `${window.innerHeight}px`;
window.onresize = () => (document.body.style.height = `${window.innerHeight}px`);

export { app, getApp };
