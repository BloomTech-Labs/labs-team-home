import React from 'react';
import { Collapse, Nav, NavItem } from 'reactstrap';
import LandingButton from '../components/LandingButton';

const LandingNavOptions = ({ handleLogin, handleSignUp, isOpen }) => {
	return (
		<Collapse isOpen={isOpen} navbar>
			<Nav className="ml-auto nav-btns" navbar>
				<NavItem>
					<LandingButton clickFxn={handleLogin} label="Login" />
				</NavItem>
				<NavItem>
					<LandingButton clickFxn={handleSignUp} label="Sign Up" />
				</NavItem>
			</Nav>
		</Collapse>
	);
};

export default LandingNavOptions;
