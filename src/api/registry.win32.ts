import Registry from 'winreg';
import { promisify } from 'util';

interface RegistryEx extends Registry.Registry {
	getAsync(name: string): Promise<Registry.RegistryItem>;
	setAsync(name: string, type: string, value: string): Promise<void>;
}

const key = new Registry({
	hive: Registry.HKCU,
	key: '\\Software\\Valve\\Steam'
}) as RegistryEx;
key.getAsync = promisify(key.get);
key.setAsync = promisify(key.set);

export async function getSteamPath(): Promise<string> {
	const item = await key.getAsync('SteamPath');
	return item.value;
}

export async function setLoginUser(user: string): Promise<void> {
	await key.setAsync('AutoLoginUser', Registry.REG_SZ, user);
	await key.setAsync('RememberPassword', Registry.REG_DWORD, '1');
}
