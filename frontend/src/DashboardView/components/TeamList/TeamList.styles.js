import styled from 'styled-components';
import mediaQueryFor from '../../../_global_styles/responsive_querie';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { colors } from '../../../colorVariables';
import { Link } from 'react-router-dom';

export const Container = styled.div`
	position: relative;
	top: 90px;
	width: 80%;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	margin-left: 0 5% 0 5%;
	color: white;
	font-family: Comfortaa;

	h1 {
		color: ${colors.header};
	}
	${mediaQueryFor.mdDevice`

      width:100%;
    `}
`;

const Form = styled(Paper)`
	display: flex;
	flex-flow: row;
	justify-items: center;
	width: 100%;
	margin: 3% auto;
	font-family: Comfortaa;
	color: ${colors.text};
	border-radius: 2px;
	background-color: white;
	box-shadow: none;

	h3 {
		font-family: Comfortaa;
		color: ${colors.text};
		margin: 0 auto;
	}
	// button {
	// 	display: inline-block;
	// 	border: none;
	// 	margin: 0;
	// 	text-decoration: none;
	// 	background-color: #17151b;
	// 	color: #ffd17c;
	// 	font-family: sans-serif;
	// 	font-size: 2.2rem;
	// 	cursor: pointer;
	// 	text-align: center;
	// 	transition: background-color 250ms ease-in-out, transform 150ms ease;
	// 	-webkit-appearance: none;
	// 	-moz-appearance: none;
	// 	:hover {
	// 		background-color: #ffd17c;
	// 		color: #17151b;
	// 	}
	// }
`;

const Input = styled(InputBase)`
	background-color: white;
	color: black;
`;

const Button = styled(IconButton)`
	background-color: ${colors.button};
	color: ${colors.text};

	:hover {
		background-color: rgba(107, 40, 59, 0.7);
	}
`;

const TeamsList = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-flow: column;
	color: ${colors.text};
	h3 {
		font-size: 2.4rem;
	}
`;

const LinkStyles = styled(Link)`
	text-decoration: none;
	background-color: ${colors.button};
	margin-bottom: 20px;
	border-radius: 5px;
`;

export { Form, TeamsList, LinkStyles, Input, Button };
