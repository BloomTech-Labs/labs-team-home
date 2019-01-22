import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import LandingView from './LandingView/containers/LandingView';
import MessageBoard from './MessageBoard/components/MessageBoard';
import Dashboard from './DashboardView/containers/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SettingsView from './SettingsView/containers/SettingsView';
import Nav from './Nav/Nav';

class App extends Component {
	render() {
		return (
			<div className="App">
				{localStorage.token && <Nav />}
				<Switch>
					<PublicRoute exact path="/" component={LandingView} />
					<PrivateRoute path="/home" component={MessageBoard} />
					<PrivateRoute path="/dashboard" component={Dashboard} />
					<PrivateRoute path="/settings" component={SettingsView} />
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
