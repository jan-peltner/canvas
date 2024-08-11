import CanvasSingleton from "./core/canvas.js";
import Player from "./entities/player.js";
import { getMousePos, computeFps } from "./utils/helpers.js";
import COLORS from "./consts/colors.js";
const canvas = CanvasSingleton.getInstance();
const player = Player.spawnCentral(COLORS.blue, COLORS.yellow);
const pressedKeys = new Set();
let dt, last = 0, fps = 0, dtCounter = 0;
let mousePos;
function render(ts) {
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
