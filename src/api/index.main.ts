import { app, ipcMain } from 'electron';
import { killSteam, launchSteam } from './process';
import { getProfile } from './profile';
import { getSteamPath, setLoginUser } from './registry';
import { getLoginUsers } from './users';

export function initializeApi(): void {
	ipcMain.handle('api/getProfile', async (event, arg) => {
		return getProfile(arg);
	});

	ipcMain.handle('api/setLoginUser', async (event, arg) => {
		await killSteam();
		await setLoginUser(arg);
		await launchSteam();
		app.quit();
	});

	ipcMain.handle('api/getLoginUsers', async () => {
		const steamPath = await getSteamPath();
		return getLoginUsers(steamPath);
	});

	ipcMain.handle('api/exit', async () => {
		app.quit();
	});
}
