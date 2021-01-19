import { moveTo } from "../Rooms/startGame";

const objectOfGameObjects: any = {
    inFirstRoom: {
        toUpperRoom: () => moveTo("inSecondRoom"),
    },
    inSecondRoom: {
        toUpperRoom: () => moveTo("inSixthRoom"),
        toLeftRoom: () => moveTo("inFourthRoom"),
        toRightRoom: () => moveTo("inThirdRoom"),
        toBottomRoom: () => moveTo("inFirstRoom"),
    },
    inThirdRoom: {
        toLeftRoom: () => moveTo("inSecondRoom"),
    },
    inFourthRoom: {
        toRightRoom: () => moveTo("inSecondRoom"),
    },
    inFifthRoom: {
        toRightRoom: () => moveTo("inSixthRoom"),
    },
    inSixthRoom: {
        toUpperRoom: () => moveTo("inSeventhRoom"),
        toLeftRoom: () => moveTo("inFifthRoom"),
        toBottomRoom: () => moveTo("inSecondRoom"),
    },
    inSeventhRoom: {
        toBottomRoom: () => moveTo("inSixthRoom"),
    },
};
export { objectOfGameObjects };
