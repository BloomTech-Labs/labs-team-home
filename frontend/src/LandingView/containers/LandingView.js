import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
// import styled from 'styled-components';
import SignInSignUp from '../components/SignInSignUp';
import LogoBanner from '../components/LandingLogoBanner';
import Auth0 from '../../Auth/Auth';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER = gql`
	query User($authId: String) {
		findUser(authId: $authId) {
			firstName
			lastName
			email
		}
	}
`;

export default class LandingView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: new Auth0(),
			id: null,
			hasProfile: false
		};
	}

	componentDidMount() {
		this.state.auth.lock.on('authenticated', authResult => {
			localStorage.setItem('token', authResult.accessToken);
			this.state.auth.lock.getUserInfo(authResult.accessToken, function(
				error,
				profile
			) {
				if (error) {
					// Handle error
					return;
				}
				console.log(profile);
			});
		});
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
				<Query query={GET_USER}>
					{({ loading, error, data }) => {
						if (loading) return 'Loading...';
						if (error) return `Error! ${error.message}`;
						if (data) {
							console.log('user data', data);
						}
						return <div> AKDJFKAD </div>;
					}}
				</Query>
				<SignInSignUp
					handleLogin={this.handleLogin}
					handleSignUp={this.handleSignUp}
				/>
				<LogoBanner />
			</div>
		);
	}
}
