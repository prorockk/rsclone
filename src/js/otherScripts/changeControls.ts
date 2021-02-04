/* eslint-disable import/no-cycle */
import * as storage from "./storage";

interface MoveControlsInterface {
    [direction: string]: any;
}

const moveControls: MoveControlsInterface = {
    up: storage.get("up") || "KeyW",
    left: storage.get("left") || "KeyA",
    right: storage.get("right") || "KeyD",
    down: storage.get("down") || "KeyS",
};
for (const name in moveControls) {
    storage.set(`${name}`, `${moveControls[name]}`);
}

function changeControls(direction: string, value: string): void {
    moveControls[direction] = value;
    storage.set(`${direction}`, `${value}`);
}

export { moveControls, changeControls };
