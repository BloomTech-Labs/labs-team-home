import React from 'react';
import styled from 'styled-components';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import Button from '@material-ui/core/Button';

const BtnContainer = styled.div`
	/* max-width: 400px;
	width: 100%; */
	display: flex;
	flex-flow: row;
`;

const BtnStyles = {
	backgroundColor: 'transparent',
	color: '#fff',
	boxShadow: '0px 0px 0px #ddd',
	borderRadius: '0',
	borderBottom: 'solid 1px #FAED26',
	margin: '0 20px',
	fontSize: '1.2rem',
	fontWeight: '100',
	lineHeight: '0.8'
};

let btn1 = 'Login',
	btn2 = 'Sign Up';
const LandingNavOptions = ({ handleLogin, handleSignUp }) => {
	return (
		<BtnContainer>
			<Button
				style={BtnStyles}
				btnprop={btn1}
				onClick={() => {
					handleLogin();
				}}
			>
				Login
			</Button>

			<Button
				style={BtnStyles}
				btnprop={btn2}
				onClick={() => {
					handleSignUp();
				}}
			>
				Sign Up
			</Button>
		</BtnContainer>
	);
};

export default LandingNavOptions;
