import { AnimateMobType } from "../types/Types";
import createElement from "./createGameElement";

const tearsSheets = () => {
    const animate: any = {
        name: "bullet",
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
                anchor: 0.5,
                animationSpeed: 0.6,
                loop: false,
                width: 13,
                height: 13,
                x: 0,
                y: 0,
            },
        ],
        setBool: true,
    };
    const sheets = new createElement().createAnimateElement(animate);
    animate.sheets = sheets;
    return animate;
};
export default tearsSheets;
