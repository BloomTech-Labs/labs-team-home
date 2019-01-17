import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom';
// import styled from 'styled-components';
import SignInSignUp from '../components/SignInSignUp';
import LogoBanner from '../components/LandingLogoBanner';
import Auth0 from '../../Auth/Auth';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const BigOlQuery = id => {
	return (
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
	);
};

const GET_USER = gql`
	{
		users {
			firstName
		}
	}
`;

export default class LandingView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: new Auth0(),
			id: null
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

				localStorage.setItem('accessToken', authResult.accessToken);
				localStorage.setItem('profile', JSON.stringify(profile));
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
				<SignInSignUp
					handleLogin={this.handleLogin}
					handleSignUp={this.handleSignUp}
				/>
				<BigOlQuery />
				<LogoBanner />
			</div>
		);
	}
}
