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
import { Spin } from 'react-burgers';
import Auth0 from '../Auth/Auth';
// import styled from 'styled-components';
import LandingButton from '../Nav/components/LandingButton';
import textLogo from '../assets/TH_text_filled.svg';
import graphLogo from '../assets/TH_icon_logo_wout_nodes.svg';
// import { StyledAvatar } from '../SettingsView/styles/container.styles';
import LandingNavOptions from './components/LandingNavOptions';

const navStyle = {
	width: '100%',
	display: 'flex',
	flexFlow: 'row',
	justifyContent: 'space-between',
	backgroundColor: 'rgba(0,0,0,0)'
};

export default class RespNavBar extends Component {
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

	handleLogin = () => {
		this.state.auth.login();
	};

	handleSignUp = () => {
		this.state.auth.signUp();
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
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto nav-btns" navbar>
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
				</RespNav>
			</div>
		);
	}
}
