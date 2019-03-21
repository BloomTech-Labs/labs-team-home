const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');
const { ValidationError } = require('apollo-server-express');
const sgMail = require('@sendgrid/mail');
const Event = require('../../models/Event');

const { object_str, action_str } = require('./ResolverHelpers');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msgCommentResolvers = {
	Query: {
		MsgComments: () => MsgComment.find().populate('user message likes'),
		findMsgComment: (_, { input: { id } }) =>
			MsgComment.findById(id).populate('user message likes'),
		findMsgCommentsByMessage: (_, { input: { message } }) =>
			MsgComment.find({ message: message }).populate('user message likes')
	},
	Mutation: {
		addMsgComment: (_, { input }, { user: { _id, firstName, lastName } }) => {
			const { content } = input;
			return new MsgComment({ ...input, user: _id })
				.save()
				.then(async comment => {
					const message = await Message.findOneAndUpdate(
						// adds comment to parent Message
						{ _id: input.message },
						{ $push: { comments: [comment._id] } },
						{ new: true }
					)
						.populate('team subscribedUsers message')
						.then(async item => {
							// console.log('\n\nItem to be passed: \n\n', item);
							try {
								await new Event({
									team: item.team._id,
									user: item.user,
									action_string: action_str.created,
									object_string: object_str.msgComment,
									event_target_id: item._id
								})
									.save()
									.then(event => {
										// console.log('\n\nshould be a success: \n\n', event);
									});
							} catch (error) {
								console.error('Could not add event', error);
							}
							return item;
						});
					const emails = message.subscribedUsers
						.filter(
							// creates an array of emails of subscribed users, if their email is on file and the user isn't the one adding the message
							user =>
								user.toggles.receiveEmails && user.email && user._id !== _id
						)
						.map(user => user.email);
					emails.length &&
						(await sgMail.send({
							// notifies subscribed users of the new comment
							to: emails,
							from: `${message.team.name.split(' ').join('')}@team.home`,
							subject: `The message ${
								message.title
							} has a new comment from ${firstName} ${lastName} on your team ${
								message.team.name
							}`,
							text: `${content}`,
							html: /* HTML */ `
								<h1>${message.team.name}</h1>
								<div>
									<h2>Message:</h2>
									<h3>${message.title}</h3>
									<p>${message.content}</p>
								</div>
								<div>
									<h2>New comment:</h2>
									<p>${content}</p>
								</div>
							`
						}));
					return comment.populate('user message likes').execPopulate();
				});
		},
		updateMsgComment: (_, { input }) => {
			const { id } = input;
			return MsgComment.findById(id).then(async comment => {
				if (comment) {
					return MsgComment.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					)
						.populate('user message likes')
						.then(async item => {
							// console.log('\n\nItem to be passed: \n\n', item);
							try {
								await new Event({
									team: item.message.team._id,
									user: item.user._id,
									action_string: action_str.edited,
									object_string: object_str.msgComment,
									event_target_id: item.message._id
								})
									.save()
									.then(event => {
										// console.log('\n\nshould be a success: \n\n', event);
									});
							} catch (error) {
								console.error('Could not add event', error);
							}
						});
				} else {
					throw new ValidationError('Comment does not exist');
				}
			});
		},
		deleteMsgComment: (_, { input: { id } }) =>
			MsgComment.findById(id).then(async comment => {
				if (comment) {
					const deleted = await MsgComment.findOneAndDelete({
						_id: id
					}).populate('message');
					await Message.findOneAndUpdate(
						{ _id: deleted.message },
						{ $pull: { comments: deleted._id } }
					); // removes comment from parent Message
					// console.log('the item in question: ', deleted);
					try {
						await new Event({
							team: deleted.message.team._id,
							user: deleted.user._id,
							action_string: action_str.deleted,
							object_string: object_str.msgComment,
							event_target_id: deleted.message._id
						})
							.save()
							.then(event => {
								// console.log('should be a success', event);
							});
					} catch (error) {
						console.error('Could not add event', error);
					}
					return deleted;
				} else {
					throw new ValidationError('Comment does not exist');
				}
			}),
		likeMsgComment: (_, { input: { id } }, { user: { _id } }) =>
			MsgComment.findOneAndUpdate(
				{ _id: id },
				{ $addToSet: { likes: _id } },
				{ new: true }
			)
				.populate('user message likes')
				.then(async item => {
					// console.log('\n\n the item before it hits EVENTS: \n\n', item);
					if (item) {
						try {
							await new Event({
								team: item.message.team._id,
								user: _id,
								action_string: action_str.liked,
								object_string: object_str.msgComment,
								event_target_id: item.message._id
							})
								.save()
								.then(event => {
									// console.log('\n\nEvent added\n\n', event);
								});
						} catch (error) {
							console.error('\n\nCould not add event\n\n', error);
						}
					} else {
						throw new ValidationError("DocDocument doesn't exist");
					}
				}),
		unLikeMsgComment: (_, { input: { id } }, { user: { _id } }) =>
			MsgComment.findOneAndUpdate(
				{ _id: id },
				{ $pull: { likes: _id } },
				{ new: true }
			)
				.populate('user message likes')
				.then(async item => {
					// console.log('\n\n the item before it hits EVENTS: \n\n', item);
					if (item) {
						try {
							await new Event({
								team: item.message.team._id,
								user: _id,
								action_string: action_str.unliked,
								object_string: object_str.msgComment,
								event_target_id: item.message._id
							})
								.save()
								.then(event => {
									// console.log('\n\nEvent added\n\n', event);
								});
						} catch (error) {
							console.error('\n\nCould not add event\n\n', error);
						}
					} else {
						throw new ValidationError("DocDocument doesn't exist");
					}
				})
	}
};

module.exports = msgCommentResolvers;
