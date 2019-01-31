import React from 'react';
import { Link } from 'react-router-dom';
import NavBar, { StyledLink, TextIMG } from './styles/index';
import styled from 'styled-components';
// import Button from '../components/SignInUpButton';
import textLogo from '../assets/TH_text_filled.svg';

const BtnContainer = styled.div`
	max-width: 400px;
	width: 100%;
	display: flex;
	flex-flow: row;
`;

const Nav = props => {
	return (
		<NavBar>
			<TextIMG alt={'TeamHome banner'} src={textLogo} />
			<BtnContainer>
				<StyledLink to="/dashboard">Dashboard</StyledLink>
				<StyledLink to="/settings">Settings</StyledLink>
				<StyledLink to="/" onClick={props.handleLogout}>
					Logout
				</StyledLink>
			</BtnContainer>
		</NavBar>
	);
};

export default Nav;
