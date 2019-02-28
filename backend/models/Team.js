const { Schema, model } = require('mongoose');

const Team = new Schema({
	name: { type: String, trim: true, required: true },
	users: [
		{
			user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
			admin: { type: Boolean, default: false }
		}
	],
	premium: { type: Boolean, default: false }
});

module.exports = model('Team', Team);
