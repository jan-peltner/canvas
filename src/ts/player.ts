import Vector2 from "./vector.js";

const PLAYER_RADIUS = 30;
const PLAYER_VELOCITY = new Vector2(0.2, 0.2);

export default class Player {
	public position: Vector2;
	public radius: number;

	public static spawnCentral(): Player {
		return new Player(Vector2.createCentral(), PLAYER_RADIUS);
	}

	constructor(pos: Vector2, r: number) {
		this.position = pos;
		this.radius = r;
	}

	public move(v: Vector2, w: number, h: number): this {
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
