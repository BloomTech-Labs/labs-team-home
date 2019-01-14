import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={props => {
				if (localStorage.token) {
					/**
          if (isAuth) ?
          ( <Component {...props}/> ) : ( <Redirect to={pathname: "/"}/>)
         */
				}
			}}
		/>
	);
}

export default PrivateRoute;
