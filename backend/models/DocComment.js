const { Schema, model } = require('mongoose');
const yup = require('yup');

const DocComment = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		document: { type: Schema.Types.ObjectId, ref: 'Document', required: true },
		content: { type: String, required: true },
		image: {
			type: String,
			validate: [
				avatar =>
					yup
						.string()
						.url()
						.validate(avatar),
				'Not a valid URL.'
			]
		},
		likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
	},
	{ timestamps: true }
);

module.exports = model('DocComment', DocComment);
