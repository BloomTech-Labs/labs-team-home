require('dotenv').config();
const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');
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
			return Message.findById(id)
				.populate('user team tags comments subscribedUsers')
				.then(message => {
					console.log(message);
					return message;
				});
		},
		findMessagesByTeam: (_, { input: { team } }) => {
			return Message.find({ team: team }).populate(
				'user team tags comments subscribedUsers'
			);
		}
	},
	Mutation: {
		addMessage: (_, { input }, { user: { _id } }) => {
			const { title, content } = input;
			if (!title && !content)
				throw new Error('Title, user and content are required.');
			return new Message({
				...input,
				user: _id,
				subscribedUsers: [_id]
			})
				.save()
				.then(message =>
					message
						.populate('user team tags comments subscribedUsers')
						.execPopulate()
				);
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
				if (message)
					return Message.findOneAndDelete({ _id: id }).then(({ _id }) =>
						MsgComment.deleteMany({ message: _id }).then(() => message)
					);
				else {
					throw new Error("Message doesn't exist");
				}
			});
		}
	}
};

module.exports = messageResolvers;
