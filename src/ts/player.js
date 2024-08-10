import CanvasSingleton from "./canvas.js";
import Entity from "./entity.js";
import Vector2 from "./vector.js";
const canvas = CanvasSingleton.getInstance();
export default class Player extends Entity {
    static PLAYER_RADIUS = 30;
    static PLAYER_VELOCITY = new Vector2(50, 50);
    pressedKeys = new Set();
    isAttacking = false;
    static spawnCentral() {
        return new Player(Vector2.createCentral(), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
    }
    static spawnTopLeft() {
        return new Player(new Vector2((Player.PLAYER_RADIUS + 1) / canvas.width, (Player.PLAYER_RADIUS + 1) / canvas.height), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
    }
    constructor(p, r, v) {
        super(p, r, v);
    }
    move(v, dtSecs) {
        const dxdy = v.elementwiseMultiply(Player.PLAYER_VELOCITY).scale(dtSecs);
        const newPos = this.relativePosition.add(dxdy);
        if (!this.isOutsideCnvsBoundaries(newPos)) {
            this.relativePosition = newPos;
        }
    }
    update(dtSecs, mousePos) {
        this.handleInputs(dtSecs);
        this.renderSelf();
        if (this.isAttacking) {
            this.renderAttack(mousePos);
        }
    }
    handleInputs(dtSecs) {
        this.pressedKeys.forEach(key => {
            if (key === "KeyW") {
                this.move(new Vector2(0, -0.01), dtSecs);
                return;
            }
            if (key === "KeyS") {
                this.move(new Vector2(0, 0.01), dtSecs);
                return;
            }
            if (key === "KeyD") {
                this.move(new Vector2(0.01, 0), dtSecs);
                return;
            }
            if (key === "KeyA") {
                this.move(new Vector2(-0.01, 0), dtSecs);
            }
        });
    }
    renderAttack(mousePos) {
        // NOTE: don't render attack if mouse position is inside player
        // check if P->MP displacement vec's magnitude <= PLAYER_RADIUS
        const displacementVector = mousePos.sub(this.absolutePosition);
        if (Math.abs(displacementVector.magnitude()) < Player.PLAYER_RADIUS)
            return;
        //NOTE: normalize the displacement vec to get the direction as a unit vec
        // then scale the by PLAYER_RADIUS
        const directionUnitVector = displacementVector.normalize();
        const playerPerimeterPositionalVector = this.absolutePosition.add(directionUnitVector.scale(Player.PLAYER_RADIUS));
        canvas.ctx.beginPath();
        canvas.ctx.strokeStyle = 'green';
        canvas.ctx.moveTo(playerPerimeterPositionalVector.x, playerPerimeterPositionalVector.y);
        canvas.ctx.lineTo(mousePos.x, mousePos.y);
        canvas.ctx.stroke();
    }
}
