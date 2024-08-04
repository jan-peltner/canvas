import Entity from "./entity.js";
import Vector2 from "./vector.js";

export default class Player extends Entity {
	private static PLAYER_RADIUS: number = 30;
	private static PLAYER_VELOCITY: Vector2 = new Vector2(0.2, 0.2);
	public pressedKeys: Set<string> = new Set();


	public static spawnCentral(): Player {
		return new Player(Vector2.createCentral(), Player.PLAYER_RADIUS, Player.PLAYER_VELOCITY);
	}

	private constructor(p: Vector2, r: number, v: Vector2) {
		super(p, r, v);
	}

	public move(v: Vector2, w: number, h: number): void {
		const dxdy = v.elementwiseMultiply(Player.PLAYER_VELOCITY);
		const newPos = this.position.add(dxdy);
		if (!this.isOutsideCnvsBoundaries(newPos, w, h)) {
			this.position = newPos;
		}
	}

	public handleInputs(w: number, h: number) {
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
		})
	}
}
