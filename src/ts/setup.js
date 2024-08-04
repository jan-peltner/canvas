function computeCnvsDimensions() {
    CNVS.width = window.innerWidth;
    CNVS.height = window.innerHeight;
}
const CNVS = document.querySelector("#game");
if (!CNVS) {
    throw new Error("Could not find canvas element!");
}
computeCnvsDimensions();
window.addEventListener("resize", computeCnvsDimensions);
const CTX = CNVS.getContext("2d");
if (!CTX) {
    throw new Error("Could not get canvas 2D rendering context!");
}
const PLAYER_RADIUS = 30;
const DT_SCALAR = 0.005;
export { PLAYER_RADIUS, DT_SCALAR, CNVS, CTX };
