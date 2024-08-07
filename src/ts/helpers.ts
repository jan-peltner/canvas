import Vector2 from "./vector.js";

export function getMousePos(e: MouseEvent): Vector2 {
	return new Vector2(e.pageX, e.pageY);
}

export function addEventListeners<E extends keyof HTMLElementEventMap>(events: Array<E>, callback: (e: Event) => unknown): void {
	events.forEach(event => {
		window.addEventListener(event, (evt) => {
			callback(evt);
		})
	});
}


