const { Schema, model } = require('mongoose');

// example document
// {
// 	name: 'tag',
// 	team: '5c358baf93b69c7c387fb817'
// };

const Tag = new Schema({
	name: { type: String, trim: true, required: true },
	team: {
		type: Schema.Types.ObjectId,
		ref: 'Team',
		required: true
	}
});

module.exports = model('Tag', Tag);
