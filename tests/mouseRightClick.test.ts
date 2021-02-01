import mouseDefault from "../src/js/Keyboard/mouseRightClick";

describe("Event mouseDefault", () => {
    const mouseLeftClick = new MouseEvent("click");
    const mouseRightClick = new MouseEvent("click", { button: 2 });
    it("should return void", () => {
        expect(mouseDefault(mouseLeftClick)).toBeUndefined();
    });
    it("should return true", () => {
        expect(mouseDefault(mouseRightClick)).toBeDefined();
        expect(mouseDefault(mouseRightClick)).toBeTruthy();
    });
});
