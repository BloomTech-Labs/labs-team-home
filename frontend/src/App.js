import React, { Component, Route } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import LandingView from './LandingView/containers/LandingView';
import MessageBoardContainer from './MessageBoard/containers/MessageBoardContainer';
import Dashboard from './DashboardView/containers/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import AppStyles from './app-styles';
import SettingsView from './SettingsView/containers/SettingsView';
import Nav from './Nav/Nav';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

import { TextIMG } from './LandingView/styles/LogoBannerStyled';
import iconLogo from './assets/BigTHv2.png';

const generateClassName = createGenerateClassName();
const jss = create({
	...jssPreset(),
	// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
	insertionPoint: document.getElementById('jss-insertion-point')
});

class App extends Component {
	handleLogout() {
		localStorage.removeItem('token');
	}
	render() {
		return (
			<JssProvider jss={jss} generateClassName={generateClassName}>
				<AppStyles>
					<GlobalStyle />
					<TextIMG alt={'TeamHome banner'} src={iconLogo} />
					{localStorage.token && <Nav handleLogout={this.handleLogout} />}
					<Switch>
						<PublicRoute exact path="/" component={LandingView} />
						<PrivateRoute
							path="/:team/home"
							component={MessageBoardContainer}
						/>
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<PrivateRoute path="/settings" component={SettingsView} />
					</Switch>
				</AppStyles>
			</JssProvider>
		);
	}
}

export default withRouter(App);
