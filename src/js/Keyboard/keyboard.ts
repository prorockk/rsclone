export default function (PlayerMethod: any /* player : any, box : any*/) {
    //console.log(PlayerMethod);

    // console.log(checkTexture(player.player, box));

    document.addEventListener("pointerdown", PlayerMethod.playerShooting.bind(PlayerMethod));

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
}
