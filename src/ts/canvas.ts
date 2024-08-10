import Vector2 from "./vector.js";

export default class CanvasSingleton {
	private static instance: CanvasSingleton;
	private _width!: number;
	private _height!: number;
	private _canvasElement!: HTMLCanvasElement;
	private _ctx!: CanvasRenderingContext2D;

	public static getInstance() {
		if (!this.instance) {
			CanvasSingleton.instance = new CanvasSingleton();
		}
		return CanvasSingleton.instance;
	}

	private constructor() {
		this.getCanvasElementAndContext();
		this.computeCanvasDimensions();
		this.registerResizeListener();
	};

	private getCanvasElementAndContext() {
		const CNVS = document.querySelector("#game") as HTMLCanvasElement;
		if (!CNVS) {
			throw new Error("Could not find canvas element!");
		}

		const CTX = CNVS.getContext("2d") as CanvasRenderingContext2D;
		if (!CTX) {
			throw new Error("Could not get canvas 2D rendering context!");
		}
		this.canvasElement = CNVS;
		this.ctx = CTX;
	}
	private computeCanvasDimensions() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvasElement.width = this.width;
		this.canvasElement.height = this.height;
	}

	private registerResizeListener() {
		window.addEventListener("resize", this.computeCanvasDimensions.bind(this));
	}

	public get width() {
		return this._width;
	}

	public get height() {
		return this._height;
	}

	public get ctx() {
		return this._ctx;
	}

	public get canvasElement() {
		return this._canvasElement;
	}

	public set width(w: number) {
		this._width = w;
	}

	public set height(h: number) {
		this._height = h;
	}

	public set ctx(ctx: CanvasRenderingContext2D) {
		this._ctx = ctx;
	}

	public set canvasElement(canvas: HTMLCanvasElement) {
		this._canvasElement = canvas;
	}

	public asVector2(): Vector2 {
		return new Vector2(this.width, this.height);
	}
}
