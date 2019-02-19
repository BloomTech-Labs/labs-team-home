// import React from 'react';
// import styled from 'styled-components';
// import StyledSignInUp, { TextIMG } from '../styles/SignInSignUpStyled';
// import textLogo from '../../assets/Sveza_white.svg';
// import Button from '@material-ui/core/Button';

// const BtnContainer = styled.div`
// 	max-width: 400px;
// 	width: 100%;
// 	display: flex;
// 	flex-flow: row;
// 	margin-top: 200px;
// `;

// const BtnStyles = {
// 	backgroundColor: 'transparent',
// 	color: '#fff',
// 	boxShadow: '0px 0px 0px #ddd',
// 	borderRadius: '0',
// 	borderBottom: 'solid 1px #FAED26',
// 	margin: '0 20px',
// 	fontSize: '1.2rem',
// 	fontWeight: '100',
// 	lineHeight: '0.8'
// };

// let btn1 = 'Login',
// 	btn2 = 'Sign Up';

// const SignInSignUp = ({ handleLogin, handleSignUp }) => {
// 	return (
// 		<StyledSignInUp>
// 			<TextIMG alt={'TeamHome banner'} src={textLogo} />
// 			<BtnContainer>
// 				<Button
// 					style={BtnStyles}
// 					btnprop={btn1}
// 					onClick={() => {
// 						handleLogin();
// 					}}
// 				>
// 					Login
// 				</Button>
// 				<Button
// 					style={BtnStyles}
// 					btnprop={btn2}
// 					onClick={() => {
// 						handleSignUp();
// 					}}
// 				>
// 					Sign Up
// 				</Button>
// 			</BtnContainer>
// 		</StyledSignInUp>
// 	);
// };

// export default SignInSignUp;
