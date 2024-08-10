import Vector2 from "./vector.js";
export default class CanvasSingleton {
    static instance;
    _width;
    _height;
    _canvasElement;
    _ctx;
    static getInstance() {
        if (!this.instance) {
            CanvasSingleton.instance = new CanvasSingleton();
        }
        return CanvasSingleton.instance;
    }
    constructor() {
        this.getCanvasElementAndContext();
        this.computeCanvasDimensions();
        this.registerResizeListener();
    }
    ;
    getCanvasElementAndContext() {
        const CNVS = document.querySelector("#game");
        if (!CNVS) {
            throw new Error("Could not find canvas element!");
        }
        const CTX = CNVS.getContext("2d");
        if (!CTX) {
            throw new Error("Could not get canvas 2D rendering context!");
        }
        this.canvasElement = CNVS;
        this.ctx = CTX;
    }
    computeCanvasDimensions() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvasElement.width = this.width;
        this.canvasElement.height = this.height;
    }
    registerResizeListener() {
        window.addEventListener("resize", this.computeCanvasDimensions.bind(this));
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get ctx() {
        return this._ctx;
    }
    get canvasElement() {
        return this._canvasElement;
    }
    set width(w) {
        this._width = w;
    }
    set height(h) {
        this._height = h;
    }
    set ctx(ctx) {
        this._ctx = ctx;
    }
    set canvasElement(canvas) {
        this._canvasElement = canvas;
    }
    asVector2() {
        return new Vector2(this.width, this.height);
    }
}
