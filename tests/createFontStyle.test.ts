import createFontStyle from "../src/js/otherScripts/createFontStyle";

const fontSize: number = 40;
const fontFamily: string = "DRKrapka";
const fontWeight: string = "900";

const fontSize2: number = 80;
const fontFamily2: string = "Times New Roman";
const fontWeight2: string = "400";

describe("createFontStyle", () => {
    const res = createFontStyle(fontSize, fontFamily, fontWeight);
    it("should return object", () => {
        expect(res).toBeDefined();
        expect(res).toBeInstanceOf(Object);
    });
    it("returned object should have correct properties", () => {
        expect(res.hasOwnProperty("fontSize")).toBeTruthy();
        expect(res.hasOwnProperty("fontFamily")).toBeTruthy();
        expect(res.hasOwnProperty("fontWeight")).toBeTruthy();
    });
    it("returned object should have correct values", () => {
        expect(res.fontSize).toEqual(fontSize);
        expect(res.fontFamily).toEqual(fontFamily);
        expect(res.fontWeight).toEqual(fontWeight);
    });
    it("object return values must be arguments dependent", () => {
        const res2 = createFontStyle(fontSize2, fontFamily2, fontWeight2);
        expect(res2.fontSize !== res.fontSize).toBeTruthy();
        expect(res2.fontFamily !== res.fontFamily).toBeTruthy();
        expect(res2.fontWeight !== res.fontWeight).toBeTruthy();
    });
});
