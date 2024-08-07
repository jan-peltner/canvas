import CanvasSingleton from "./canvas.js";
import Vector2 from "./vector.js";

const canvas = CanvasSingleton.getInstance();

export default abstract class Entity {
	protected absolutePosition!: Vector2;
	public static entities: Array<Entity> = new Array();
	public position: Vector2;
	public velocity: Vector2;
	public radius: number;

	protected constructor(p: Vector2, r: number, v: Vector2) {
		this.position = p;
		this.radius = r;
		this.velocity = v;
		Entity.entities.push(this);
	}

	protected isOutsideCnvsBoundaries(newPos: Vector2): boolean {
		const newPosAbsolute = newPos.elementwiseMultiply(new Vector2(canvas.width, canvas.height));
		return newPosAbsolute.x - this.radius <= 0
			|| newPosAbsolute.x + this.radius >= canvas.width
			|| newPosAbsolute.y - this.radius <= 0
			|| newPosAbsolute.y + this.radius >= canvas.height
	}

	protected abstract move(v: Vector2, dt: number): void

	protected computeAbsolutePosition() {
		this.absolutePosition = this.position.elementwiseMultiply(canvas.asVector2());
	}

	public abstract update(dt: number, mousePos?: Vector2): void

	public destruct() {
		Entity.entities.filter(e => e !== this);
	}

	public renderSelf(): void {
		canvas.ctx.arc(this.absolutePosition.x, this.absolutePosition.y, this.radius, 0, 2 * Math.PI, false);
	}
}
