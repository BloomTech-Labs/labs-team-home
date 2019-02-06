import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, NavbarToggler } from 'reactstrap';
import { TextIMG, RespNav } from '../Nav/styles/index';
import { Spin } from 'react-burgers';
import Auth0 from '../Auth/Auth';
import textLogo from '../assets/TH_text_filled.svg';
import LandingNavOptions from './components/LandingNavOptions';

class RespNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			auth: new Auth0(),
			login: 'Login',
			signup: 'Sign Up'
		};
	}

	componentDidMount() {
		// Upon successful authentication, via Auth0, a token is set to localstorage
		this.state.auth.lock.on('authenticated', authResult => {
			localStorage.setItem('token', authResult.accessToken);
			this.props.history.push('/dashboard');
		});
	}

	makeIsOpenFalse = () => {
		this.setState({ isOpen: false });
	};

	handleLogin = () => {
		this.state.auth.login();
		this.makeIsOpenFalse();
	};

	handleSignUp = () => {
		this.state.auth.signUp();
		this.makeIsOpenFalse();
	};

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		return (
			<div>
				<RespNav>
					<Navbar expand="md">
						<TextIMG className="text-img" src={textLogo} />
						<NavbarToggler onClick={this.toggle}>
							<Spin active={this.state.isOpen} color="#fff" />
						</NavbarToggler>
						<LandingNavOptions
							handleLogin={this.handleLogin}
							handleSignUp={this.handleSignUp}
							isOpen={this.state.isOpen}
						/>
					</Navbar>
				</RespNav>
			</div>
		);
	}
}

export default withRouter(RespNavBar);
