import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
// import styled from 'styled-components';
import SignInSignUp from '../components/SignInSignUp';
import LogoBanner from '../components/LandingLogoBanner';

export default class LandingView extends Component {
	render() {
		return (
			<div>
				<SignInSignUp />
				<LogoBanner />
			</div>
		);
	}
}
