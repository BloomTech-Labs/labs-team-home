import { Link } from 'react-router-dom';

// ------------- MUI Imports ---------------------- //
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import { colors } from '../../../colorVariables';
import mediaQueryFor from '../../../_global_styles/responsive_querie';

const Container = styled.div`
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
		padding-left: 20px;
	}
	${mediaQueryFor.mdDevice`
		margin-bottom: 10px;
    	width:100%;
  `}
`;

const Form = styled(Paper)`
	display: flex;
	flex-flow: row;
	justify-items: space-between;
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

	form {
		width: 100%;
	}
`;

const Input = styled(InputBase)`
	background-color: white;
	color: black;
	width: 90%;
	${mediaQueryFor.smDevice`
		width: 85%;
	`}
`;

const Button = styled(IconButton)`
	background-color: ${colors.button};
	color: ${colors.text};
	margin-left: 1%;

	:hover {
		background-color: rgba(107, 40, 59, 0.7);
	}
`;

const TeamsList = styled.div`
	width: ${mediaQueryFor.smDevice ? '95%' : '100%'};
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
	margin-bottom: 10px;
	border-radius: 5px;

	${mediaQueryFor.mdDevice`
		margin-bottom: 0;
		border-bottom: 1px solid ${colors.border};
	`}
`;

export { Form, TeamsList, LinkStyles, Input, Button, Container };
