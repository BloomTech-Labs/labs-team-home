import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import * as query from '../constants/queries';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (localStorage.token) {
				if (
					jwt_decode(localStorage.token).exp > Math.floor(Date.now() / 1000) // checks if token is a JWT and if it isn't expired
				) {
					return (
						<Query query={query.CURRENT_USER}>
							{({ loading, error, data: { currentUser } }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								if (currentUser) {
									return <Component {...props} currentUser={currentUser} />;
								} else if (props.location.pathname === '/settings') {
									return <Component {...props} currentUser={null} />;
								} else {
									return <Redirect to="/settings" />;
								}
							}}
						</Query>
					);
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

export default PrivateRoute;
