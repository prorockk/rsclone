import * as PIXI from "pixi.js";
import { app } from "../script";
import { soundGame } from "./sound";
import { renderMenu } from "./menu";
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
    setParamsToPixiElem(logo, 400, 100, 0, false, false, 660, 150);
    logo.anchor.set(0.5);
    let countRotation: number = 5 * 10 ** -4;
    app.ticker.add(() => {
        logo.rotation += countRotation;
        countRotation = Math.abs(logo.rotation) > 0.01 ? countRotation * -1 : countRotation;
        logo.rotation %= 0.02;
    });

    const button: PIXI.Sprite = PIXI.Sprite.from("./assets/controloverlay.png");
    setParamsToPixiElem(button, 800, 600, 0, true, true, 150, 150);
    button.scale.set(1.1);
    button.anchor.set(1, 1);

    const isaacArray: PIXI.Texture[] = [
        PIXI.Texture.from("./images/filespotlight1.png"),
        PIXI.Texture.from("./images/filespotlight2.png"),
    ];
    const animatedIsaac = new PIXI.AnimatedSprite(isaacArray);
    animatedIsaac.animationSpeed = 0.08;
    setParamsToPixiElem(animatedIsaac, 250, 150, 0, false, false, 300, 300);

    const whoAmI: PIXI.Sprite = PIXI.Sprite.from("./images/whoAmI.png");
    setParamsToPixiElem(whoAmI, 250, 150, 0, false, false, 300, 300);

    const previewArray: any[] = [backgroundPreview, logo, shadow, button, whoAmI];

    const start = () => {
        if (input.value.length > 0 && input.value.length < 10 && input.value.match(/[A-Za-z0-9]/)) {
            app.stage.addChild(animatedIsaac);
            app.stage.removeChild(whoAmI);
            document.onkeypress = null;
            animatedIsaac.play();
            document.body.removeChild(input);
            app.stage.removeChild(button);
            getCurrentUser();
        } else {
            input.classList.add("invalid");
            setTimeout(() => {
                input.classList.remove("invalid");
            }, 3000);
        }
    };

    button.on("click", start);
    button.on("mouseover", () => {
        button.scale.set(1.05);
        soundGame("select");
    });
    button.on("mouseout", () => {
        button.scale.set(1);
        soundGame("unselect");
    });

    document.onkeypress = (e) => {
        if (e.code === "Space") start();
    };

    async function getCurrentUser() {
        mainCounter.user = await findUser(input.value);
        app.stage.removeChild(...previewArray);
        renderMenu();
    }
    const userName: string = user.login();
    const input: HTMLInputElement = document.createElement("input");
    input.value = userName;
    input.setAttribute("placeholder", "Enter your name");
    input.setAttribute("spellcheck", "false");

    const inputCurrentBottom: string = `${(window.innerHeight - 600) / 2 + 120}px`;
    input.style.bottom = inputCurrentBottom;
    document.body.appendChild(input);
    app.stage.addChild(...previewArray);
    soundGame("menuMusic");
    app.ticker.start();
}
