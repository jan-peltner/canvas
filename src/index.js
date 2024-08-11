import CanvasSingleton from "./ts/canvas.js";
import Player from "./ts/player.js";
import { getMousePos, computeFps } from "./ts/helpers.js";
import COLORS from "./colors.js";
const canvas = CanvasSingleton.getInstance();
let dt, last = 0, fps = 0, dtCounter = 0;
let player;
let mousePos;
const pressedKeys = new Set();
function render(ts) {
    if (!player) {
        player = Player.spawnCentral(COLORS.blue, COLORS.yellow);
    }
    dt = ts - last;
    last = ts;
    dtCounter += dt;
    if (dtCounter > (10 * dt)) {
        fps = computeFps(dt);
        dtCounter = 0;
    }
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.ctx.fillStyle = COLORS.base;
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.ctx.font = "12px Fragment Mono";
    canvas.ctx.fillStyle = COLORS.text;
    canvas.ctx.fillText(`FPS: ${fps.toFixed(2)}`, 10, 20);
    player.update(dt / 1000, mousePos);
    // canvas.ctx.fillStyle = "blue";
    // canvas.ctx.fill();
    canvas.ctx.beginPath();
    canvas.ctx.strokeStyle = COLORS.blue;
    canvas.ctx.stroke();
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
