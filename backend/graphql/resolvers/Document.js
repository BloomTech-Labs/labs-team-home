require('dotenv').config();
const Document = require('../../models/Document');

const documentResolver = {
	Query: {
		documents: () => Document.find().populate('user name')
	}
};

module.exports = documentResolver;
