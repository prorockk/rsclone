import * as PIXI from "pixi.js";
import { app } from "./script";
import { startGame } from "./Rooms/startGame";

export default function renderMenu() {
    const backgroundMenu = PIXI.Sprite.from("./images/menuBack.png");
    backgroundMenu.width = 800;
    backgroundMenu.height = 600;
    app.stage.addChild(backgroundMenu);

    const style = new PIXI.TextStyle({
        fontSize: 40,
        fontFamily: "DRKrapka",
    });

    const newGame = new PIXI.Text("00 01 02 03 05", style);
    newGame.x = 200;
    newGame.y = 120;
    newGame.rotation = -0.1;
    newGame.interactive = true;
    newGame.buttonMode = true;
    newGame.on("mouseover", (e: any) => e.target.scale.set(1.1));
    newGame.on("mouseout", () => newGame.scale.set(1));
    newGame.on("click", () => {
        app.stage.removeChild(backgroundMenu);
        app.stage.removeChild(menuList);
        startGame();
    });

    const options = new PIXI.Text("OPTIONS", style);
    options.x = 215;
    options.y = 250;
    options.rotation = -0.1;
    options.interactive = true;
    options.buttonMode = true;
    options.on("mouseover", (e: any) => e.target.scale.set(1.1));
    options.on("mouseout", () => options.scale.set(1));

    const stat = new PIXI.Text("STATS", style);
    stat.x = 225;
    stat.y = 370;
    stat.rotation = -0.1;
    stat.interactive = true;
    stat.buttonMode = true;
    stat.on("mouseover", (e: any) => e.target.scale.set(1.1));
    stat.on("mouseout", () => stat.scale.set(1));

    const exit = new PIXI.Text("X", style);
    exit.x = 525;
    exit.y = 420;
    exit.rotation = -0.1;
    exit.interactive = true;
    exit.buttonMode = true;
    exit.on("mouseover", (e: any) => e.target.scale.set(1.1));
    exit.on("mouseout", () => exit.scale.set(1));
    exit.on("click", () => window.close());
    const menuList = new PIXI.Container();
    menuList.addChild(newGame);
    menuList.addChild(options);
    menuList.addChild(stat);
    menuList.addChild(exit);

    app.stage.addChild(menuList);
    // app.stage.removeChild(menuList);
}
