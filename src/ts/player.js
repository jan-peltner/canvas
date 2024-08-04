import Entity from "./entity.js";
import Vector2 from "./vector.js";
export default class Player extends Entity {
    static PLAYER_RADIUS = 30;
    static PLAYER_VELOCITY = new Vector2(50, 50);
    pressedKeys = new Set();
    isAttacking = false;
    static spawnCentral() {
        return new Player(Vector2.createCentral(), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
    }
    static spawnTopLeft(w, h) {
        return new Player(new Vector2((Player.PLAYER_RADIUS + 1) / w, (Player.PLAYER_RADIUS + 1) / h), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
    }
    constructor(p, r, v) {
        super(p, r, v);
    }
    move(v, dt, w, h) {
        const dxdy = v.elementwiseMultiply(Player.PLAYER_VELOCITY).scale(dt);
        const newPos = this.position.add(dxdy);
        if (!this.isOutsideCnvsBoundaries(newPos, w, h)) {
            this.position = newPos;
        }
    }
    update(ctx, dt, w, h) {
        this.handleInputs(dt, w, h);
        this.renderSelf(ctx, w, h);
        this.renderAttack(ctx, w, h);
    }
    handleInputs(dt, w, h) {
        this.pressedKeys.forEach(key => {
            if (key === "KeyW") {
                this.move(new Vector2(0, -0.01), dt, w, h);
                return;
            }
            if (key === "KeyS") {
                this.move(new Vector2(0, 0.01), dt, w, h);
                return;
            }
            if (key === "KeyD") {
                this.move(new Vector2(0.01, 0), dt, w, h);
                return;
            }
            if (key === "KeyA") {
                this.move(new Vector2(-0.01, 0), dt, w, h);
            }
        });
    }
    renderAttack(ctx, w, h) {
    }
}
