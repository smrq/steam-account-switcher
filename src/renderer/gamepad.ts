const lastGamepadState: Gamepad[] = [];

const THRESHOLD = 0.75;

function tickGamepad(state: Gamepad, previousState: Gamepad): void {
	for (let i = 0; i < state.buttons.length; ++i) {
		if (state.buttons[i].pressed && !(previousState && previousState.buttons[i].pressed)) {
			window.dispatchEvent(new CustomEvent('buttondown', { detail: { button: i }}));
		}
		if (!state.buttons[i].pressed && previousState && previousState.buttons[i].pressed) {
			window.dispatchEvent(new CustomEvent('buttonup', { detail: { button: i }}));
		}
	}

	for (let i = 0; i < state.axes.length; ++i) {
		if (state.axes[i] < -THRESHOLD && !(previousState && previousState.axes[i] < -THRESHOLD)) {
			window.dispatchEvent(new CustomEvent('axisdown', { detail: { axis: i, direction: -1 }}));
		}
		if (!(state.axes[i] < -THRESHOLD) && previousState && previousState.axes[i] < -THRESHOLD) {
			window.dispatchEvent(new CustomEvent('axisup', { detail: { axis: i, direction: -1 }}));
		}
		if (state.axes[i] > THRESHOLD && !(previousState && previousState.axes[i] > THRESHOLD)) {
			window.dispatchEvent(new CustomEvent('axisdown', { detail: { axis: i, direction: 1 }}));
		}
		if (!(state.axes[i] > THRESHOLD) && previousState && previousState.axes[i] > THRESHOLD) {
			window.dispatchEvent(new CustomEvent('axisup', { detail: { axis: i, direction: 1 }}));
		}
	}
}

export default function poll(): () => void {
	let handle: number;

	function loop(): void {
		const gamepads = navigator.getGamepads();
		for (let i = 0; i < gamepads.length; ++i) {
			if (gamepads[i] != null) {
				tickGamepad(gamepads[i], lastGamepadState[i]);
				lastGamepadState[i] = gamepads[i];
			}
		}
		handle = requestAnimationFrame(loop);
	}

	loop();

	return (): void => {
		cancelAnimationFrame(handle);
	};
}
