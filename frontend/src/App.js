import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import LandingView from './LandingView/containers/LandingView';
import MessageBoard from './MessageBoard/components/MessageBoard';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Dashboard from './DashboardView/containers/Dashboard';
import SettingsView from './SettingsView/containers/SettingsView';
import Nav from './Nav/Nav';
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
				<Switch>
          <Route path="/" component={Nav} />
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
