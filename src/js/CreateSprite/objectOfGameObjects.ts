import { moveTo } from "../Rooms/startGame";

let objectOfGameObjects: any;
function createObjectOfGameObjects(): void {
    objectOfGameObjects = {
        inFirstRoom: {
            toUpperRoom: (): void => moveTo("inSecondRoom"),
        },
        inSecondRoom: {
            toUpperRoom: (): void => moveTo("inSeventhRoom"),
            toLeftRoom: (): void => moveTo("inFifthRoom"),
            toRightRoom: (): void => moveTo("inThirdRoom"),
            toBottomRoom: (): void => moveTo("inFirstRoom"),
        },
        inThirdRoom: {
            toLeftRoom: (): void => moveTo("inSecondRoom"),
            toRightRoom: (): void => moveTo("inFourthRoom"),
        },
        inFourthRoom: {
            toLeftRoom: (): void => moveTo("inThirdRoom"),
        },
        inFifthRoom: {
            toRightRoom: (): void => moveTo("inSecondRoom"),
            toLeftRoom: (): void => moveTo("inSixthRoom"),
        },
        inSixthRoom: {
            toRightRoom: (): void => moveTo("inFifthRoom"),
        },
        inSeventhRoom: {
            toBottomRoom: (): void => moveTo("inSecondRoom"),
            toUpperRoom: (): void => moveTo("inEighthRoom"),
        },
        inEighthRoom: {
            toLeftRoom: (): void => moveTo("inNinthRoom"),
            toBottomRoom: (): void => moveTo("inSeventhRoom"),
        },
        inNinthRoom: {
            toLeftRoom: (): void => moveTo("inTenthRoom"),
            toRightRoom: (): void => moveTo("inEighthRoom"),
        },
        inTenthRoom: {
            toRightRoom: (): void => moveTo("inNinthRoom"),
        },
    };
}
export { objectOfGameObjects, createObjectOfGameObjects };
