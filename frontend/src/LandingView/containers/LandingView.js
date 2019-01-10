import React, { Component } from 'react';
import styled from 'styled-components';
import SignInSignUp from '../components/SignInSignUp';

export default class LandingView extends Component {
	render() {
		return (
			<div>
				<SignInSignUp />
			</div>
			// {/* <Logo></Logo> */}
			// <Banner></Banner>
			// <XTRContent></XTRContent>
		);
	}
}
