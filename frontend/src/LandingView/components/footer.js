import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
	max-width: none;
	margin-top: 50px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 50px;
	background: black;
	z-index: 11;
	width: 100%;
	div {
		width: 15%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}

	p {
		color: white;
		margin-bottom: 0;
	}

	a {
		color: white;
		font-size: 1rem;
	}
`;

const Footer = () => {
	return (
		<StyledFooter>
			<div>
				<Link to="/team">Team</Link>
				<Link to="/terms">Terms</Link>
				<Link to="/privacy">Privacy</Link>
			</div>
			<div>
				<p id="copy">&copy; 2019 Arq Inc.</p>
			</div>
		</StyledFooter>
	);
};

export default Footer;
