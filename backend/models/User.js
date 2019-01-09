const { Schema, model } = require('mongoose');
const yup = require('yup');

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// example document
// {
// 	firstName: 'John',
// 	lastName: 'Doe',
// 	email: 'john@doe.com',
// 	avatar: 'https://imgur.com/abcdefg',
// 	phoneNumber: '111-111-1111',
// 	toggles: {
// 		receiveEmails: false,
// 		receiveTexts: true
// 	}
// };

const User = new Schema({
	firstName: {
		type: String,
		trim: true,
		required: true,
		minlength: [2, 'First names must be at least 2 characters.'],
		maxlength: [30, 'First names must be no longer than 30 characters.']
	},
	lastName: {
		type: String,
		trim: true,
		required: true,
		minlength: [2, 'Last names must be at least 2 characters.'],
		maxlength: [30, 'Last names must be no longer than 30 characters.']
	},
	email: {
		type: String,
		trim: true,
		required: true
	},
	avatar: {
		type: String,
		trim: true,
		required: true,
		validate: [
			avatar =>
				yup
					.string()
					.url()
					.validate(avatar),
			'Not a valid URL.'
		]
	},
	phoneNumber: {
		type: String,
		trim: true,
		required: true,
		validate: [
			phoneNumber =>
				yup
					.string()
					.matches(phoneRegExp)
					.validate(phoneNumber),
			'Not a valid phone number.'
		]
	},
	toggles: {
		receiveEmails: {
			type: Boolean,
			default: false
		},
		receiveTexts: {
			type: Boolean,
			default: false
		}
	}
});

module.exports = model('User', User);
