const { Schema, model } = require('mongoose');
const yup = require('yup');

// example document
// {
// 	user: '5c358c48885c9d7c41062885',
// 	team: '5c358baf93b69c7c387fb817',
// 	content: 'words',
//  image: "http://image.com/image"
// 	likes: [
// 		'5c358baf93b69c7c387fb843',
// 		'5c358baf93b69c7c387fb234',
// 		'5c358baf93b69c7c387fb234'
// 	]
// };

const MsgComment = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		message: {
			type: Schema.Types.ObjectId,
			ref: 'Message',
			required: true
		},
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

module.exports = model('MsgComment', MsgComment);
