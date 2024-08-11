import CanvasSingleton from "./ts/canvas.js";
import Player from "./ts/player.js";
import Vector2 from "./ts/vector.js";
import { getMousePos, computeFps } from "./ts/helpers.js";
import COLORS from "./colors.js";

const canvas = CanvasSingleton.getInstance();

let dt: number, last: number = 0, fps: number = 0, dtCounter: number = 0;
let player: Player;
let mousePos: Vector2;
const pressedKeys: Set<string> = new Set();

function render(ts: DOMHighResTimeStamp): void {
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
	mousePos = getMousePos(e as MouseEvent);
});

requestAnimationFrame(render);
