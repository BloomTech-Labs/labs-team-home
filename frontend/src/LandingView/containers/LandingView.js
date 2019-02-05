import React, { Component } from 'react';
import SignInSignUp from '../components/SignInSignUp';
import LogoBanner from '../components/LandingLogoBanner';
import { SVGAnimation } from '../styles/LandingViewStyled';
import TH_desktop from '../../assets/TH_desktop.svg';
import Auth0 from '../../Auth/Auth';
import Particles from 'react-particles-js';
import particles from '../../animated/particles.json';
import RespNavBAr from '../../Nav/NavResp';

const styles = {
	position: 'fixed',
	width: ' 100%',
	margin: '0px',
	left: '0px',
	zIndex: '0',
	height: '100%'
};

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
			this.props.history.push('/dashboard');
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
				{/* <SignInSignUp
					handleLogin={this.handleLogin}
					handleSignUp={this.handleSignUp}
				/> */}
				{/* <SVGAnimation src={TH_desktop}/> */}
				<RespNavBAr />
				<Particles params={particles} style={styles} />
				<LogoBanner />
			</div>
		);
	}
}
