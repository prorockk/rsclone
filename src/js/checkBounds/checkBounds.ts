//import checkTexture from './checkTexture';
function checkBoundsConstructor(gameMember: any) {
    const player = gameMember;

    return function checkBounds(playerDirection: string) {
        const playerBounds = player.getBounds();
        //добавить параметры для внутренних препятсвий
        return playerDirection === "right"
            ? playerBounds.x + player.width >= 465
            : playerDirection === "down"
            ? playerBounds.y + player.height >= 430
            : playerDirection === "left"
            ? playerBounds.x <= 50
            : playerBounds.y <= 60;
    };
}
export default checkBoundsConstructor;
