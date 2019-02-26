const { Schema, model } = require('mongoose');

const General = new Schema({
	documents: {
		type: Schema.Types.ObjectId,
		ref: 'Document'
	},
	folders: {
		type: Schema.Types.ObjectId,
		ref: 'Folder'
	},
	docComments: {
		type: Schema.Types.ObjectId,
		ref: 'DocComment'
	},
	messages: {
		type: Schema.Types.ObjectId,
		ref: 'Message'
	},
	comments: {
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}
});

module.exports = model('General', General);
