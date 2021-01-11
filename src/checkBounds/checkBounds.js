

function checkBoundsConstructor(gameMember) {
    const player = gameMember;

    return function checkBounds(playerDirection) {
        const playerBounds = player.getBounds();
        //добавить параметры для внутренних препятсвий
        return playerDirection === 'right' ? (playerBounds.x + player.width) >= 512 :
            playerDirection === 'down' ? playerBounds.y <= 0 :
                playerDirection === 'left' ? playerBounds.x <= 0 : (playerBounds.y + player.height) >= 512;
    }
}
export default checkBoundsConstructor;