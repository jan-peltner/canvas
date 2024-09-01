export class AlphaTransition {
    start;
    end;
    constructor(start, durMs) {
        this.start = start;
        this.end = this.start + durMs;
    }
    computeTransitionProgress(ts) {
        return ts / this.end > 1 ? 1 : ts / this.end;
    }
    interpolate(start, end, easing) {
        let progress = this.computeTransitionProgress(performance.now());
        if (typeof easing === "function") {
            progress = easing(progress);
        }
        return start * (1 - progress) + end * progress;
    }
}
