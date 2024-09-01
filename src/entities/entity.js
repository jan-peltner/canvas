import CanvasSingleton from "../core/canvas.js";
import Vector2 from "../utils/vector.js";
import { AlphaTransition } from "../core/transition.js";
import { intoRgbFunctionalNotation } from "../consts/colors.js";
const TRAIL_FADEOUT_DURATION = 500;
const POSITION_HISTORY_SIZE = 60;
const canvas = CanvasSingleton.getInstance();
export default class Entity {
    static entities = new Array();
    _relativePosition;
    _absolutePosition;
    _playerTrailPositions = new Array();
    velocity;
    radius;
    color;
    attackColor;
    render(absolute, strokeOutline = true, alpha) {
        canvas.ctx.beginPath();
        canvas.ctx.arc(absolute.x, absolute.y, this.radius, 0, 2 * Math.PI, false);
        canvas.ctx.fillStyle = intoRgbFunctionalNotation(this.color, alpha);
        canvas.ctx.fill();
        if (strokeOutline) {
            canvas.ctx.stroke();
        }
    }
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
    pushPosition(v) {
        if (this._playerTrailPositions.length >= POSITION_HISTORY_SIZE) {
            this._playerTrailPositions.shift();
        }
        this._playerTrailPositions.push({ absolutePosition: v, alpha: new AlphaTransition(performance.now(), TRAIL_FADEOUT_DURATION) });
    }
    get relativePosition() {
        return this._relativePosition;
    }
    get absolutePosition() {
        return this._absolutePosition;
    }
    get positionHistory() {
        return this._playerTrailPositions;
    }
    destruct() {
        Entity.entities.filter(e => e !== this);
    }
    renderTrail() {
        this.positionHistory.forEach(pos => {
            this.render(pos.absolutePosition, false, pos.alpha.interpolate(1, 0));
        });
    }
    renderSelf() {
        this.render(this.absolutePosition);
    }
}
