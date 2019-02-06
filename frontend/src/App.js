import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import LandingView from './LandingView/containers/LandingView';
import MessageBoardContainer from './MessageBoard/containers/MessageBoardContainer';
import Dashboard from './DashboardView/containers/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';
import AppStyles from './app-styles';
import SettingsView from './SettingsView/containers/SettingsView';
import AppNavBar from './Nav/Nav';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { TextIMG } from './LandingView/styles/LogoBannerStyled';
import iconLogo from './assets/BigTHv2.png';

const generateClassName = createGenerateClassName();
const jss = create({
	...jssPreset(),
	// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
	insertionPoint: document.getElementById('jss-insertion-point')
});

const appearDuration = 500;
const transitionName = `example`;

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
					{localStorage.token && <AppNavBar handleLogout={this.handleLogout} />}
					<TransitionGroup>
						<CSSTransition
							key={this.props.location.key}
							timeout={{ enter: 300, exit: 300 }}
							classNames={'fade'}
						>
							<Switch location={this.props.location}>
								<PublicRoute exact path="/" component={LandingView} />
								<PrivateRoute
									path="/:team/home"
									component={MessageBoardContainer}
								/>
								<PrivateRoute path="/dashboard" component={Dashboard} />
								<PrivateRoute path="/settings" component={SettingsView} />
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</AppStyles>
			</JssProvider>
		);
	}
}

export default withRouter(App);
