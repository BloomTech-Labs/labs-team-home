import React, { Component } from 'react';
import SignInSignUp from '../components/SignInSignUp';
import LogoBanner from '../components/LandingLogoBanner';
import Auth0 from '../../Auth/Auth';

export default class LandingView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: new Auth0()
		};
	}

	componentDidMount() {
		// Upon successful authentication, via Auth0, a token is set to localstorage
		this.state.auth.lock.on('authenticated', authResult => {
			localStorage.setItem('token', authResult.accessToken);
		});
	}

	handleLogin = () => {
		this.state.auth.login();
	};

	handleSignUp = () => {
		this.state.auth.signUp();
	};

	render() {
		return (
			<div>
				<SignInSignUp history={this.props.history} />
				<LogoBanner />
			</div>
		);
	}
}
