import * as PIXI from "pixi.js";
import { app } from "../script";
import { soundGame } from "./sound";
import { renderMenu } from "../otherScripts/menu";
import * as user from "./login";
import { mainCounter } from "../Rooms/startGame";
import { findUser } from "./login";
import { setParamsToPixiElem } from "./setParamsToPixiElem";

export default function renderPreview(): void {
    const backgroundPreview: PIXI.Sprite = PIXI.Sprite.from("./images/previewBackground.png");
    setParamsToPixiElem(backgroundPreview, 0, 0, 0, false, false, 800, 600);

    const shadow: PIXI.Sprite = PIXI.Sprite.from("./assets/menuoverlay.png");
    setParamsToPixiElem(shadow, 0, 0, 0, false, false, 800, 600);

    const logo: PIXI.Sprite = PIXI.Sprite.from("./images/logo.png");
    setParamsToPixiElem(logo, 80, 30, 0, false, false, 660, 150);

    const button: PIXI.Sprite = PIXI.Sprite.from("./assets/controloverlay.png");
    setParamsToPixiElem(button, 800, 600, 0, true, true, 150, 150);

    button.anchor.set(1, 1);

    let isaacArray: PIXI.Texture[] = [
        PIXI.Texture.from("./images/filespotlight1.png"),
        PIXI.Texture.from("./images/filespotlight2.png"),
    ];
    let animatedIsaac: PIXI.AnimatedSprite = new PIXI.AnimatedSprite(isaacArray);
    animatedIsaac.animationSpeed = 0.08;
    setParamsToPixiElem(animatedIsaac, 250, 150, 0, false, false, 300, 300);

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
    async function getCurrentUser(): Promise<void> {
        mainCounter.user = await findUser(input.value);
        renderMenu();
        app.stage.removeChild(...previewArray);
    }
    const userName: string = user.login();
    const input: HTMLInputElement = document.createElement("input");
    input.value = userName;
    document.body.appendChild(input);
    app.stage.addChild(...previewArray);
    soundGame("menuMusic");
    app.ticker.start();
}
