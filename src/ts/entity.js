import CanvasSingleton from "./canvas.js";
import Vector2 from "./vector.js";
const canvas = CanvasSingleton.getInstance();
export default class Entity {
    absolutePosition;
    static entities = new Array();
    position;
    velocity;
    radius;
    constructor(p, r, v) {
        this.position = p;
        this.radius = r;
        this.velocity = v;
        Entity.entities.push(this);
    }
    isOutsideCnvsBoundaries(newPos) {
        const newPosAbsolute = newPos.elementwiseMultiply(new Vector2(canvas.width, canvas.height));
        return newPosAbsolute.x - this.radius <= 0
            || newPosAbsolute.x + this.radius >= canvas.width
            || newPosAbsolute.y - this.radius <= 0
            || newPosAbsolute.y + this.radius >= canvas.height;
    }
    computeAbsolutePosition() {
        this.absolutePosition = this.position.elementwiseMultiply(canvas.asVector2());
    }
    destruct() {
        Entity.entities.filter(e => e !== this);
    }
    renderSelf() {
        canvas.ctx.arc(this.absolutePosition.x, this.absolutePosition.y, this.radius, 0, 2 * Math.PI, false);
    }
}
