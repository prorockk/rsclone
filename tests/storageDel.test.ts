import { del } from "../src/js/otherScripts/storage";

const name = "Name";
const vale = "Vale";
const name2 = "Name2";
const vale2 = 2;
const anyName = "undefined Name";

window.localStorage.setItem(name, JSON.stringify(vale));
window.localStorage.setItem(name2, JSON.stringify(vale2));

describe("del window localStorage", () => {
    it("should return void", () => {
        expect(del(anyName)).toBeUndefined();
        expect(del(name)).toBeUndefined();
    });
    it("should delete item", () => {
        expect(window.localStorage.getItem(name2)).toBeDefined();
        expect(Number(window.localStorage.getItem(name2))).toEqual(vale2);

        expect(del(name2)).toBeUndefined();

        expect(window.localStorage.getItem(name2)).toEqual(null);
    });
});
