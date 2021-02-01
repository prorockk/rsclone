interface styleInterface {
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
}

export default function createFontStyle(fontSize: number, fontFamily: string, fontWeight: string): styleInterface {
    const style: styleInterface = {
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
    };
    return style;
}
