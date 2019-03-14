import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavItem } from 'reactstrap';
import { StyledLink, RespNav, NavBarTogglerDiv } from './styles/index';
import { Spin } from 'react-burgers';
import styled from 'styled-components';

const Logo = styled.h1`
	color: white;
	margin-left: 60px;
	margin-top: 10px;
	margin-bottom: 0;
	font-family: 'Comfortaa';
	font-weight: 400;

	span {
		font-size: 1.8rem;
		font-weight: 700;
	}
`;

export default class AppNavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	toggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	makeIsOpenFalse = () => {
		this.setState({ isOpen: false });
	};

	render() {
		return (
			<div>
				<RespNav>
					<Navbar expand="md">
						<Logo>
							Ar<span>Q</span>
						</Logo>
						<NavBarTogglerDiv onClick={this.toggle}>
							{/* This was  originally a NavbarToggler 
						imported from React-strap, but threw errors on the console ('can not 
						nest a button in a button'). Changing it to a div preserves all functionality */}
							<Spin active={this.state.isOpen} color="#fff" />
						</NavBarTogglerDiv>
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<StyledLink to="/dashboard" onClick={this.makeIsOpenFalse}>
										Dashboard
									</StyledLink>
								</NavItem>
								<NavItem>
									<StyledLink to="/settings" onClick={this.makeIsOpenFalse}>
										Settings
									</StyledLink>
								</NavItem>
								<NavItem>
									<StyledLink to="/" onClick={this.props.handleLogout}>
										Logout
									</StyledLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</RespNav>
			</div>
		);
	}
}
