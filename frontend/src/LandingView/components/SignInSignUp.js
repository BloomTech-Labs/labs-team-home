import React from 'react';
import styled from 'styled-components';
import Button from '../components/SignInUpButton';

let btn1 = 'Sign In',
	btn2 = 'Sign Up';
export default (SignInSignUp = () => {
	return (
		<div>
			<Button btnprop={btn1} />
			<Button btnprop={btn2} />
		</div>
	);
});
