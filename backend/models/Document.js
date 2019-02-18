const { Schema, model } = require('mongoose');

const Document = new Schema({
	doc_url: {
		type: String,
		required: true
	},
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	folder: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
	title: { type: String, trim: true, required: true },
	content: { type: String, required: true },
	createdAt: Schema.Types.Date,
	updatedAt: Schema.Types.Date
});

module.exports = model('Document', Document);
