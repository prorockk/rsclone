import { moveTo } from "../Rooms/startGame";

const objectOfGameObjects: any = {
    inFirstRoom: {
        toUpperRoom: () => moveTo("inSecondRoom"),
    },
    inSecondRoom: {
        toUpperRoom: () => moveTo("inSeventhRoom"),
        toLeftRoom: () => moveTo("inFifthRoom"),
        toRightRoom: () => moveTo("inThirdRoom"),
        toBottomRoom: () => moveTo("inFirstRoom"),
    },
    inThirdRoom: {
        toLeftRoom: () => moveTo("inSecondRoom"),
        toRightRoom: () => moveTo("inFourthRoom"),
    },
    inFourthRoom: {
        toLeftRoom: () => moveTo("inThirdRoom"),
    },
    inFifthRoom: {
        toRightRoom: () => moveTo("inSecondRoom"),
        toLeftRoom: () => moveTo("inSixthRoom"),
    },
    inSixthRoom: {
        toRightRoom: () => moveTo("inFifthRoom"),
    },
    inSeventhRoom: {
        toBottomRoom: () => moveTo("inSecondRoom"),
        toUpperRoom: () => moveTo("inEighthRoom"),
    },
    inEighthRoom: {
        toLeftRoom: () => moveTo("inNinthRoom"),
        toBottomRoom: () => moveTo("inSeventhRoom"),
    },
    inNinthRoom: {
        toLeftRoom: () => moveTo("inTenthRoom"),
        toRightRoom: () => moveTo("inEighthRoom"),
    },
    inTenthRoom: {
        toRightRoom: () => moveTo("inNinthRoom"),
    },
};
export { objectOfGameObjects };
