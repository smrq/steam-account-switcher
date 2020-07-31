import type { Profile } from './profile';
import type { User } from './users';

export { Profile, User };

export async function getProfile(user: string): Promise<Profile> {
	return window.ipcRenderer.invoke('api/getProfile', user);
}

export async function setLoginUser(user: string): Promise<void> {
	return window.ipcRenderer.invoke('api/setLoginUser', user);
}

export async function getLoginUsers(): Promise<{[id: string]: User}> {
	return window.ipcRenderer.invoke('api/getLoginUsers');
}

export async function exit(): Promise<void> {
	return window.ipcRenderer.invoke('api/exit');
}
