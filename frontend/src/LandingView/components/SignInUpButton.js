import React from 'react';
import styled from 'styled-components';
// import BtnStyled from '../styles/SignInSignUpButtonStyled';

const BtnStyled = styled.button`
	color: #f1fcef;
	background: none;
	font-size: 1em;
	margin: 0.5em;
	padding: 0.25em 1em;
	border: 2px solid gray;
	border-radius: 3px;
	&:hover {
		background-color: #17151b;
	}
`;

const Button = props => {
	let btnLabel = props.btnprop;
	return (
		<BtnStyled
			onClick={() => {
				props.handleClick();
			}}
		>
			{btnLabel}
		</BtnStyled>
	);
};

export default Button;
