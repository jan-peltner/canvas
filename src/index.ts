import CanvasSingleton from "./core/canvas.js";
import Player from "./entities/player.js";
import Vector2 from "./utils/vector.js";
import { getMousePos, computeFps } from "./utils/helpers.js";
import { COLORS, intoRgbFunctionalNotation } from "./consts/colors.js";

const canvas = CanvasSingleton.getInstance();
const player = Player.spawnCentral(COLORS.blue, COLORS.yellow);
const pressedKeys: Set<string> = new Set();
let dt: number, last: number = 0, fps: number = 0, dtCounter: number = 0;
let mousePos: Vector2;

function render(ts: DOMHighResTimeStamp): void {
	dt = ts - last;
	last = ts;
	dtCounter += dt;
	if (dtCounter > (10 * dt)) {
		fps = computeFps(dt);
		dtCounter = 0;
	}
	canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);

	canvas.ctx.fillStyle = intoRgbFunctionalNotation(COLORS.base);
	canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);

	canvas.ctx.font = "12px Fragment Mono";
	canvas.ctx.fillStyle = intoRgbFunctionalNotation(COLORS.text);
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
	mousePos = getMousePos(e as MouseEvent);
});

requestAnimationFrame(render);
