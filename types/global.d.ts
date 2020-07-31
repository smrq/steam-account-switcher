import * as electron from 'electron';

declare global {
	namespace NodeJS {
		interface Global {
			ipcRenderer: typeof electron.ipcRenderer;
		}
	}

	interface Window {
		ipcRenderer: typeof electron.ipcRenderer;
	}
}