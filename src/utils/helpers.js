import Vector2 from "./vector.js";
export function getMousePos(e) {
    return new Vector2(e.pageX, e.pageY);
}
export function computeFps(dt) {
    return (1000 / dt);
}
export function addEventListeners(events, callback) {
    events.forEach(event => {
        window.addEventListener(event, (evt) => {
            callback(evt);
        });
    });
}
export function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}
