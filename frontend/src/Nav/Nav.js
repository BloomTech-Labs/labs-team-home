import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { StyledLink, TextIMG, RespNav } from './styles/index';
import { Spin } from 'react-burgers';
import textLogo from '../../src/assets/Sveza_white.svg';

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
						<TextIMG className="text-img" src={textLogo} />
						<NavbarToggler onClick={this.toggle}>
							<Spin active={this.state.isOpen} color="#fff" />
						</NavbarToggler>
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
