import React from 'react';
import { Link } from 'react-router-dom';
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

let btn1 = 'Sign In',
	btn2 = 'Sign Up';

let auth = new Auth0();
// auth.signUp();

let saySomething = () => {
	auth.login();
};

const SignInSignUp = () => {
	return (
		<StyledSignInUp>
			<BtnContainer>
				<button
					btnprop={btn1}
					onClick={() => {
						auth.login();
					}}
				/>
				{/* <Button btnprop={btn1} onClick={() => {}} /> */}
				<Button btnprop={btn2} />
			</BtnContainer>
		</StyledSignInUp>
	);
};

export default SignInSignUp;
