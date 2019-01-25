import React from 'react';
import { Link } from 'react-router-dom';
import { StyledLink } from './styles/index';
import styled from 'styled-components';
// import Button from '../components/SignInUpButton';
import StyledSignInUp, {
	TextIMG
} from '../LandingView/styles/SignInSignUpStyled';
import textLogo from '../assets/TH_text_filled.svg';

const BtnContainer = styled.div`
	max-width: 400px;
	width: 100%;
	display: flex;
	flex-flow: row;
`;

const Nav = () => {
	return (
		<StyledSignInUp>
			<TextIMG alt={'TeamHome banner'} src={textLogo} />
			<BtnContainer>
				<StyledLink to="/home">Home</StyledLink>
				<StyledLink to="/dashboard">Dashboard</StyledLink>
				<StyledLink to="/settings">Settings</StyledLink>
			</BtnContainer>
		</StyledSignInUp>
	);
};

export default Nav;
