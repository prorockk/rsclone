import * as PIXI from "pixi.js";
import TextInput from "pixi-textinput-v5";
import { app } from "../script";
import { soundGame } from "./sound";
import { renderMenu } from "../otherScripts/menu";
import * as storage from "./storage";
import * as user from "./login";
import { mainCounter } from "../Rooms/startGame";
import { findUser } from "./login";

export default function renderPreview() {
    const setSpriteOptions = (url: string, width: number, height: number, x?: number, y?: number) => {
        const sprite = PIXI.Sprite.from(url);
        sprite.width = width;
        sprite.height = height;
        if (x && y) {
            sprite.x = x;
            sprite.y = y;
        }
        return sprite;
    };
    const backgroundPreview: PIXI.Sprite = setSpriteOptions("./images/previewBackground.png", 800, 600);
    const shadow: PIXI.Sprite = setSpriteOptions("./assets/menuoverlay.png", 800, 600);

    const logo: PIXI.Sprite = setSpriteOptions("./images/logo.png", 660, 150, 80, 30);

    const button: PIXI.Sprite = setSpriteOptions("./assets/controloverlay.png", 150, 150, 800, 600);
    button.anchor.set(1, 1);
    button.interactive = true;
    button.buttonMode = true;

    let isaacArray = [
        PIXI.Texture.from("./images/filespotlight1.png"),
        PIXI.Texture.from("./images/filespotlight2.png"),
    ];
    let animatedIsaac = new PIXI.AnimatedSprite(isaacArray);
    animatedIsaac.animationSpeed = 0.08;
    animatedIsaac.width = 300;
    animatedIsaac.height = 300;
    animatedIsaac.x = 250;
    animatedIsaac.y = 150;

    const previewArray = [backgroundPreview, animatedIsaac, logo, shadow, button];

    button.on("click", () => {
        console.log(input.value);

        if (input.value.length > 0 && input.value.length < 10 && !input.value.match(/[^*\S]/gi)) {
            animatedIsaac.play();
            document.body.removeChild(input);
            app.stage.removeChild(button);
            getCurrentUser();
        }
    });
    button.on("mouseover", () => {
        button.scale.set(1.05);
        soundGame("select");
    });
    button.on("mouseout", () => {
        button.scale.set(1);
        soundGame("unselect");
    });
    async function getCurrentUser() {
        mainCounter.user = await findUser(input.value);
        renderMenu();
        app.stage.removeChild(...previewArray);
    }
    const userName = user.login();
    const input: HTMLInputElement = document.createElement("input");
    input.value = userName;
    document.body.appendChild(input);
    app.stage.addChild(...previewArray);
    soundGame("menuMusic");
    app.ticker.start();
}
