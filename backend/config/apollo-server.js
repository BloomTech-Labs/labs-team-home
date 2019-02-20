require('dotenv').config();
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');
const UserModel = require('../models/User');
const { AUTH0_DOMAIN } = process.env;

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});
// testing my push/pull request and branch auth. sorry for the frivolous pull request.
const context = async ({ req }) => {
	let currentUser;
	const token = req.headers.authorization;
	const client = jwksClient({
		jwksUri: `${AUTH0_DOMAIN}/.well-known/jwks.json`
	});
	const getKey = (header, cb) =>
		client.getSigningKey(header.kid, (err, key) => {
			let signingKey = key.publicKey || key.rsaPublicKey;
			cb(null, signingKey);
		});
	const options = {
		aud: `https://team-home-2-graphql-mongodb.herokuapp.com`,
		iss: `${AUTH0_DOMAIN}/api/v2`,
		algorithms: ['RS256']
	};
	try {
		currentUser = await new Promise((resolve, reject) =>
			jwt.verify(token, getKey, options, (err, decoded) => {
				if (err) {
					reject(err);
				}
				return (
					decoded &&
					UserModel.findOne({ authId: decoded.sub }).then(
						existingUser =>
							existingUser
								? resolve(existingUser) // adds user to Apollo context, giving all resolvers access to the user
								: resolve(decoded) // adds the decoded token to the Apollo context
					)
				);
			})
		);
	} catch (e) {
		throw new AuthenticationError(`${e}`);
	}
	return { user: currentUser };
};

const server = new ApolloServer({
	schema,
	context,

	// debug: true,
	playground: true,
	// tracing: true,
	introspection: true
});

module.exports = app => server.applyMiddleware({ app });
