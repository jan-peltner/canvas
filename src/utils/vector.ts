export default class Vector2 {
	public readonly x: number;
	public readonly y: number;

	public static createCentral(): Vector2 {
		return new Vector2(0.5, 0.5);
	}

	public constructor(x: number, y: number) {
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

	public magnitude(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public normalize(): Vector2 {
		const len = this.magnitude();
		return len === 0 ? new Vector2(0, 0) : new Vector2(this.x / len, this.y / len);
	}

	public elementwiseMultiply(v: Vector2): Vector2 {
		return new Vector2(
			this.x * v.x,
			this.y * v.y
		)
	}

	public scale(scalar: number): Vector2 {
		return new Vector2(
			this.x * scalar,
			this.y * scalar
		)
	}
}
