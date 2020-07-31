import fkill from 'fkill';
import { shell } from 'electron';

function getSteamProcessName(): string {
	if (process.platform === 'darwin')
		return 'steam_osx';
	if (process.platform === 'win32')
		return 'steam.exe';
	throw new Error('unsupported platform');
}

async function timeout(time: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, time));
}

export async function killSteam(): Promise<void> {
	console.log('Killing Steam.');
	const processName = getSteamProcessName();
	try {
		await fkill(processName, { force: true });
	} catch (err) {
		if (/Process doesn't exist/.test(err.message)) {
			console.log('Steam not running.');
		} else {
			throw err;
		}
	}
	await timeout(100);
}

export async function launchSteam(): Promise<void> {
	console.log('Launching Steam.');
	shell.openExternal('steam://open/main');
}
