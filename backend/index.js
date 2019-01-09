require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const helmet = require('helmet');

const { MsgComment, Tag, Team, User, Message } = require('./graphql/schema');

const resolvers = require('./graphql/resolvers');

const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors);
app.use(helmet);

const port = process.env.PORT || 5000;

mongoose
	.connect(
		process.env.MONGO,
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

app.listen(port, err => {
	if (err) {
		console.error(err);
	}
	console.log(`Server running on port ${port}`);
});
