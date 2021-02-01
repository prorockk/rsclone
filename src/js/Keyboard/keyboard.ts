import { app } from "../script";
import { renderPause, closePause } from "../otherScripts/pauseScreen";

export default function (PlayerMethod: any /* player : any, box : any*/) {
    app.view.onmousedown = (e) => mouseShooting(e, true);

    app.view.addEventListener("mouseup", (e) => mouseShooting(e, false));
    app.view.addEventListener("mousemove", (e) => mouseShooting(e, undefined));
    app.view.addEventListener("click", (e) => PlayerMethod.playerShooting.bind(PlayerMethod));
    const keyDownShoot: any = (key: KeyboardEvent) => {
        checkKeyCode(key);
    };
    document.addEventListener("keydown", keyDownShoot);

    document.addEventListener("keyup", (key) => {
        PlayerMethod.activeKeys[key.code] = false;
    });
    let t = true;
    function checkKeyCode(key: KeyboardEvent) {
        let keyCode = key.keyCode;
        switch (keyCode) {
            case 0:
                document.removeEventListener("keydown", keyDownShoot);
                break;
            case 27:
                if (app.ticker.started && !t) t = !t;
                if (t) {
                    app.view.onmousedown = null;
                    // document.removeEventListener("keydown", keyDownShoot);
                    // document.addEventListener('keydown', closePause)
                    renderPause(true);
                } else {
                    app.view.onmousedown = (e) => mouseShooting(e, true);
                    // document.removeEventListener('keydown', closePause)
                    renderPause(false);
                    // document.addEventListener("keydown", keyDownShoot);
                }
                t = !t;
                break;
            case 40:
                PlayerMethod.playerShooting.call(PlayerMethod, "down");
                break;
            case 39:
                PlayerMethod.playerShooting.call(PlayerMethod, "right");
                break;
            case 38:
                PlayerMethod.playerShooting.call(PlayerMethod, "up");
                break;
            case 37:
                PlayerMethod.playerShooting.call(PlayerMethod, "left");
                break;
            default:
                PlayerMethod.activeKeys[key.code] = true;
                break;
        }
    }
    let intMouse: any;
    let mouseDown: any;
    let delayAr: number[];
    function mouseShooting(delay: MouseEvent, bool: boolean | undefined) {
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
