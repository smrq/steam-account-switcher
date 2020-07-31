import * as React from 'react';
import * as api from '../api/index.renderer';
import { reducer, initialState } from './state';
import icons from './icons.svg';
import './App.css';

export default function App(): JSX.Element {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	function handleUserSelected(): void {
		api.setLoginUser(state.users.entities[state.selected].AccountName);
	}

	function handleClick(id: string): void {
		if (state.selected === id) {
			handleUserSelected();
		} else {
			dispatch({ type: 'selectUser', payload: id });
		}
	}

	React.useEffect(() => {
		api.getLoginUsers().then(users => {
			dispatch({ type: 'setUsers', payload: users });
			for (const id of Object.keys(users)) {
				api.getProfile(id).then(profile => {
					dispatch({ type: 'setProfile', payload: { id, profile } });
				});
			}
		});
	}, [dispatch]);

	React.useEffect(() => {
		function keydownListener(e: KeyboardEvent): void {
			switch (e.code) {
				case 'ArrowLeft':
					dispatch({ type: 'selectPreviousUser' });
					break;
				case 'ArrowRight':
					dispatch({ type: 'selectNextUser' });
					break;
				case 'Enter':
					handleUserSelected();
					break;
				case 'Escape':
					api.exit();
					break;
			}
		}

		function buttondownListener(e: CustomEvent<{ button: number }>): void {
			console.log('buttondown', e.detail);
			switch (e.detail.button) {
				case 0:
					handleUserSelected();
					break;
				case 1:
					api.exit();
					break;
				case 14:
					dispatch({ type: 'selectPreviousUser' });
					break;
				case 15:
					dispatch({ type: 'selectNextUser' });
					break;
			}
		}

		function axisdownListener(e: CustomEvent<{ axis: number; direction: number }>): void {
			console.log('axis', e.detail);
			if (e.detail.axis === 0) {
				if (e.detail.direction === -1) {
					dispatch({ type: 'selectPreviousUser' });
				} else {
					dispatch({ type: 'selectNextUser' });
				}
			}
		}

		window.addEventListener('keydown', keydownListener);
		window.addEventListener('buttondown', buttondownListener);
		window.addEventListener('axisdown', axisdownListener);

		return (): void => {
			window.removeEventListener('keydown', keydownListener);
			window.removeEventListener('buttondown', buttondownListener);
			window.removeEventListener('axisdown', axisdownListener);
		};
	}, [dispatch, handleUserSelected]);

	const selectedIndex = state.users.ids.indexOf(state.selected) || 0;

	return (
		<div className="layout">
			<nav>
				<svg className="logo" viewBox="0 0 293.458 88.474">
					<use xlinkHref={`${icons}#icon-steam`} />
				</svg>
			</nav>
			<main>
				{state.users.ids.length > 0 && (
					<div style={{ transform: `translateX(calc(${-selectedIndex - 0.5} * var(--user-width)))` }}>
						{state.users.ids.map(id => (
							<div
								className={`user ${state.selected === id ? 'selected' : ''}`}
								key={id}
								onClick={(): void => handleClick(id)}>
								<div className="avatar">
									{state.profiles[id] && <img width="100%" height="100%" src={state.profiles[id].avatarFull} />}
								</div>
								<div className="name">
									{state.users.entities[id].PersonaName}
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
