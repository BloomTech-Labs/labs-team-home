const { Schema, model } = require('mongoose');

const Event = new Schema(
	{
		team: {
			type: Schema.Types.ObjectId,
			ref: 'Team',
			required: true
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		action_string: {
			type: String,
			required: true
		},
		object_string: {
			type: String,
			required: true
		},
		event_target_id: {
			type: Schema.Types.ObjectId
		}
	},
	{ timestamps: true }
);

module.exports = model('Event', Event);
