export interface RGBAColor {
	r: number;
	g: number;
	b: number;
	a: number;
}

export function intoRgbFunctionalNotation(c: RGBAColor, newAlpha?: number): string {
	return `rgb(${c.r} ${c.g} ${c.b} / ${newAlpha ?? c.a})`
}

export const COLORS: { [key: string]: RGBAColor } = {
	"base": { r: 48, g: 52, b: 70, a: 1 },
	"text": { r: 198, g: 208, b: 245, a: 1 },
	"red": { r: 231, g: 130, b: 132, a: 1 },
	"yellow": { r: 229, g: 200, b: 144, a: 1 },
	"blue": { r: 140, g: 170, b: 238, a: 1 },
	"green": { r: 166, g: 209, b: 137, a: 1 },
};
