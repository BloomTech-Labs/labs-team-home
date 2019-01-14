import React from 'react';
import styled from 'styled-components';
import Button from '../components/SignInUpButton';
import StyledSignInUp from '../styles/SignInSignUpStyled';

const btnContainer = styled.div`
	max-width: 400px;
	width: 100%;
	display: flex;
	flex-flow: row;
`;

let btn1 = 'Sign In',
	btn2 = 'Sign Up';
const SignInSignUp = () => {
	return (
		<StyledSignInUp>
			<btnContainer>
				<Button btnprop={btn1} />
				<Button btnprop={btn2} />
			</btnContainer>
		</StyledSignInUp>
	);
};

export default SignInSignUp;
