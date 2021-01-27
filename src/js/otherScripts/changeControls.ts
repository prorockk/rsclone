import * as storage from "./storage";
const moveControls: any = {
    up: storage.get('up') || 'KeyW',
    left: storage.get('left') || 'KeyD',
    right: storage.get('right') || 'KeyA',
    down: storage.get('down') || 'KeyS'
}
for (let name in moveControls) {
    storage.set(`${name}`, `${moveControls[name]}`)
}

function changeControls(direction: string, value: string) {
    console.log(moveControls);
    moveControls[direction] = value
    console.log(moveControls);
    storage.set(`${direction}`, `${value}`)
}

export {moveControls, changeControls}