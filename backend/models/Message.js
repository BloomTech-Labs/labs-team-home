const { Schema, model } = require('mongoose');

// example document
// {
// 	user: '5c358c48885c9d7c41062885',
// 	team: '5c358baf93b69c7c387fb817',
// 	title: 'words',
// 	content: 'more words',
// 	images: [
// 		'https://imgur.com/img1',
// 		'https://imgur.com/img2',
// 		'https://imgur.com/img3'
// 	],
// 	tags: [
// 		'5c358baf93b69c7c387fb843',
// 		'5c358baf93b69c7c387fb234',
// 		'5c358baf93b69c7c387fb234'
// 	],
// 	comments: [
// 		'5c358baf93b69c7c387fb843',
// 		'5c358baf93b69c7c387fb234',
// 		'5c358baf93b69c7c387fb234'
// 	],
// 	subscribedUsers: [
// 		'5c358baf93b69c7c387fb843',
// 		'5c358baf93b69c7c387fb234',
// 		'5c358baf93b69c7c387fb234'
// 	]
// };

const Message = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		team: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
			required: true
		},
		title: {
			type: String,
			trim: true,
			required: true
		},
		content: {
			type: String,
			required: true
		},
		images: [{ type: String }],
		tag: { type: Schema.Types.ObjectId, ref: 'Tag' },
		comments: [{ type: Schema.Types.ObjectId, ref: 'MsgComment' }],
		subscribedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
	},
	{ timestamps: true }
);

module.exports = model('Message', Message);
