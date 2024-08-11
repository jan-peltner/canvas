import CanvasSingleton from "./canvas.js";
import Entity from "./entity.js";
import Vector2 from "./vector.js";

const canvas = CanvasSingleton.getInstance();

export default class Player extends Entity {
	private static PLAYER_RADIUS: number = 30;
	private static PLAYER_VELOCITY: Vector2 = new Vector2(50, 50);
	public pressedKeys: Set<string> = new Set();
	public isAttacking: boolean = false;

	public static spawnCentral(color: string, attackColor: string): Player {
		return new Player(Vector2.createCentral(), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY, color, attackColor);
	}

	public static spawnTopLeft(color: string, attackColor: string): Player {
		return new Player(new Vector2((Player.PLAYER_RADIUS + 1) / canvas.width, (Player.PLAYER_RADIUS + 1) / canvas.height), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY, color, attackColor);
	}

	private constructor(p: Vector2, r: number, v: Vector2, c1: string, c2: string) {
		super(p, r, v, c1, c2);
	}

	protected move(v: Vector2, dtSecs: number): void {
		this.animateTrail();
		const dxdy = v.elementwiseMultiply(Player.PLAYER_VELOCITY).scale(dtSecs);
		const newPos = this.relativePosition.add(dxdy);
		if (!this.isOutsideCnvsBoundaries(newPos)) {
			this.relativePosition = newPos;
		}
	}

	public update(dtSecs: number, mousePos: Vector2): void {
		this.handleInputs(dtSecs);
		this.renderSelf();
		if (this.isAttacking) {
			this.renderAttack(mousePos);
		}
	}

	private handleInputs(dtSecs: number) {
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
		})
	}

	private animateTrail(): void {
		// TODO: implementation via separate color transition class
	}

	public renderAttack(mousePos: Vector2): void {
		// NOTE: don't render attack if mouse position is inside player
		// check if P->MP displacement vec's magnitude <= PLAYER_RADIUS
		const displacementVector = mousePos.sub(this.absolutePosition);
		if (Math.abs(displacementVector.magnitude()) <= Player.PLAYER_RADIUS) return;

		// NOTE: normalize the displacement vec to get the direction as a unit vec
		// then scale by PLAYER_RADIUS
		const directionUnitVector = displacementVector.normalize();
		const playerPerimeterPositionalVector = this.absolutePosition.add(directionUnitVector.scale(Player.PLAYER_RADIUS));
		canvas.ctx.beginPath();
		canvas.ctx.strokeStyle = this.attackColor;
		canvas.ctx.moveTo(playerPerimeterPositionalVector.x, playerPerimeterPositionalVector.y);
		canvas.ctx.lineTo(mousePos.x, mousePos.y);
		canvas.ctx.stroke();
	}
}
