import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { initializeApi } from './api/index.main';

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

const createWindow = (): void => {
	const mainWindow = new BrowserWindow({
		backgroundColor: '#000729',
		show: false,
		frame: false,
		fullscreen: true,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});
	
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(() => {
    installExtension(REACT_DEVELOPER_TOOLS);
});

initializeApi();
