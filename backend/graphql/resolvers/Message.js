require('dotenv').config();
const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');

const { ValidationError } = require('apollo-server-express');

const messageResolvers = {
	Query: {
		messages: () => Message.find().populate('user team tag subscribedUsers'),
		findMessage: (_, { input: { id } }) =>
			Message.findById(id)
				.populate('user team tag subscribedUsers')
				.then(message => message),
		findMessagesByTeam: (_, { input: { team } }) =>
			Message.find({ team: team }).populate('user team tag subscribedUsers')
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
					message.populate('user team tag subscribedUsers').execPopulate()
				),
		updateMessage: (_, { input }) => {
			const { id } = input;
			return Message.findById(id).then(message => {
				if (message) {
					return Message.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user team tag subscribedUsers');
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
			}),
		subscribe: (_, { input: { id } }, { user: { _id } }) =>
			Message.findOneAndUpdate(
				{ _id: id },
				{ $addToSet: { subscribedUsers: _id } },
				{ new: true }
			).populate('user team tag subscribedUsers'),
		unsubscribe: (_, { input: { id } }, { user: { _id } }) =>
			Message.findOneAndUpdate(
				{ _id: id },
				{ $pull: { subscribedUsers: _id } },
				{ new: true }
			).populate('user team tag subscribedUsers')
	}
};

module.exports = messageResolvers;
