// eslint-disable global-require

export async function getSteamPath(): Promise<string> {
	if (process.platform === 'darwin') {
		return require('./registry.darwin').getSteamPath();
	} else if (process.platform === 'win32') {
		return require('./registry.win32').getSteamPath();
	} else {
		throw new Error('unsupported platform');
	}
}

export async function setLoginUser(user: string): Promise<void> {
	if (process.platform === 'darwin') {
		require('./registry.darwin').setLoginUser(user);
	} else if (process.platform === 'win32') {
		require('./registry.win32').setLoginUser(user);
	} else {
		throw new Error('unsupported platform');
	}
}
