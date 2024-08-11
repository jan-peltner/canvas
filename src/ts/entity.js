import CanvasSingleton from "./canvas.js";
import Vector2 from "./vector.js";
const canvas = CanvasSingleton.getInstance();
export default class Entity {
    static entities = new Array();
    _relativePosition;
    _absolutePosition;
    velocity;
    radius;
    color;
    attackColor;
    constructor(p, r, v, c1, c2) {
        this.relativePosition = p;
        this.radius = r;
        this.velocity = v;
        this.color = c1;
        this.attackColor = c2;
        Entity.entities.push(this);
    }
    isOutsideCnvsBoundaries(newPos) {
        const newPosAbsolute = newPos.elementwiseMultiply(new Vector2(canvas.width, canvas.height));
        return newPosAbsolute.x - this.radius <= 0
            || newPosAbsolute.x + this.radius >= canvas.width
            || newPosAbsolute.y - this.radius <= 0
            || newPosAbsolute.y + this.radius >= canvas.height;
    }
    set relativePosition(v) {
        this._relativePosition = v;
        this._absolutePosition = new Vector2(this._relativePosition.x * canvas.width, this._relativePosition.y * canvas.height);
    }
    get relativePosition() {
        return this._relativePosition;
    }
    get absolutePosition() {
        return this._absolutePosition;
    }
    renderSelf() {
        canvas.ctx.beginPath();
        canvas.ctx.arc(this.absolutePosition.x, this.absolutePosition.y, this.radius, 0, 2 * Math.PI, false);
        canvas.ctx.fillStyle = this.color;
        canvas.ctx.fill();
        canvas.ctx.stroke();
    }
    destruct() {
        Entity.entities.filter(e => e !== this);
    }
}
