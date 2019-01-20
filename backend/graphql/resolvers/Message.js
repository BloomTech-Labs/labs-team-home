require('dotenv').config();
const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');

const { ValidationError } = require('apollo-server-express');

const messageResolvers = {
	Query: {
		messages: () => Message.find().populate('user team tags subscribedUsers'),
		findMessage: (_, { input: { id } }) =>
			Message.findById(id)
				.populate('user team tags subscribedUsers')
				.then(message => message),
		findMessagesByTeam: (_, { input: { team } }) =>
			Message.find({ team: team }).populate('user team tags subscribedUsers')
	},
	Mutation: {
		addMessage: (_, { input }, { user: { _id } }) =>
			new Message({
				...input,
				user: _id,
				subscribedUsers: [_id]
			})
				.save()
				.then(message =>
					message.populate('user team tags subscribedUsers').execPopulate()
				),
		updateMessage: (_, { input }) => {
			const { id } = input;
			return Message.findById(id).then(message => {
				if (message) {
					return Message.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user team tags subscribedUsers');
				} else {
					throw new ValidationError("Message doesn't exist");
				}
			});
		},
		deleteMessage: (_, { input: { id } }) =>
			Message.findById(id).then(async message => {
				if (message) {
					await Message.findOneAndDelete({ _id: id });
					await MsgComment.deleteMany({ message: message._id });
					return message;
				} else {
					throw new ValidationError("Message doesn't exist");
				}
			})
	}
};

module.exports = messageResolvers;
