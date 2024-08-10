import CanvasSingleton from "./canvas.js";
import Vector2 from "./vector.js";
const canvas = CanvasSingleton.getInstance();
export default class Entity {
    static entities = new Array();
    relativePosition;
    velocity;
    radius;
    constructor(p, r, v) {
        this.relativePosition = p;
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
    get absolutePosition() {
        return new Vector2(this.relativePosition.x * canvas.width, this.relativePosition.y * canvas.height);
    }
    destruct() {
        Entity.entities.filter(e => e !== this);
    }
    renderSelf() {
        canvas.ctx.beginPath();
        canvas.ctx.strokeStyle = "blue";
        canvas.ctx.arc(this.absolutePosition.x, this.absolutePosition.y, this.radius, 0, 2 * Math.PI, false);
        // canvas.ctx.fillStyle = "blue";
        // canvas.ctx.fill();
        canvas.ctx.stroke();
    }
}
