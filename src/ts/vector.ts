export default class Vector2 {
	public readonly x: number;
	public readonly y: number;

	public static createCentral(): Vector2 {
		return new Vector2(0.5, 0.5);
	}

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public add(v: Vector2 | number): Vector2 {
		if (v instanceof Vector2) {
			return new Vector2(
				this.x + v.x,
				this.y + v.y
			)
		} else {
			return new Vector2(
				this.x + v,
				this.y + v
			)
		}
	}

	public sub(v: Vector2 | number): Vector2 {
		if (v instanceof Vector2) {
			return new Vector2(
				this.x - v.x,
				this.y - v.y
			)
		} else {
			return new Vector2(
				this.x - v,
				this.y - v
			)
		}
	}

	// elementwise multiplication
	public ewm(v: Vector2): Vector2 {
		return new Vector2(
			this.x * v.x,
			this.y * v.y
		)
	}

	public scale(val: number): Vector2 {
		return new Vector2(
			this.x * val,
			this.y * val
		)
	}
}
