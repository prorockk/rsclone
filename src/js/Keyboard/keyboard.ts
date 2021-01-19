export default function (PlayerMethod: any /* player : any, box : any*/) {
    document.addEventListener("mousedown", (e) => mouseShooting(e, true));

    document.addEventListener("mouseup", (e) => mouseShooting(e, false));
    document.addEventListener("mousemove", (e) => mouseShooting(e, undefined));
    document.addEventListener("click", PlayerMethod.playerShooting.bind(PlayerMethod));

    document.addEventListener("keydown", (key) => {
        checkKeyCode(key.keyCode);
    });
    document.addEventListener("keyup", (key) => {
        PlayerMethod.activeKeys[key.keyCode] = false;
    });

    function checkKeyCode(keyCode: number) {
        switch (keyCode) {
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
                PlayerMethod.activeKeys[keyCode] = true;
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
            intMouse = setInterval(PlayerMethod.playerShooting.bind(PlayerMethod, delay), 150);
            return;
        }
        mouseDown
            ? (intMouse = setInterval(PlayerMethod.playerShooting.bind(PlayerMethod, delay), 220))
            : clearInterval(intMouse);
    }
}
