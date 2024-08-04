import * as SETUP from "./ts/setup.js";
import Player from "./ts/player.js";

const { CNVS, CTX } = SETUP;

let dt: number, last: number = 0;
let fps: number = 0;
let dtCounter: number = 0;
let player: Player;
const pressedKeys: Set<string> = new Set();

function computeFps(dt: number): number {
	return (1000 / dt);
}

function render(ts: DOMHighResTimeStamp): void {
	const { width: WIDTH, height: HEIGHT } = CNVS;
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
	CTX.clearRect(0, 0, WIDTH, HEIGHT);

	CTX.fillStyle = "black";
	CTX.fillRect(0, 0, WIDTH, HEIGHT);

	CTX.font = "12px Fragment Mono";
	CTX.fillStyle = "white";
	CTX.fillText(`FPS: ${fps.toFixed(2)}`, 10, 20);

	CTX.beginPath();
	player.update(CTX, dt / 1000, WIDTH, HEIGHT);
	CTX.fillStyle = "blue";
	CTX.fill();

	requestAnimationFrame(render);
}

document.addEventListener("keydown", (e) => player.pressedKeys.add(e.code));
document.addEventListener("keyup", (e) => player.pressedKeys.delete(e.code));
document.addEventListener("mousedown", (e) => player.isAttacking = true);
document.addEventListener("mouseup", (e) => player.isAttacking = false);
window.addEventListener("blur", () => pressedKeys.clear());

requestAnimationFrame(render);
