export default class Vector2 {
    x;
    y;
    static createCentral() {
        return new Vector2(0.5, 0.5);
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        if (v instanceof Vector2) {
            return new Vector2(this.x + v.x, this.y + v.y);
        }
        else {
            return new Vector2(this.x + v, this.y + v);
        }
    }
    sub(v) {
        if (v instanceof Vector2) {
            return new Vector2(this.x - v.x, this.y - v.y);
        }
        else {
            return new Vector2(this.x - v, this.y - v);
        }
    }
    elementwiseMultiply(v) {
        return new Vector2(this.x * v.x, this.y * v.y);
    }
    scale(val) {
        return new Vector2(this.x * val, this.y * val);
    }
}
