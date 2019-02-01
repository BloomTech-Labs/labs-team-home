import styled from 'styled-components';
import mediaQueryFor from '../../../_global_styles/responsive_querie';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { colors } from '../../../colorVariables';

const styles = {
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400
	},
	input: {
		marginLeft: 8,
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		width: 1,
		height: 28,
		margin: 4
	}
};

export const Container = styled.div`
	position: relative;
	top: 50px;
	width: 80%;
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	margin-left: 0 5% 0 5%;
	color: white;
	font-family: Comfortaa;

	h3 {
		color: ${colors.text};
		margin: 0 auto;
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
`;

const TeamsList = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-flow: column;
	color: #f1fcef;
	h3 {
		font-size: 2.4rem;
	}
`;

const LinkStyles = styled.a`
	text-decoration: none;
`;

export { Form, TeamsList, LinkStyles, Input, Button };
