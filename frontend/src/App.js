import React, { Component } from 'react';
// import logo from './logo.svg';
import GlobalStyle from './GlobalStyles';
import LandingView from './LandingView/containers/LandingView';
import { Route } from 'react-router-dom';
import MessageBoard from './MessageBoard/components/MessageBoard';
// import Dashboard from './DashboardView/containers/Dashboard';
// import AuthRoute from './Auth/components/AuthRoute';
import SettingsView from './SettingsView/containers/SettingsView';
import AppStyles from './app-styles';

class App extends Component {
	render() {
		return (
			<AppStyles>
				<GlobalStyle />
				<Route exact path="/" component={LandingView} />
				<Route path="/home" component={MessageBoard} />
				{/* <AuthRoute path="/dashboard" component={Dashboard} /> */}
				<Route path="/settings" component={SettingsView} />
			</AppStyles>
		);
	}
}

export default App;
