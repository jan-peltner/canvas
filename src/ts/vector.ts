export default class Vector2 {
	public x: number;
	public y: number;

	public static createCentral(): Vector2 {
		return new Vector2(0.5, 0.5);
	}

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	public add(v: Vector2 | number): this {
		if (v instanceof Vector2) {
			this.x += v.x;
			this.y += v.y;
		} else {
			this.x += v;
			this.y += v;
		}
		return this;
	}

	public sub(v: Vector2 | number): this {
		if (v instanceof Vector2) {
			this.x -= v.x;
			this.y -= v.y;
		} else {
			this.x -= v;
			this.y -= v;
		}
		return this;
	}

	public scale(val: number): this {
		this.x *= val;
		this.y *= val;
		return this;
	}
}
