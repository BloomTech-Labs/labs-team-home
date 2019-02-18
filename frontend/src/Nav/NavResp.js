import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, NavbarToggler } from 'reactstrap';
import { TextIMG, RespNav } from '../Nav/styles/index';
import { Spin } from 'react-burgers';
import Auth0 from '../Auth/Auth';
import textLogo from '../assets/Sveza_white.svg';
import LandingNavOptions from './components/LandingNavOptions';
import { NavBarTogglerDiv } from './styles/index';

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
						<NavBarTogglerDiv onClick={this.toggle}>
							<Spin active={this.state.isOpen} color="#fff" />
						</NavBarTogglerDiv>
						{/* This was  originally a NavbarToggler 
						imported from React-strap, but threw errors on the console ('can not 
						nest a button in a button'). Changing it to a div preserves all functionality */}
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
