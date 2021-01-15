export default function hitTexture(obj1: any, obj2: any) {
    let hit = false;
    obj1.centerX = obj1.position.x;
    obj1.centerY = obj1.position.y;
    obj2.centerX = obj2.position.x;
    obj2.centerY = obj2.position.y;

    obj1.halfWidth = obj1.width / 4;
    obj1.halfHeight = obj1.height / 4;
    obj2.halfWidth = obj2.width / 4;
    obj2.halfHeight = obj2.height / 4;

    let vx = obj1.centerX - obj2.centerX;
    let vy = obj1.centerY - obj2.centerY;

    let combineHalfWidths = obj1.halfWidth + obj2.halfWidth;
    let combineHalfHeights = obj1.halfHeight + obj2.halfHeight;

    if (Math.abs(vx) < combineHalfWidths) {
        if (Math.abs(vy) < combineHalfHeights) {
            if (obj2.hp) obj2.hp--;
            hit = true;
        } else {
            hit = false;
        }
    } else {
        hit = false;
    }
    return hit;
}
