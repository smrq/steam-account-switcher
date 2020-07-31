import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './renderer/App';
import pollGamepads from './renderer/gamepad';
import './index.css';

pollGamepads();
ReactDOM.render(<App />, document.getElementById('root'));
