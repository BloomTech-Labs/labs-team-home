import React from 'react';
import styled from 'styled-components';
import { Collapse, Nav, NavItem } from 'reactstrap';
import mediaQueryFor from '../../_global_styles/responsive_querie';

const LandBtn = styled.div`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	font-family: Comfortaa;
	color: #f1fcef;
	text-decoration: none;
	margin: 5px;
	font-weight: bold;
	background: none;
	text-align: center;
	padding: 0.6em 1em;
	border: none;
	border-bottom: 1px solid #ecff26;
	transition: 0.4s;
	a {
		color: white;
		&:hover {
			color: #ecff26;
			text-decoration: none;
		}
	}
	&:hover {
		color: #ecff26;
		transform: scale(1.05, 1.05);
		border: none;
	}
	${mediaQueryFor.mdDevice`
    text-align:center;
  `}
	${mediaQueryFor.smDevice`
    text-align:center;
  `}
`;

const LandingNavOptions = ({ handleLogin, handleSignUp, isOpen }) => {
	return (
		<Collapse isOpen={isOpen} navbar>
			<Nav className="ml-auto nav-btns" navbar>
				<NavItem>
					{/* <LandingButton clickFxn={handleLogin} label="Login" /> */}
					<LandBtn
						onClick={() => {
							handleLogin();
						}}
					>
						<a href="#root">Login</a>
					</LandBtn>
				</NavItem>
				<NavItem>
					{/* <LandingButton clickFxn={handleSignUp} label="Sign Up" /> */}
					<LandBtn
						onClick={() => {
							handleSignUp();
						}}
					>
						<a href="#root">Sign Up</a>
					</LandBtn>
				</NavItem>
			</Nav>
		</Collapse>
	);
};

export default LandingNavOptions;
