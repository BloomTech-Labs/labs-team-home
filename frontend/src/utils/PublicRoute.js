import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const PublicRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			if (localStorage.token) {
				if (
					jwt_decode(localStorage.token).exp > Math.floor(Date.now() / 1000) // checks if token is a JWT and if it isn't expired
				) {
					return <Redirect to="/dashboard" />;
				} else {
					localStorage.removeItem('token');
					return <Component {...props} />;
				}
			}
			return <Component {...props} />;
		}}
	/>
);

export default PublicRoute;
