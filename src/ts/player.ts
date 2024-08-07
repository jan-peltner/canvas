import CanvasSingleton from "./canvas.js";
import Entity from "./entity.js";
import Vector2 from "./vector.js";

const canvas = CanvasSingleton.getInstance();

export default class Player extends Entity {
	private static PLAYER_RADIUS: number = 30;
	private static PLAYER_VELOCITY: Vector2 = new Vector2(50, 50);
	public pressedKeys: Set<string> = new Set();
	public isAttacking: boolean = false;

	public static spawnCentral(): Player {
		return new Player(Vector2.createCentral(), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
	}

	public static spawnTopLeft(): Player {
		return new Player(new Vector2((Player.PLAYER_RADIUS + 1) / canvas.width, (Player.PLAYER_RADIUS + 1) / canvas.height), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
	}

	private constructor(p: Vector2, r: number, v: Vector2) {
		super(p, r, v);
	}

	protected move(v: Vector2, dtSecs: number): void {
		const dxdy = v.elementwiseMultiply(Player.PLAYER_VELOCITY).scale(dtSecs);
		const newPos = this.position.add(dxdy);
		if (!this.isOutsideCnvsBoundaries(newPos)) {
			this.position = newPos;
		}
	}

	public update(dtSecs: number, mousePos: Vector2): void {
		this.computeAbsolutePosition();
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

	public renderAttack(mousePos: Vector2): void {
		const direction = mousePos.sub(this.absolutePosition).normalize();
		const playerPerimeterPositionalVector = this.absolutePosition.add(direction.scale(Player.PLAYER_RADIUS));
		canvas.ctx.beginPath();
		canvas.ctx.strokeStyle = 'green';
		canvas.ctx.moveTo(playerPerimeterPositionalVector.x, playerPerimeterPositionalVector.y);
		canvas.ctx.lineTo(mousePos.x, mousePos.y);
		canvas.ctx.stroke();
	}
}
