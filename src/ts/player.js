import Vector2 from "./vector.js";
const PLAYER_RADIUS = 30;
const PLAYER_MOVEMENT_SCALAR = 0.2;
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
    move(v, w, y) {
        const dxdy = v.scale(PLAYER_MOVEMENT_SCALAR);
        const newPos = this.position.add(dxdy);
        const absolutePosition = newPos.ewm(new Vector2(w, y));
        if (absolutePosition.x - this.radius <= 0
            || absolutePosition.x + this.radius >= w
            || absolutePosition.y - this.radius <= 0
            || absolutePosition.y + this.radius >= y) {
            return this;
        }
        else {
            this.position = newPos;
        }
        return this;
    }
}
