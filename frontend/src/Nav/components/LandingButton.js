import React from 'react';
import styled from 'styled-components';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';

// yellow text rgb(236, 255, 38); #ecff26;
const LandBtn = styled.button`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	font-family: Comfortaa;
	color: #f1fcef;
	color: #000;
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
		transform: scale(1.05, 1.05);
	}
`;

const LandButton = props => {
	return (
		<div>
			<LandBtn
				onClick={() => {
					props.clickFxn();
				}}
			>
				{props.label}
			</LandBtn>
		</div>
	);
};

export default LandButton;
