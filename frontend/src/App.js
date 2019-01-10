import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LandingView from './LandingView/containers/LandingView';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<LandingView />
				</header>
			</div>
		);
	}
}

export default App;
