require('dotenv').config();
const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const axios = require('axios');

const UserModel = require('../models/User');
const { MsgComment, Tag, Team, User, Message } = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');
const { AUTH0_DOMAIN, MONGODB_URI } = process.env;

module.exports = app => {
	app.use(express.json());
	app.use(cors());
	app.use(helmet());
	app.use(express.static('docs'));
	mongoose
		.connect(
			MONGODB_URI,
			{ useNewUrlParser: true }
		)
		.then(() => console.log('MongoDB connected.'))
		.catch(err => console.error(err));
	mongoose.set('useFindAndModify', false);
	const { ObjectId } = mongoose.Types; // makes mongodb ObjectIds readable by graphql
	ObjectId.prototype.valueOf = function() {
		return this.toString();
	};
	const typeDefs = [MsgComment, Tag, Team, User, Message];
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers
	});
	const server = new ApolloServer({
		schema,
		context: async ({ req }) => {
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
				aud: 'http://team-home.herokuapp.com/',
				iss: `${AUTH0_DOMAIN}/api/v2/`,
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
								(
									existingUser // looks if a user with the auth0 credentials exists in the database and creates one if there isn't
								) =>
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
		}
	});
	server.applyMiddleware({ app });
};
