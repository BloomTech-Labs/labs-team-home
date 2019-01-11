import React from 'react';
import styled from 'styled-components';
import BtnStyled from '../styles/SignInSignUpButtonStyled';

const Button = props => {
	let btnLabel = props.btnprop;
	return <BtnStyled>{btnLabel}</BtnStyled>;
};

export default Button;
