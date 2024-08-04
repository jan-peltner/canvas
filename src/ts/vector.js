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
            this.x += v.x;
            this.y += v.y;
        }
        else {
            this.x += v;
            this.y += v;
        }
        return this;
    }
    sub(v) {
        if (v instanceof Vector2) {
            this.x -= v.x;
            this.y -= v.y;
        }
        else {
            this.x -= v;
            this.y -= v;
        }
        return this;
    }
    scale(val) {
        this.x *= val;
        this.y *= val;
        return this;
    }
}
