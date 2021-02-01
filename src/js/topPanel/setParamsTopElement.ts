interface TopElement {
    width: number;
    height: number;
    x: number;
    y: number;
}

export default function setParamsTopElement(
    topElem: TopElement,
    width: number,
    height: number,
    x: number,
    y: number
): void {
    topElem.width = width;
    topElem.height = height;
    topElem.x = x;
    topElem.y = y;
}
