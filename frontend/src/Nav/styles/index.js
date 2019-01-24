import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	font-family: Comfortaa;
	color: #f1fcef;
	text-decoration: none;
	margin: 5px;
	font-weight: bold;
	background: none;
	text-align: center;
	padding: 0.6em 1em;
	border: 1px solid gray;
	border-radius: 4px;
	transition: 0.4s;
	&:hover {
		background-color: #f1fcef;
		color: #17151b;
		transform: scale(1.1, 1.1);
	}
`;
