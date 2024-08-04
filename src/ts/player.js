import Entity from "./entity.js";
import Vector2 from "./vector.js";
export default class Player extends Entity {
    static PLAYER_RADIUS = 30;
    static PLAYER_VELOCITY = new Vector2(0.2, 0.2);
    pressedKeys = new Set();
    static spawnCentral() {
        return new Player(Vector2.createCentral(), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
    }
    constructor(p, r, v) {
        super(p, r, v);
    }
    move(v, w, h) {
        const dxdy = v.elementwiseMultiply(Player.PLAYER_VELOCITY);
        const newPos = this.position.add(dxdy);
        if (!this.isOutsideCnvsBoundaries(newPos, w, h)) {
            this.position = newPos;
        }
    }
    handleInputs(w, h) {
        this.pressedKeys.forEach(key => {
            if (key === "KeyW") {
                this.move(new Vector2(0, -0.01), w, h);
                return;
            }
            if (key === "KeyS") {
                this.move(new Vector2(0, 0.01), w, h);
                return;
            }
            if (key === "KeyD") {
                this.move(new Vector2(0.01, 0), w, h);
                return;
            }
            if (key === "KeyA") {
                this.move(new Vector2(-0.01, 0), w, h);
            }
        });
    }
}
