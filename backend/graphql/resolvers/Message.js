require('dotenv').config();
const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');
const Event = require('../../models/Event');

const { object_str, action_str } = require('./ResolverHelpers');

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
				)
				.then(async message => {
					try {
						await new Event({
							team: message.team._id,
							user: message.user._id,
							action_string: action_str.added,
							object_string: object_str.message,
							event_target_id: message._id
						})
							.save()
							.then(event => {
								// console.log('should be a success', event);
							});
					} catch (error) {
						console.error('Could not add event', error);
					}
				}),

		updateMessage: (_, { input }) => {
			const { id } = input;
			return Message.findById(id).then(message => {
				if (message) {
					return Message.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					)
						.populate('user team tag subscribedUsers')
						.then(async message => {
							try {
								await new Event({
									team: message.team._id,
									user: message.user._id,
									action_string: action_str.edited,
									object_string: object_str.message,
									event_target_id: message._id
								})
									.save()
									.then(event => {
										// console.log('should be a success', event);
									});
							} catch (error) {
								console.error('Could not add event', error);
							}
						});
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
					// console.log('the item in question: ', message);
					try {
						await new Event({
							team: message.team._id,
							user: message.user._id,
							action_string: action_str.deleted,
							object_string: object_str.message,
							event_target_id: null
						})
							.save()
							.then(event => {
								// console.log('should be a success', event);
							});
					} catch (error) {
						console.error('Could not add event', error);
					}
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
			)
				.populate('user team tag subscribedUsers')
				.then(async item => {
					// console.log(item);
					if (item) {
						try {
							await new Event({
								team: item.team._id,
								user: _id,
								action_string: action_str.subscribed,
								object_string: object_str.message,
								event_target_id: item._id
							})
								.save()
								.then(event => {
									// console.log('\n\nSubscribe Event added\n\n', event);
								});
						} catch (error) {
							console.error('Could not add event', error);
						}
					} else {
						throw new ValidationError("Message doesn't exist");
					}
				}),
		unsubscribe: (_, { input: { id } }, { user: { _id } }) =>
			Message.findOneAndUpdate(
				{ _id: id },
				{ $pull: { subscribedUsers: _id } },
				{ new: true }
			)
				.populate('user team tag subscribedUsers')
				.then(async item => {
					// console.log(item);
					if (item) {
						try {
							await new Event({
								team: item.team._id,
								user: _id,
								action_string: action_str.unsubscribed,
								object_string: object_str.message,
								event_target_id: item._id
							})
								.save()
								.then(event => {
									// console.log('\n\n Unsubscribe Event added\n\n', event);
								});
						} catch (error) {
							console.error('Could not add event', error);
						}
					} else {
						throw new ValidationError("Message doesn't exist");
					}
				})
	}
};

module.exports = messageResolvers;
