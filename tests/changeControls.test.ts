import { changeControls, moveControls } from "../src/js/otherScripts/changeControls";

const direction = "up";
const value = "KeyU";
const anotherDirection = "left";
const anotherValue = "KeyK";
const defaultValue = "KeyA";

describe("changeControls", () => {
    it("should return undefined", () => {
        expect(changeControls(direction, value)).toBeUndefined();
    });
    it("should change moveControls", () => {
        expect(moveControls[anotherDirection]).toEqual(defaultValue);
        changeControls(anotherDirection, anotherValue);
        expect(moveControls[anotherDirection]).toEqual(anotherValue);
    });
    it("should save values to localStorage", () => {
        expect(window.localStorage.getItem(anotherDirection)).toEqual(expect.any(String));
        expect(window.localStorage.getItem(anotherDirection)).toEqual(`\"${anotherValue}\"`);
    });
});
