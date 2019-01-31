import React from 'react';
import styled from 'styled-components';
import Button from '../components/SignInUpButton';
import StyledSignInUp, { TextIMG } from '../styles/SignInSignUpStyled';
import textLogo from '../../../src/assets/TH_text_filled.svg';

const BtnContainer = styled.div`
	max-width: 400px;
	width: 100%;
	display: flex;
	flex-flow: row;
`;

let btn1 = 'Login',
	btn2 = 'Sign Up';

const SignInSignUp = ({ handleLogin, handleSignUp }) => {
	return (
		<StyledSignInUp>
			<TextIMG alt={'TeamHome banner'} src={textLogo} />
			<BtnContainer>
				<Button btnprop={btn1} handleClick={handleLogin} />
				<Button btnprop={btn2} handleClick={handleSignUp} />
			</BtnContainer>
		</StyledSignInUp>
	);
};

export default SignInSignUp;
