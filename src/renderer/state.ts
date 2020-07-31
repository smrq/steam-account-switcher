import type { User, Profile } from '../api/index.renderer';

export interface State {
	users: {
		ids: string[];
		entities: { [id: string]: User };
	};
	profiles: { [id: string]: Profile };
	selected: string;
}

export type Action =
	| { type: 'setUsers'; payload: { [id: string]: User }}
	| { type: 'setProfile'; payload: { id: string; profile: Profile }}
	| { type: 'selectUser'; payload: string }
	| { type: 'selectNextUser' }
	| { type: 'selectPreviousUser' };

export function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'setUsers': {
			const entities = action.payload;
			const ids = Object.keys(entities).sort((a, b) => entities[a].PersonaName.localeCompare(entities[b].PersonaName));
			return {
				...state,
				users: { ids, entities },
				selected: ids.find(id => entities[id].mostrecent === '1')
			};
		}

		case 'setProfile': {
			const { id, profile } = action.payload;
			return {
				...state,
				profiles: {
					...state.profiles,
					[id]: profile
				}
			};
		}

		case 'selectUser':
			return {
				...state,
				selected: action.payload
			};

		case 'selectPreviousUser': {
			const selectedIndex = state.users.ids.indexOf(state.selected);
			if (selectedIndex === 0) {
				return state;
			}
			const newSelected = state.users.ids[selectedIndex - 1];
			return {
				...state,
				selected: newSelected
			};
		}

		case 'selectNextUser': {
			const selectedIndex = state.users.ids.indexOf(state.selected);
			if (selectedIndex === state.users.ids.length - 1) {
				return state;
			}
			const newSelected = state.users.ids[selectedIndex + 1];
			return {
				...state,
				selected: newSelected
			};
		}

		default:
			return state;
	}
}

export const initialState: State = {
	users: { ids: [], entities: {} },
	profiles: {},
	selected: null
};
