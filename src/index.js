import * as SETUP from "./ts/setup.js";
import Vector2 from "./ts/vector.js";
import Player from "./ts/player.js";
const { CNVS, CTX } = SETUP;
let dt, last = 0;
let fps = 0;
let dtCounter = 0;
let player;
const pressedKeys = new Set();
function computeFps(dt) {
    return (1000 / dt);
}
function computePlayerPos(player, keys, w, h) {
    keys.forEach(key => {
        if (key === "KeyW") {
            player.move(new Vector2(0, -0.01), w, h);
            return;
        }
        if (key === "KeyS") {
            player.move(new Vector2(0, 0.01), w, h);
            return;
        }
        if (key === "KeyD") {
            player.move(new Vector2(0.01, 0), w, h);
            return;
        }
        if (key === "KeyA") {
            player.move(new Vector2(-0.01, 0), w, h);
        }
    });
}
function render(ts) {
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
    computePlayerPos(player, pressedKeys, WIDTH, HEIGHT);
    CTX.clearRect(0, 0, WIDTH, HEIGHT);
    CTX.fillStyle = "black";
    CTX.fillRect(0, 0, WIDTH, HEIGHT);
    CTX.font = "12px Fragment Mono";
    CTX.fillStyle = "white";
    CTX.fillText(`FPS: ${fps.toFixed(2)}`, 10, 20);
    CTX.beginPath();
    CTX.arc(player.position.x * WIDTH, player.position.y * HEIGHT, player.radius, 0, 2 * Math.PI, false);
    CTX.fillStyle = "blue";
    CTX.fill();
    requestAnimationFrame(render);
}
document.addEventListener("keydown", (e) => pressedKeys.add(e.code));
document.addEventListener("keyup", (e) => pressedKeys.delete(e.code));
requestAnimationFrame(render);
