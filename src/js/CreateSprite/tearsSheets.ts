import { AnimateMobType } from "../types/Types";
import { createAnimateElement } from "./createAnimateSheets";

const tearsSheets = () => {
    const animate: AnimateMobType = {
        texture: {
            shot: ["tear_pop-0.png"],
            death: [
                "tear_pop-1.png",
                "tear_pop-2.png",
                "tear_pop-3.png",
                "tear_pop-4.png",
                "tear_pop-5.png",
                "tear_pop-6.png",
                "tear_pop-7.png",
                "tear_pop-8.png",
            ],
        },
        propertiesAr: [
            {
                sheetSpriteStr: "shot",
                anchor: { set: 0.5 },
                animationSpeed: 0.6,
                loop: false,
                width: 13,
                height: 13,
            },
        ],
        setBool: true,
    };
    const sheets = createAnimateElement(animate);
    return [sheets, animate];
};
export default tearsSheets;
