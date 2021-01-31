import { app } from "../script";
import pauseScreen from "../otherScripts/pauseScreen";

export default function (PlayerMethod: any /* player : any, box : any*/) {
    app.view.addEventListener("mousedown", (e) => mouseShooting(e, true));

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
            case 27:
                if (t) {
                    document.removeEventListener("keydown", keyDownShoot);
                    pauseScreen(true);
                } else {
                    document.addEventListener("keydown", keyDownShoot);
                    pauseScreen(false);
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
