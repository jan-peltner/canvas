import CanvasSingleton from "./ts/canvas.js";
import Player from "./ts/player.js";
import { getMousePos } from "./ts/helpers.js";
const canvas = CanvasSingleton.getInstance();
let dt, last = 0, fps = 0, dtCounter = 0;
let player;
let mousePos;
const pressedKeys = new Set();
function computeFps(dt) {
    return (1000 / dt);
}
function render(ts) {
    if (!player) {
        player = Player.spawnCentral();
    }
    dt = ts - last;
    last = ts;
    dtCounter += dt;
    if (dtCounter > (10 * dt)) {
        fps = computeFps(dt);
        dtCounter = 0;
    }
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.ctx.fillStyle = "black";
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.ctx.font = "12px Fragment Mono";
    canvas.ctx.fillStyle = "white";
    canvas.ctx.fillText(`FPS: ${fps.toFixed(2)}`, 10, 20);
    canvas.ctx.beginPath();
    player.update(dt / 1000, mousePos);
    canvas.ctx.fillStyle = "blue";
    canvas.ctx.fill();
    requestAnimationFrame(render);
}
document.addEventListener("keydown", (e) => player.pressedKeys.add(e.code));
document.addEventListener("keyup", (e) => player.pressedKeys.delete(e.code));
document.addEventListener("mousedown", () => {
    player.isAttacking = true;
});
document.addEventListener("mouseup", () => {
    player.isAttacking = false;
});
window.addEventListener("blur", () => pressedKeys.clear());
addEventListener('mousemove', (e) => {
    mousePos = getMousePos(e);
});
requestAnimationFrame(render);
