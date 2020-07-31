import { join } from 'path';
import { parse, dump } from 'vdf';
import { readFileAsync, writeFileAsync } from './fs';

const steamPath = join(process.env.HOME, 'Library/Application Support/Steam');

interface RegistryVdf {
	Registry: {
		HKCU: {
			Software: {
				Valve: {
					Steam: {
						AutoLoginUser: string;
						RememberPassword: string;
					};
				};
			};
		};
	};
}

export async function getSteamPath(): Promise<string> {
	return Promise.resolve(steamPath);
}

export async function setLoginUser(user: string): Promise<void> {
	const vdfPath = join(steamPath, 'registry.vdf');
	const registryVdf = await readFileAsync(vdfPath, 'utf8');
	const registry = parse<RegistryVdf>(registryVdf);

	registry.Registry.HKCU.Software.Valve.Steam.AutoLoginUser = user;
	registry.Registry.HKCU.Software.Valve.Steam.RememberPassword = '1';

	const updatedVdf = dump(registry);
	await writeFileAsync(vdfPath, updatedVdf, 'utf8');
}
