type EasingFunction = (t: number) => number;

export class AlphaTransition {

	private start: DOMHighResTimeStamp;
	private end: DOMHighResTimeStamp;

	public constructor(start: DOMHighResTimeStamp, durMs: number) {
		this.start = start;
		this.end = this.start + durMs;
	}

	private computeTransitionProgress(ts: DOMHighResTimeStamp): number {
		return ts / this.end > 1 ? 1 : ts / this.end;
	}

	public interpolate(start: number, end: number, easing?: EasingFunction): number {
		let progress = this.computeTransitionProgress(performance.now());
		if (typeof easing === "function") {
			progress = easing(progress);
		}
		return start * (1 - progress) + end * progress;
	}
}



