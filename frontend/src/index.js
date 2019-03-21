import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const URI =
	process.env.NODE_ENV === 'production'
		? 'https://team-home-2-graphql-mongodb.herokuapp.com/graphql'
		: 'http://localhost:5000/graphql';

const client = new ApolloClient({
	uri: URI,
	request: operation => {
		operation.setContext(context => ({
			headers: {
				...context.headers,
				authorization: localStorage.getItem('token')
			}
		}));
	}
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ApolloProvider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
