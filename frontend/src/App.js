import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import LandingView from './LandingView/containers/LandingView';
import { Route } from 'react-router-dom';
import MessageBoard from './MessageBoard/components/MessageBoard';
import DashBoard from './DashboardView/containers/DashBoard';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Route exact path="/" component={LandingView} />
				<Route path="/home" component={MessageBoard} />
				<Route path="/dashboard" component={DashBoard} />
			</div>
		);
	}
}

export default App;
