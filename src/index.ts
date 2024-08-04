import * as SETUP from "./ts/setup.js";
import Vector2 from "./ts/vector.js";

const { CNVS, CTX, DT_SCALAR, PLAYER_RADIUS } = SETUP;

let dt: number, dts: number, last: number = 0;
let playerPos: Vector2;
const pressedKeys: Set<string> = new Set();

function computeFps(dt: number): number {
	return (1000 / dt);
}

function computePlayerPos(player: Vector2, keys: Set<string>): void {
	keys.forEach(key => {
		if (key === "KeyW") {
			player.add(new Vector2(0, -0.001));
			return;
		}
		if (key === "KeyS") {
			player.add(new Vector2(0, 0.001));
			return;
		}
		if (key === "KeyD") {
			player.add(new Vector2(0.001, 0));
			return;
		}
		if (key === "KeyA") {
			player.add(new Vector2(-0.001, 0));
		}
	})
}

function render(ts: DOMHighResTimeStamp): void {
	const { width: WIDTH, height: HEIGHT } = CNVS;
	if (!playerPos) {
		playerPos = Vector2.createCentral();
	}
	dt = ts - last;
	dts = dt * DT_SCALAR;
	last = ts;

	computePlayerPos(playerPos, pressedKeys);
	CTX.clearRect(0, 0, WIDTH, HEIGHT);
	CTX.fillStyle = "black";
	CTX.fillRect(0, 0, WIDTH, HEIGHT);
	CTX.beginPath();
	console.log(playerPos.x / WIDTH);
	CTX.arc(playerPos.x * WIDTH, playerPos.y * HEIGHT, PLAYER_RADIUS, 0, 2 * Math.PI, false);
	CTX.fillStyle = "blue";
	CTX.fill();

	requestAnimationFrame(render);
}

document.addEventListener("keydown", (e) => pressedKeys.add(e.code))

document.addEventListener("keyup", (e) => pressedKeys.delete(e.code))

window.addEventListener("resize", () => {
})

requestAnimationFrame(render);
