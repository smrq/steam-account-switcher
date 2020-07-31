import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

interface ProfileResponseData {
	profile: Profile;
}

export interface Profile {
	steamID64: string;
	steamID: string;
	avatarFull: string;
}

export async function getProfile(id: string): Promise<Profile> {
	return fetch(`https://steamcommunity.com/profiles/${id}/?xml=1`)
		.then(response => response.text())
		.then(data => parseStringPromise(data, { explicitArray: false }) as Promise<ProfileResponseData>)
		.then(({ profile }) => profile);
}
