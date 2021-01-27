import "../styles.css";
import * as PIXI from "pixi.js";
import Menu from "./otherScripts/menu";

const app = new PIXI.Application({
    width: 800, //469
    height: 600, //312
    backgroundColor: 0xaaaaaa,
    antialias: true,
});

setTimeout(Menu, 500);
document.body.appendChild(app.view);

document.body.style.height = `${window.innerHeight}px`

export { app };
