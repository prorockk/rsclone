import { setParamsToPixiElem, exemplaryPixiItem } from "../src/js/otherScripts/setParamsToPixiElem";

const startX: number = 5;
const startY: number = 5;
const startRotation: number = 1;
const startInteractive: boolean = false;
const startButtonMode: boolean = false;
const startWidth: number = 10;
const startHeight: number = 5;

const newX: number = 15;
const newY: number = 15;
const newRotation: number = -1;
const newInteractive: boolean = true;
const newButtonMode: boolean = true;
const newWidth: number = 100;
const newHeight: number = 50;

const pixiItem: exemplaryPixiItem = {
    x: 5,
    y: 10,
    rotation: 1,
    interactive: true,
    buttonMode: true,
    width: 20,
    height: 30,
};

const pixiItem2: exemplaryPixiItem = {
    x: startX,
    y: startY,
    rotation: startRotation,
    interactive: startInteractive,
    buttonMode: startButtonMode,
    width: startWidth,
    height: startHeight,
};

describe("createFontStyle", () => {
    it("should return void", () => {
        expect(setParamsToPixiElem(pixiItem, 20, 20, -0.1, true, true, 50, 50)).toBeUndefined();
    });
    it("should change objects values", () => {
        expect(pixiItem2.x).toEqual(startX);
        expect(pixiItem2.y).toEqual(startY);
        expect(pixiItem2.rotation).toEqual(startRotation);

        setParamsToPixiElem(pixiItem2, newX, newY, newRotation, newInteractive, newButtonMode, newWidth, newHeight);

        expect(pixiItem2.x !== startX).toBeTruthy;
        expect(pixiItem2.y !== startY).toBeTruthy;
        expect(pixiItem2.rotation !== startRotation).toBeTruthy;
    });
    it("should be work with different number of arguments", () => {
        expect(setParamsToPixiElem(pixiItem, 40, 40, -0.4, true, true)).toBeUndefined();
        expect(setParamsToPixiElem(pixiItem, 70, 70, -0.7, false, false, 70, 70)).toBeUndefined();
    });
});
