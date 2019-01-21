import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PrivateRoute = ({
	component: Component,
	data: { currentUser },
	...rest
}) => (
	<Route
		{...rest}
		render={props => {
			if (localStorage.token) {
				if (
					jwt_decode(localStorage.token) &&
					jwt_decode(localStorage.token).exp > Math.floor(Date.now() / 1000) // checks if token is a JWT and if it is expired
				) {
					return <Component {...props} currentUser={currentUser} />;
				} else {
					localStorage.removeItem('token');
					alert('Session expired, please login.');
					return <Redirect to="/" />;
				}
			} else {
				alert('You must login to access that page.');
				return <Redirect to="/" />;
			}
		}}
	/>
);

export default graphql(gql`
	query {
		currentUser {
			_id
			authId
			firstName
			lastName
			email
			phoneNumber
			avatar
			toggles {
				receiveEmails
				receiveTexts
			}
		}
	} # gives the component access to the data of the logged in user
`)(PrivateRoute);
