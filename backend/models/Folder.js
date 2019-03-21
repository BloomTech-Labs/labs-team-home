const { Schema, model } = require('mongoose');

const Folder = new Schema(
	{
		title: {
			type: String,
			trim: true,
			minlength: [2, 'Folder names must have at least 2 characters.'],
			maxlength: [30, 'Folder names must be no longer than 30 characters.'],
			required: true
		},
		team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
	},
	{ timestamps: true }
);

module.exports = model('Folder', Folder);
