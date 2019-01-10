import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import MessageBoard from './components/MessageBoard';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route path="/home" component={MessageBoard} />
			</div>
		);
	}
}

export default App;
