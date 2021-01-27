import "../styles.css";
import * as PIXI from "pixi.js";
import Menu from "./menu";

const app = new PIXI.Application({
    width: 800, //469
    height: 600, //312
    backgroundColor: 0xaaaaaa,
    antialias: true,
});
// const defaultIcon = "url('examples/assets/bunny.png'),auto";
// const hoverIcon = "url('examples/assets/bunny_saturated.png'),auto";

// app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
// app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;

setTimeout(Menu, 0);
document.body.appendChild(app.view);

export { app };
