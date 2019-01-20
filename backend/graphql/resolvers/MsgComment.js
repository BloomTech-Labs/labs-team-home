const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');
const { ValidationError } = require('apollo-server-express');
const sgMail = require('@sendgrid/mail');
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
					).populate('team subscribedUsers');
					const emails = message.subscribedUsers.map(
						// creates an array of emails of subscribed users, if their email is on file and the user isn't the one adding the message
						user =>
							user.toggles.receiveEmails &&
							user.email &&
							user._id !== _id &&
							user.email
					);
					await sgMail.send({
						// notifies subscribed users of the new comment
						to: emails,
						from: 'sender@example.org',
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
					});
					return comment.populate('user message likes').execPopulate();
				});
		},
		updateMsgComment: (_, { input }) => {
			const { id } = input;
			return MsgComment.findById(id).then(comment => {
				if (comment) {
					return MsgComment.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user message likes');
				} else {
					throw new ValidationError('Comment does not exist');
				}
			});
		},
		deleteMsgComment: (_, { input: { id } }) =>
			MsgComment.findById(id).then(async comment => {
				if (comment) {
					const deleted = await MsgComment.findOneAndDelete({ _id: id });
					await Message.findOneAndUpdate(
						{ _id: deleted.message },
						{ $pull: { comments: deleted._id } }
					); // removes comment from parent Message
					return deleted;
				} else {
					throw new ValidationError('Comment does not exist');
				}
			})
	}
};

module.exports = msgCommentResolvers;
