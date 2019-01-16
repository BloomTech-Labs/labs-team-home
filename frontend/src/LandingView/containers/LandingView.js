import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
// import styled from 'styled-components';
import SignInSignUp from '../components/SignInSignUp';
import LogoBanner from '../components/LandingLogoBanner';
import Auth0 from '../../Auth/Auth';
import gql from 'graphql-tag';

const GET_USER = gql`
	{
		users {
			_id
		}
	}
`;

export default class LandingView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: new Auth0()
		};
	}

	componentDidMount() {
		this.state.auth.lock.on('authenticated', authResult =>
			localStorage.setItem('token', authResult.accessToken)
		);
	}

	// findUserInfo = () => {

	// }

	handleLogin = () => {
		this.state.auth.login();
	};

	handleSignUp = () => {
		this.state.auth.signUp();
	};

	render() {
		return (
			<div>
				<SignInSignUp
					handleLogin={this.handleLogin}
					handleSignUp={this.handleSignUp}
				/>
				<LogoBanner />
			</div>
		);
	}
}
