const { Schema, model } = require('mongoose');

const DocComment = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		document: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
		content: { type: String, required: true }
	},
	{ timestamps: true }
);

module.exports = model('DocComment', DocComment);
