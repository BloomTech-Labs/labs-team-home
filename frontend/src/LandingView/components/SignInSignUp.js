import React from 'react';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/SignInUpButton';
import StyledSignInUp from '../styles/SignInSignUpStyled';
import Auth0 from '../../Auth/Auth';

const BtnContainer = styled.div`
	max-width: 400px;
	width: 100%;
	display: flex;
	flex-flow: row;
`;

let btn1 = 'Login',
	btn2 = 'Sign Up';
let auth = new Auth0();

let handleLogin = () => {
	auth.login();
};

let handleSignUp = () => {
	auth.signUp();
};

const SignInSignUp = () => {
	return (
		<StyledSignInUp>
			<BtnContainer>
				<Button btnprop={btn1} handleClick={handleLogin} />
				<Button btnprop={btn2} handleClick={handleSignUp} />
			</BtnContainer>
		</StyledSignInUp>
	);
};

export default SignInSignUp;
