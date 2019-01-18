import React from 'react';
import { Link } from 'react-router-dom';
import { StyledLink } from './styles/index';

const Nav = () => {
	return (
		<div>
			<div>
				<StyledLink to="/home">Home</StyledLink>
				<StyledLink to="/dashboard">Dashboard</StyledLink>
				<StyledLink to="/settings">Settings</StyledLink>
			</div>
		</div>
	);
};

export default Nav;
