import Vector2 from "./vector.js";
const PLAYER_RADIUS = 30;
const PLAYER_VELOCITY = new Vector2(0.2, 0.2);
export default class Player {
    position;
    radius;
    static spawnCentral() {
        return new Player(Vector2.createCentral(), PLAYER_RADIUS);
    }
    constructor(pos, r) {
        this.position = pos;
        this.radius = r;
    }
    move(v, w, h) {
        const dxdy = v.elementwiseMultiply(PLAYER_VELOCITY);
        const newPos = this.position.add(dxdy);
        const absolutePosition = newPos.elementwiseMultiply(new Vector2(w, h));
        if (absolutePosition.x - this.radius <= 0
            || absolutePosition.x + this.radius >= w
            || absolutePosition.y - this.radius <= 0
            || absolutePosition.y + this.radius >= h) {
            return this;
        }
        this.position = newPos;
        return this;
    }
}
