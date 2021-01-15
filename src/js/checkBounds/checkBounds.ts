import * as PIXI from "pixi.js";

class CheckBounds {
    player: any;
    constructor(gameMember: any) {
        this.player = gameMember;
    }

    init(playerDirection: string) {
        const playerBounds = this.player.getBounds();
        //добавить параметры для внутренних препятсвий
        return playerDirection === "right"
            ? playerBounds.x + this.player.width >= 465
            : playerDirection === "down"
            ? playerBounds.y <= 60
            : playerDirection === "left"
            ? playerBounds.x <= 50
            : playerBounds.y + this.player.height >= 430;
    }
    collisionResponse(
        object1: { x: number; y: number; acceleration: { x: number; y: number }; mass: any },
        object2: { x: number; y: number; acceleration: { x: number; y: number }; mass: any }
    ) {
        const impulsePower = 1;
        if (!object1 || !object2) {
            return new PIXI.Point(0);
        }

        const vCollision = new PIXI.Point(object2.x - object1.x, object2.y - object1.y);

        const distance = Math.sqrt(
            (object2.x - object1.x) * (object2.x - object1.x) + (object2.y - object1.y) * (object2.y - object1.y)
        );

        const vCollisionNorm = new PIXI.Point(vCollision.x / distance, vCollision.y / distance);

        const vRelativeVelocity = new PIXI.Point(
            object1.acceleration.x - object2.acceleration.x,
            object1.acceleration.y - object2.acceleration.y
        );

        const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

        const impulse = (impulsePower * speed) / (object1.mass + object2.mass);

        return new PIXI.Point(impulse * vCollisionNorm.x, impulse * vCollisionNorm.y);
    }
}
export default CheckBounds;
