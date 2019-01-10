import React from 'react';
import styled from 'styled-components';
import Button from '../components/SignInUpButton';
import StyledSignInUp from '../styles/SignInSignUpStyled';

let btn1 = 'Sign In',
	btn2 = 'Sign Up';
const SignInSignUp = () => {
	return (
		<StyledSignInUp>
			<Button btnprop={btn1} />
			<Button btnprop={btn2} />
		</StyledSignInUp>
	);
};

export default SignInSignUp;
