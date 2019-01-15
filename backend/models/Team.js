const { Schema, model } = require('mongoose');

// example document
// {
// 	name: 'team',
// 	users: [
// 		{ user: '5c358baf93b69c7c387fb843', admin: true },
// 		{ user: '5c358baf93b69c7c432qdfa', admin: false },
// 		{ user: '5c358baf93b69c7ck3657kl', admin: false }
// 	],
// 	premium: false
// };

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
