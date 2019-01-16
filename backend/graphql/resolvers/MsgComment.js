const MsgComment = require('../../models/MsgComment');

const msgCommentResolvers = {
	Query: {
		MsgComments: () => MsgComment.find().populate('user message likes'),
		findMsgComment: (_, { input: { id } }) => {
			return MsgComment.findById(id).populate('user message likes');
		},
		findMsgCommentsByMessage: (_, { input: { message } }) => {
			return MsgComment.find({ message: message }).populate(
				'user message likes'
			);
		}
	},
	Mutation: {
		addMsgComment: (_, { input }) => {
			const { user, message, content } = input;
			if (!user || !message || !content)
				throw new Error('User, message and content required.');
			return new MsgComment(input)
				.save()
				.then(comment => comment.populate('user message likes').execPopulate());
		},
		updateMsgComment: (_, { input }) => {
			const { id, user, message, content } = input;
			if (!id && !user && !message && !content)
				throw new Error('No id, user, message or content provided');
			return MsgComment.findById(id).then(comment => {
				if (comment) {
					return MsgComment.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user message likes');
				} else {
					throw new Error('Comment does not exist');
				}
			});
		},
		deleteMsgComment: (_, { input: { id } }) => {
			return MsgComment.findById(id).then(comment => {
				if (comment) {
					return MsgComment.findOneAndDelete({ _id: id });
				} else {
					throw new Error('Comment does not exist');
				}
			});
		}
	}
};

module.exports = msgCommentResolvers;
