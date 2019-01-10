import React, { Component } from 'react';
import styled from 'styled-components';
import SignInSignUp from '../components/SignInSignUp';
import LogoBanner from '../components/LandingLogoBanner';
import BottomContent from '../components/BottomContent';

export default class LandingView extends Component {
	render() {
		return (
			<div>
				<SignInSignUp />
				<LogoBanner />
				<BottomContent />
			</div>

			// <XTRContent></XTRContent>
		);
	}
}
