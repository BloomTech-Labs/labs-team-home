const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');
const { ValidationError } = require('apollo-server-express');

const msgCommentResolvers = {
	Query: {
		MsgComments: () => MsgComment.find().populate('user message likes'),
		findMsgComment: (_, { input: { id } }) =>
			MsgComment.findById(id).populate('user message likes'),
		findMsgCommentsByMessage: (_, { input: { message } }) =>
			MsgComment.find({ message: message }).populate('user message likes')
	},
	Mutation: {
		addMsgComment: (_, { input }, { user: { _id } }) => {
			const { message } = input;
			return new MsgComment({ ...input, user: _id }).save().then(comment =>
				Message.findOneAndUpdate(
					// adds comment to parent Message
					{ _id: message },
					{ $push: { comments: [comment._id] } }
				).then(() => comment.populate('user message likes').execPopulate())
			);
		},
		updateMsgComment: async (_, { input }) => {
			const { id } = input;
			const comment = await MsgComment.findById(id);
			if (comment) {
				return MsgComment.findOneAndUpdate(
					{ _id: id },
					{ $set: input },
					{ new: true }
				).populate('user message likes');
			} else {
				throw new ValidationError('Comment does not exist');
			}
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
