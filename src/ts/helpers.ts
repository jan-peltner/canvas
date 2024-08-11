import Vector2 from "./vector.js";

export function getMousePos(e: MouseEvent): Vector2 {
	return new Vector2(e.pageX, e.pageY);
}

export function computeFps(dt: number): number {
	return (1000 / dt);
}

export function addEventListeners<E extends keyof HTMLElementEventMap>(events: Array<E>, callback: (e: Event) => unknown): void {
	events.forEach(event => {
		window.addEventListener(event, (evt) => {
			callback(evt);
		})
	});
}

export function lerp(start: number, end: number, t: number) {
	return start * (1 - t) + end * t;
}

