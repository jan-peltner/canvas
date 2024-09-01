import CanvasSingleton from "../core/canvas.js";
import Vector2 from "../utils/vector.js";
import { AlphaTransition } from "../core/transition.js";
import { RGBAColor, intoRgbFunctionalNotation } from "../consts/colors.js";

const TRAIL_FADEOUT_DURATION = 500;
const POSITION_HISTORY_SIZE = 60;
const canvas = CanvasSingleton.getInstance();

interface PlayerTrailPosition {
	absolutePosition: Vector2,
	alpha: AlphaTransition;
}

export default abstract class Entity {
	public static entities: Array<Entity> = new Array();
	private _relativePosition!: Vector2;
	private _absolutePosition!: Vector2;
	private _playerTrailPositions: Array<PlayerTrailPosition> = new Array();
	protected velocity: Vector2;
	protected radius: number;
	protected color: RGBAColor;
	protected attackColor: RGBAColor;

	private render(absolute: Vector2, strokeOutline: boolean = true, alpha?: number): void {
		canvas.ctx.beginPath();
		canvas.ctx.arc(absolute.x, absolute.y, this.radius, 0, 2 * Math.PI, false);
		canvas.ctx.fillStyle = intoRgbFunctionalNotation(this.color, alpha);
		canvas.ctx.fill();
		if (strokeOutline) {
			canvas.ctx.stroke();
		}
	}

	protected constructor(p: Vector2, r: number, v: Vector2, c1: RGBAColor, c2: RGBAColor) {
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

	protected pushPosition(v: Vector2) {
		if (this._playerTrailPositions.length >= POSITION_HISTORY_SIZE) {
			this._playerTrailPositions.shift();
		}
		this._playerTrailPositions.push({ absolutePosition: v, alpha: new AlphaTransition(performance.now(), TRAIL_FADEOUT_DURATION) });
	}

	protected get relativePosition() {
		return this._relativePosition;
	}

	protected get absolutePosition(): Vector2 {
		return this._absolutePosition;
	}

	protected get positionHistory(): Array<PlayerTrailPosition> {
		return this._playerTrailPositions;
	}


	public abstract update(dt: number, mousePos?: Vector2): void

	public destruct() {
		Entity.entities.filter(e => e !== this);
	}

	public renderTrail(): void {
		this.positionHistory.forEach(pos => {

			this.render(pos.absolutePosition, false, pos.alpha.interpolate(1, 0));
		})
	}

	public renderSelf(): void {
		this.render(this.absolutePosition);
	}
}
