import Vector2 from "./vector.js";
export function getMousePos(e) {
    return new Vector2(e.pageX, e.pageY);
}
export function addEventListeners(events, callback) {
    events.forEach(event => {
        window.addEventListener(event, (evt) => {
            callback(evt);
        });
    });
}
