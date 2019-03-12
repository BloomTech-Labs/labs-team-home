import React from 'react';

import styled from 'styled-components';
import mediaQueryFor from './_global_styles/responsive_querie';
import { colors } from './colorVariables';

// ------------- MUI imports ---------------------- //
import CircularProgress from '@material-ui/core/CircularProgress';

//Lading Spinner styles
const LoadingDiv = styled.div`
	color: ${props => props.color};
	margin: 0 auto;
	padding: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

//loading Spinner Component: Purple
export const StyledProgressSpinner = () => {
	return (
		<LoadingDiv color={colors.button}>
			<CircularProgress color="inherit" />
		</LoadingDiv>
	);
};

//loading Spinner Component: Yellow
export const StyledProgressSpinnerSecondary = () => {
	return (
		<LoadingDiv color={colors.header}>
			<CircularProgress color="inherit" />
		</LoadingDiv>
	);
};

const AppStyles = styled.div`
	margin: 0 auto;
	height: 100vh;
	.fade-enter {
		opacity: 0;
	}
	.fade-enter.fade-enter-active {
		opacity: 1;
		transition: opacity 2000ms ease-out;
	}
	.fade-exit {
		opacity: 1;
	}

	.fade-exit.fade-exit-active {
		opacity: 0;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		transition: opacity 2000ms ease-out;
	}
`;

const BackgroundIMG = styled.img`
	position: fixed;
  width: 900px;
  left:5%;
  top: 20px;
  z-index:-10;
  opacity: 0.1;
  /* filter: drop-shadow(-2px 10px 6px #111); */
  filter: drop-shadow(-1px 5px 5px #111);
  ${mediaQueryFor.lgDevice`
    width:70%;
    left: 5%;
    top: 5%;
    `}
    ${mediaQueryFor.mdDevice`
    width:80%;
  left: 5%;
    top: 12%;
    `}
    ${mediaQueryFor.smDevice`
    width:100%;
    left:-10%;
    top: 15%;
  `}
`;

export default AppStyles;
export { BackgroundIMG };
