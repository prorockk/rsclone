import { set } from "../src/js/otherScripts/storage";
const name1 = "Hello";
const value1 = "World";
const name2 = "Hi";
const value2 = 1;

describe("set window localStorage", () => {
    it("should return void", () => {
        expect(set(name1, value1)).toBeUndefined();
        expect(set(name2, value2)).toBeUndefined();
    });
    it("should set localStorage params", () => {
        expect(window.localStorage.getItem(name1)).toBeDefined();
        expect(window.localStorage.getItem(name2)).toBeDefined();
        expect(window.localStorage.getItem(name1)).toEqual(expect.any(String));
        expect(Number(window.localStorage.getItem(name2))).toEqual(value2);
    });
});
