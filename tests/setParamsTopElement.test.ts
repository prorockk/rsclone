import setParamsTopElement from "../src/js/topPanel/setParamsTopElement";

const startWidth = 2;
const startHeight = 4;
const startX = 2;
const startY = 4;

const el = {
    width: startWidth,
    height: startHeight,
    x: startX,
    y: startY,
};

describe("setParamsTopElement", () => {
    const newWidth = 20;
    const newHeight = 30;
    const newX = 5;
    const newY = 10;

    it("should return void", () => {
        expect(setParamsTopElement(el, newWidth, newHeight, newX, newY)).toBeUndefined();
    });
    it("should change object values", () => {
        expect(el.width).toBeDefined();

        expect(el.width === startWidth).toBeFalsy;
        expect(el.height === startHeight).toBeFalsy;
        expect(el.x === startY).toBeFalsy;
        expect(el.y === startX).toBeFalsy;

        expect(el.width).toEqual(newWidth);
        expect(el.height).toEqual(newHeight);
        expect(el.x).toEqual(newX);
        expect(el.y).toEqual(newY);
    });
});
