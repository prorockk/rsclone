import { player } from "../Rooms/startGame";
import { app } from "../script";

export default function (PlayerMethod: any /* player : any, box : any*/) {
    document.addEventListener("mousedown", (e) => {
        if (!mouseDefault(e)) mouseShooting(e, true);
    });

    document.addEventListener("mouseup", (e) => {
        if (!mouseDefault(e)) mouseShooting(e, false);
    });
    document.addEventListener("mousemove", (e) => mouseShooting(e, undefined));
    document.addEventListener("click", (e) => PlayerMethod.playerShooting.bind(PlayerMethod));

    function mouseDefault(event: MouseEvent) {
        if (event.button === 2) {
            console.log("Type this for GodMode: BAGUVIX");
            event.preventDefault();
            return true;
        }
    }

    document.addEventListener("keydown", (key) => {
        checkKeyCode(key);
    });
    let godMode = false;
    let pass: string = "";
    document.addEventListener("keyup", (key) => {
        if (key.code === "KeyB") godMode = true;
        if (godMode) pass += key.code.slice(3, 4);
        if (pass.length === 7) {
            godMode = false;
            console.log(pass);
            if (pass === "BAGUVIX") player.godMode = true;
            pass = "";
        }
        PlayerMethod.activeKeys[key.code] = false;
    });
    let t = true;
    function checkKeyCode(key: KeyboardEvent) {
        if (key.keyCode === 27) {
            t ? app.ticker.stop() : app.ticker.start();
            t = !t;
        }
        PlayerMethod.activeKeys[key.code] = true;
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
