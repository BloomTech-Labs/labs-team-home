require('dotenv').config();
const {
	connect,
	Types: { ObjectId }
} = require('mongoose');
const { MONGODB_URI } = process.env;

module.exports = () => {
	connect(
		MONGODB_URI,
		// these settings are to disable mongoose's default behavior of using deprecated MongoDB methods for the sake of backwards compatability
		// https://mongoosejs.com/docs/deprecations.html
		{ useNewUrlParser: true, useCreateIndex: false, useFindAndModify: false }
	)
		.then(() => console.log('MongoDB connected.'))
		.catch(err => console.error(err));
	// makes mongodb ObjectIds readable by GraphQL
	ObjectId.prototype.valueOf = function() {
		return this.toString();
	};
};
