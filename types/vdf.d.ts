declare module 'vdf' {
	export function parse<T = any>(buffer: string): T;
	export function dump(obj: any): string;
}
