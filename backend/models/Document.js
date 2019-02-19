const { Schema, model } = require('mongoose');

const Document = new Schema(
	{
		doc_url: {
			type: String,
			required: true
		},
		team: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
			required: true
		},
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		folder: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
		title: { type: String, trim: true, required: true },
		content: { type: String },
		images: [{ type: String }],
		comments: [{ type: Schema.Types.ObjectId, ref: 'DocComment' }]
	},
	{ timestamps: true }
);

module.exports = model('Document', Document);
