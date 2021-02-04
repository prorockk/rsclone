interface TextureInterface {
    [props: string]: string[];
}

interface PropertiesInterface {
    sheetSpriteStr: string;
    animationSpeed: number;
    anchor: number;
    loop: boolean;
    width?: number;
    height?: number;
    x: number;
    y: number;
}

export interface AnimateMobType {
    name: string;
    texture: TextureInterface;
    propertiesAr: PropertiesInterface[];
    setBool: boolean;
    sheets?: any;
}
