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
		folder: { type: Schema.Types.ObjectId, ref: 'Folder' },
		title: {
			type: String,
			trim: true,
			required: true,
			minlength: [2, 'Document title must have at least 2 characters.'],
			maxlength: [83, 'Document title must be no longer than 83 characters.']
		},
		textContent: { type: String },
		tag: { type: Schema.Types.ObjectId, ref: 'Tag' },
		images: [{ type: String }],
		comments: [{ type: Schema.Types.ObjectId, ref: 'DocComment' }],
		subscribedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	},
	{ timestamps: true }
);

module.exports = model('Document', Document);
