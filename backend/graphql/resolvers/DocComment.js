require('dotenv').config();
const DocComment = require('../../models/DocComment');
const Document = require('../../models/Document');

const docCommentResolver = {
	Query: {
		docComments: () => DocComment.find().populate('user document')
	}
};

module.exports = docCommentResolver;
