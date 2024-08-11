import CanvasSingleton from "./canvas.js";
import Vector2 from "./vector.js";

const canvas = CanvasSingleton.getInstance();

export default abstract class Entity {
	public static entities: Array<Entity> = new Array();
	protected _relativePosition!: Vector2;
	protected _absolutePosition!: Vector2;
	protected velocity: Vector2;
	protected radius: number;
	protected color: string;
	protected attackColor: string;

	protected constructor(p: Vector2, r: number, v: Vector2, c1: string, c2: string) {
		this.relativePosition = p;
		this.radius = r;
		this.velocity = v;
		this.color = c1;
		this.attackColor = c2;
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


	protected set relativePosition(v: Vector2) {
		this._relativePosition = v;
		this._absolutePosition = new Vector2(this._relativePosition.x * canvas.width, this._relativePosition.y * canvas.height);
	}

	protected get relativePosition() {
		return this._relativePosition;
	}

	protected get absolutePosition(): Vector2 {
		return this._absolutePosition;
	}

	protected renderSelf(): void {
		canvas.ctx.beginPath();
		canvas.ctx.arc(this.absolutePosition.x, this.absolutePosition.y, this.radius, 0, 2 * Math.PI, false);
		canvas.ctx.fillStyle = this.color;
		canvas.ctx.fill();
		canvas.ctx.stroke();
	}

	public abstract update(dt: number, mousePos?: Vector2): void

	public destruct() {
		Entity.entities.filter(e => e !== this);
	}

}
