require('dotenv').config();
const Message = require('../../models/Message');
const User = require('../../models/User');
const sgMail = require('@sendgrid/mail');

const {
	TWILIO_SID,
	TWILIO_TOKEN,
	TWILIO_NUMBER,
	SENDGRID_API_KEY
} = process.env;
const textClient = require('twilio')(TWILIO_SID, TWILIO_TOKEN);
sgMail.setApiKey(SENDGRID_API_KEY);

const messageResolvers = {
	Query: {
		messages: () =>
			Message.find().populate('user team tags comments subscribedUsers'),
		findMessage: (_, { input: { id } }) => {
			return Message.findById(id).populate(
				'user team tags comments subscribedUsers'
			);
		},
		findMessagesByTeam: (_, { input: { team } }) => {
			return Message.find({ team: team }).populate(
				'user team tags comments subscribedUsers'
			);
		}
	},
	Mutation: {
		addMessage: (_, { input }) => {
			const { title, user, content } = input;
			if (!title && !user && !content)
				throw new Error('Title, user and content are required.');
			return new Message(input).save().then(message => {
				User.findById(user).then(
					({
						firstName,
						email,
						phoneNumber,
						toggles: { receiveEmails, receiveTexts }
					}) => {
						const responseText = `Hi ${firstName}, you created a message with the title ${
							message.title
						}`;
						phoneNumber &&
							receiveTexts &&
							textClient.messages
								.create({
									body: responseText,
									from: TWILIO_NUMBER,
									to: `+1${phoneNumber}`
								})
								.then(message => console.log(message.sid))
								.done();
						email &&
							receiveEmails &&
							sgMail.send({
								to: email,
								from: 'test@example.com',
								subject: 'You added a message on Team Home',
								text: responseText,
								html: /* HTML */ `
									<div>
										<h1>Team Home</h1>
										<p>${responseText}</p>
									</div>
								`
							});
					}
				);
				return message
					.populate('user team tags comments subscribedUsers')
					.execPopulate();
			});
		},
		updateMessage: (_, { input }) => {
			const {
				id,
				title,
				user,
				content,
				images,
				tags,
				comments,
				subscribedUsers,
				createdAt,
				updatedAt
			} = input;
			if (
				!id &&
				!title &&
				!user &&
				!content &&
				!images &&
				!tags &&
				!comments &&
				!subscribedUsers &&
				!createdAt &&
				!updatedAt
			)
				throw new Error('No fields changed');
			return Message.findById(id).then(message => {
				if (message) {
					return Message.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user team tags comments subscribedUsers');
				} else {
					throw new Error("Message doesn't exist");
				}
			});
		},
		deleteMessage: (_, { input: { id } }) => {
			return Message.findById(id).then(message => {
				if (message) return Message.findOneAndDelete({ _id: id });
				else {
					throw new Error("Message doesn't exist");
				}
			});
		}
	}
};

module.exports = messageResolvers;
