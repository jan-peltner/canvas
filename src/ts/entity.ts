import Vector2 from "./vector.js";

export default abstract class Entity {
	public position: Vector2;
	public velocity: Vector2;
	public radius: number;

	protected constructor(p: Vector2, r: number, v: Vector2) {
		this.position = p;
		this.radius = r;
		this.velocity = v;
	}

	protected isOutsideCnvsBoundaries(newPos: Vector2, w: number, h: number): boolean {
		const newPosAbsolute = newPos.elementwiseMultiply(new Vector2(w, h));
		return newPosAbsolute.x - this.radius <= 0
			|| newPosAbsolute.x + this.radius >= w
			|| newPosAbsolute.y - this.radius <= 0
			|| newPosAbsolute.y + this.radius >= h
	}

	public abstract move(v: Vector2, w: number, h: number): void
	public render(ctx: CanvasRenderingContext2D, w: number, h: number): void {
		ctx.arc(this.position.x * w, this.position.y * h, this.radius, 0, 2 * Math.PI, false);
	}
}
