require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const { MsgComment, Tag, Team, User, Message } = require('../graphql/schema');

const resolvers = require('../graphql/resolvers');

module.exports = app => {
	app.use(express.json());
	app.use(cors());
	app.use(helmet());
	mongoose
		.connect(
			process.env.MONGODB_URI,
			{ useNewUrlParser: true }
		)
		.then(() => console.log('MLab connected.'))
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
	const server = new ApolloServer({ schema });
	server.applyMiddleware({ app });
};
