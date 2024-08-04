import Entity from "./entity.js";
import Vector2 from "./vector.js";

export default class Player extends Entity {
	private static PLAYER_RADIUS: number = 30;
	private static PLAYER_VELOCITY: Vector2 = new Vector2(50, 50);
	public pressedKeys: Set<string> = new Set();
	public isAttacking: boolean = false;

	public static spawnCentral(): Player {
		return new Player(Vector2.createCentral(), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
	}

	public static spawnTopLeft(w: number, h: number): Player {
		return new Player(new Vector2((Player.PLAYER_RADIUS + 1) / w, (Player.PLAYER_RADIUS + 1) / h), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
	}

	private constructor(p: Vector2, r: number, v: Vector2) {
		super(p, r, v);
	}

	protected move(v: Vector2, dt: number, w: number, h: number): void {
		const dxdy = v.elementwiseMultiply(Player.PLAYER_VELOCITY).scale(dt);
		const newPos = this.position.add(dxdy);
		if (!this.isOutsideCnvsBoundaries(newPos, w, h)) {
			this.position = newPos;
		}
	}

	public update(ctx: CanvasRenderingContext2D, dt: number, w: number, h: number): void {
		this.handleInputs(dt, w, h);
		this.renderSelf(ctx, w, h);
		this.renderAttack(ctx, w, h);
	}

	private handleInputs(dt: number, w: number, h: number) {
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
		})
	}

	public renderAttack(ctx: CanvasRenderingContext2D, w: number, h: number): void {

	}
}
