import { app } from "../script";

export default function (PlayerMethod: any /* player : any, box : any*/): void {
    document.addEventListener("mousedown", (e) => mouseShooting(e, true));

    document.addEventListener("mouseup", (e) => mouseShooting(e, false));
    document.addEventListener("mousemove", (e) => mouseShooting(e, undefined));
    document.addEventListener("click", (e) => PlayerMethod.playerShooting.bind(PlayerMethod));

    document.addEventListener("keydown", (key) => {
        checkKeyCode(key);
    });
    document.addEventListener("keyup", (key) => {
        PlayerMethod.activeKeys[key.code] = false;
    });
    let t: boolean = true;
    function checkKeyCode(key: KeyboardEvent): void {
        const keyCode: number = key.keyCode;
        switch (keyCode) {
            case 27:
                t ? app.ticker.stop() : app.ticker.start();
                t = !t;
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
