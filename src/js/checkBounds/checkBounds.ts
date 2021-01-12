function checkBoundsConstructor(gameMember: any) {
    const player = gameMember;

    return function checkBounds(playerDirection: string) {
        const playerBounds = player.getBounds();
        //добавить параметры для внутренних препятсвий
        return playerDirection === "right"
            ? playerBounds.x + player.width >= 512
            : playerDirection === "down"
            ? playerBounds.y <= 0
            : playerDirection === "left"
            ? playerBounds.x <= 0
            : playerBounds.y + player.height >= 512;
    };
}
export default checkBoundsConstructor;
