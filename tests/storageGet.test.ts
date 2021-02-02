import { get } from "../src/js/otherScripts/storage";

const definedName = "definedName";
const definedVale = "definedVale";
const undefinedName = "any name";

window.localStorage.setItem(definedName, JSON.stringify(definedVale));

describe("get window localStorage", () => {
    it("should return to be defined", () => {
        expect(get(undefinedName)).toBeDefined();
        expect(get(definedName)).toBeDefined();
    });
    it("should return value or null", () => {
        expect(get(undefinedName)).toEqual(null);
        expect(get(definedName)).toEqual(definedVale);
    });
});
