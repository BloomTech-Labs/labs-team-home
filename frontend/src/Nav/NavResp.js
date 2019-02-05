import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavbarBrand,
	DropdownToggle,
	UncontrolledDropdown,
	NavItem,
	DropdownMenu,
	DropdownItem,
	NavLink
} from 'reactstrap';

import { StyledLink, TextIMG, RespNav } from '../Nav/styles/index';
import Auth0 from '../Auth/Auth';
// import styled from 'styled-components';
import LandingButton from '../Nav/components/LandingButton';
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
			<div>
				{/* <RespNav> */}
				<Navbar color="light" light expand="md">
					<TextIMG src={textLogo} />
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<LandingButton
									clickFxn={this.handleLogin}
									label={this.state.login}
								/>
							</NavItem>
							<NavItem>
								<LandingButton
									clickFxn={this.handleLogin}
									label={this.state.signup}
								/>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>

				{/* <Navbar style={navStyle}>
					<TextIMG src={textLogo} />
					<NavbarToggler onClick={this.toggle} />
				</Navbar>
					<Collapse isOpen={this.state.isOpen} className="navbar collapse-navbar" navbar>
          <Nav className="ml-auto" navbar>
						<LandingNavOptions
							handleLogin={this.handleLogin}
							handleSignUp={this.handleSignUp}
						/>
          </Nav>
					</Collapse> */}
				{/* </RespNav> */}
			</div>
		);
	}
}
