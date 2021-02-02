import { player } from "../Rooms/startGame";
import { app } from "../script";
import mouseDefault from "./mouseRightClick";
import { renderPause } from "../otherScripts/pauseScreen";

export default function (PlayerMethod: any /* player : any, box : any*/) {
    app.view.onmousedown = (e: MouseEvent) => {
        if (!mouseDefault(e)) mouseShooting(e, true);
    };

    app.view.addEventListener("mouseup", (e: MouseEvent) => {
        if (!mouseDefault(e)) mouseShooting(e, false);
    });
    app.view.addEventListener("mousemove", (e: MouseEvent) => mouseShooting(e, undefined));
    app.view.addEventListener("click", (e: MouseEvent) => PlayerMethod.playerShooting.bind(PlayerMethod));
    const keyDownShoot: any = (key: KeyboardEvent) => {
        checkKeyCode(key);
    };
    document.addEventListener("keydown", keyDownShoot);

    let godMode = false;
    let pass: string = "";
    document.addEventListener("keyup", (key) => {
        if (key.code === "KeyB") godMode = true;
        if (godMode) pass += key.code.slice(3, 4);
        if (!"BAGUVIX".match(new RegExp(pass))) pass = "";
        if (pass.length === 7) {
            godMode = false;
            if (pass === "BAGUVIX") player.godMode = true;
            pass = "";
        }
        PlayerMethod.activeKeys[key.code] = false;
    });
    let t: boolean = true;
    function checkKeyCode(key: KeyboardEvent) {
        let keyCode = key.code;
        switch (keyCode) {
            case "deleteEvent":
                document.removeEventListener("keydown", keyDownShoot);
                break;
            case "Escape":
                if (t) {
                    app.view.onmousedown = null;
                    renderPause(true);
                } else {
                    app.view.onmousedown = (e: MouseEvent) => mouseShooting(e, true);
                    renderPause(false);
                }
                t = !t;
                break;
        }
        PlayerMethod.activeKeys[key.code] = true;
    }

    let intMouse: any;
    let mouseDown: boolean;
    //let delayAr: number[];
    function mouseShooting(delay: MouseEvent, bool: boolean | undefined): void {
        if (bool !== undefined) {
            mouseDown = bool;
        } else if (mouseDown) {
            clearInterval(intMouse);
            PlayerMethod.playerShooting.call(PlayerMethod, delay);
            intMouse = setInterval(PlayerMethod.playerShooting.bind(PlayerMethod, delay), 130);
            return;
        }
        mouseDown
            ? (intMouse = setInterval(PlayerMethod.playerShooting.bind(PlayerMethod, delay), 220))
            : clearInterval(intMouse);
    }
}
