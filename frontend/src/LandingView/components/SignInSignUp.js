import React from 'react';
import styled from 'styled-components';
import Button from '../components/SignInUpButton';
import StyledSignInUp from '../styles/SignInSignUpStyled';

const BtnContainer = styled.div`
	max-width: 400px;
	width: 100%;
	display: flex;
	flex-flow: row;
`;

let btn1 = 'Login',
	btn2 = 'Sign Up';

const SignInSignUp = ({ history }) => {
	auth.lock.on('authenticated', ({ accessToken }) => {
		localStorage.setItem('token', accessToken);
		history.push('/dashboard');
	});

	const handleLogin = () => {
		auth.login();
	};

	const handleSignUp = () => {
		auth.signUp();
	};
	return (
		<StyledSignInUp>
			<BtnContainer>
				<Button btnprop={btn1} handleClick={props.handleLogin} />
				<Button btnprop={btn2} handleClick={props.handleSignUp} />
			</BtnContainer>
		</StyledSignInUp>
	);
};

export default SignInSignUp;
