import { join } from 'path';
import { parse } from 'vdf';
import { readFileAsync } from './fs';

interface LoginUsersVdf {
	users: {[id: string]: User};
}

export interface User {
	AccountName: string;
	PersonaName: string;
	mostrecent: string;
}

export async function getLoginUsers(steamPath: string): Promise<{[id: string]: User}> {
	const vdfPath = join(steamPath, 'config/loginusers.vdf');
	const loginusersVdf = await readFileAsync(vdfPath, 'utf8');
	const loginusers = parse<LoginUsersVdf>(loginusersVdf);
	return loginusers.users;
}
