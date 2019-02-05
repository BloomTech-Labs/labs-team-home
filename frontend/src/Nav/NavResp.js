import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import { StyledLink, TextIMG, RespNav } from '../Nav/styles/index';
import Auth0 from '../Auth/Auth';
// import styled from 'styled-components';
// import Button from '../components/SignInUpButton';
import textLogo from '../assets/TH_text_filled.svg';
// import { StyledAvatar } from '../SettingsView/styles/container.styles';
import LandingNavOptions from './components/LandingNavOptions';

const navStyle = {
	width: '100%',
	display: 'flex',
	flexFlow: 'row',
	justifyContent: 'space-between'
};

export default class RespNavBar extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
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

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		return (
			<RespNav>
				<Navbar style={navStyle}>
					<TextIMG src={textLogo} />
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<LandingNavOptions
							handleLogin={this.handleLogin}
							handleSignUp={this.handleSignUp}
						/>
					</Collapse>
				</Navbar>
			</RespNav>
		);
	}
}
