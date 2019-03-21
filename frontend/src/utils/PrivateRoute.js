import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Query } from 'react-apollo';
import { CURRENT_USER } from '../constants/queries';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (localStorage.token) {
				if (
					jwt_decode(localStorage.token).exp > Math.floor(Date.now() / 1000) // checks if token is a JWT and if it isn't expired
				) {
					return (
						<Query query={CURRENT_USER}>
							{({ loading, error, data: { currentUser } }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								if (currentUser) {
									// checks if user exists in the database, if not redirects to settings page for account creation
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
				return <Redirect to="/" />;
			}
		}}
	/>
);

export default PrivateRoute;
