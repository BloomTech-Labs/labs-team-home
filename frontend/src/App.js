import React, { Component, Route } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import LandingView from './LandingView/containers/LandingView';
import MessageBoard from './MessageBoard/components/MessageBoard';
import Dashboard from './DashboardView/containers/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import AppStyles from './app-styles';
import SettingsView from './SettingsView/containers/SettingsView';
import Nav from './Nav/Nav';

class App extends Component {
	render() {
		return (
			<AppStyles>
				<GlobalStyle />
				{localStorage.token && <Nav />}
				<Switch>
					<PublicRoute exact path="/" component={LandingView} />
					<PrivateRoute path="/home" component={MessageBoard} />
					<PrivateRoute path="/dashboard" component={Dashboard} />
					<PrivateRoute path="/settings" component={SettingsView} />
				</Switch>
			</AppStyles>
		);
	}
}

export default withRouter(App);
