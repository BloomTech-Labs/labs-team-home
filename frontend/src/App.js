import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';

// --------------------- imports ------------------------- //
import GlobalStyle from './GlobalStyles'; // styling
import LandingView from './LandingView/containers/LandingView'; // component
import ContentContainer from './Content/ContentContainer'; // component
import Dashboard from './DashboardView/containers/Dashboard'; // component
import PrivateRoute from './utils/PrivateRoute'; // higher order component
import PublicRoute from './utils/PublicRoute'; // higher order component
import AppStyles from './app-styles'; // styling
import SettingsView from './SettingsView/containers/SettingsView'; // component
import AppNavBar from './Nav/Nav'; // component

// ------------- styling libraries ---------------------- //
import JssProvider from 'react-jss/lib/JssProvider'; // lets you write style sheets in javascript
import { create } from 'jss'; // lets you write style sheets in javascript
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'; // gets styling from material-ui
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // some transitions

import HTML5Backend from 'react-dnd-html5-backend';
//removed this import and the dependecy from package.json
import { DragDropContext } from 'react-dnd';

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
					{localStorage.token && <AppNavBar handleLogout={this.handleLogout} />}
					<TransitionGroup>
						<CSSTransition
							key={this.props.location.key}
							timeout={{ enter: 300, exit: 300 }}
							classNames={'fade'}
						>
							{/* Switch renders only the first route that matches the location */}
							<Switch location={this.props.location}>
								<PublicRoute exact path="/" component={LandingView} />
								<PrivateRoute path="/:team/home" component={ContentContainer} />
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

export default DragDropContext(HTML5Backend)(withRouter(App));
