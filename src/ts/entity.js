import Vector2 from "./vector.js";
export default class Entity {
    position;
    velocity;
    radius;
    constructor(p, r, v) {
        this.position = p;
        this.radius = r;
        this.velocity = v;
    }
    isOutsideCnvsBoundaries(newPos, w, h) {
        const newPosAbsolute = newPos.elementwiseMultiply(new Vector2(w, h));
        return newPosAbsolute.x - this.radius <= 0
            || newPosAbsolute.x + this.radius >= w
            || newPosAbsolute.y - this.radius <= 0
            || newPosAbsolute.y + this.radius >= h;
    }
    render(ctx, w, h) {
        ctx.arc(this.position.x * w, this.position.y * h, this.radius, 0, 2 * Math.PI, false);
    }
}
