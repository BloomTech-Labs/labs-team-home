require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const UserModel = require('../models/User');

const { MsgComment, Tag, Team, User, Message } = require('../graphql/schema');
const resolvers = require('../graphql/resolvers');
const { AUTH0_DOMAIN, MONGODB_URI } = process.env;

module.exports = app => {
	app.use(express.json());
	app.use(cors());
	app.use(helmet());
	mongoose
		.connect(
			MONGODB_URI,
			{ useNewUrlParser: true }
		)
		.then(() => console.log('MongoDB connected.'))
		.catch(err => console.error(err));

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
		context: ({ req }) => {
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
			const user = new Promise((resolve, reject) => {
				jwt.verify(token, getKey, options, (err, decoded) => {
					if (err) {
						console.error(err);
						return reject(new Error('Authentication failed'));
					}
					resolve(decoded);
					return (
						decoded.sub &&
						UserModel.findOne({ authId: decoded.sub }).then(
							(
								exists // looks if a user with the auth0 credentials exists in the database and creates one if there isn't
							) =>
								!exists &&
								new UserModel({ authId: decoded.sub })
									.save()
									.then(newUser => console.log(newUser))
						)
					);
				});
			});
			return {
				user
			};
		}
	});
	server.applyMiddleware({ app });
};
