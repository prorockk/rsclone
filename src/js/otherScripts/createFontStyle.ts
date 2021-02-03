interface styleInterface {
    fontSize: number;
    fontFamily: string;
    fontWeight: string;
}

export default function createFontStyle(fontSize: number, fontFamily: string, fontWeight: string): styleInterface {
    const style: styleInterface = {
        fontSize,
        fontFamily,
        fontWeight,
    };
    return style;
}
