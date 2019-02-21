require('dotenv').config();
const DocComment = require('../../models/DocComment');
const Document = require('../../models/Document');

const { ValidationError } = require('apollo-server-express');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const docCommentResolver = {
	Query: {
		docComments: () => DocComment.find().populate('user document likes'),
		findDocCommentsByDocument: (_, { input: { id } }) =>
			DocComment.findById(id).populate('user document likes'),
		findDocComment: (_, { input: { id } }) =>
			DocComment.findById(id).populate('user document likes')
	},
	Mutation: {
		addDocComment: (_, { input }, { user: { _id, firstName, lastName } }) => {
			const { content } = input;
			return new DocComment({ ...input, user: _id })
				.save()
				.then(async comment => {
					const document = await Document.findOneAndUpdate(
						{ _id: input.document },
						{ $push: { comments: [comment._id] } },
						{ new: true }
					).populate('team subscribedUsers');
					const email = document.subscribedUsers
						.filter(
							user =>
								user.toggles.receiveEmails && user.email && user._id !== _id
						)
						.map(user => user.email);
					email.length &&
						(await SpeechGrammarList.send({
							to: emails,
							from: `${document.team.name.split(' ').join('')}@team.home`,
							subject: `The message ${
								document.title
							} has a new comment from ${firstName} ${lastName} on your team ${
								document.team.name
							}`,
							text: `${content}`,
							html: /* HTML */ `
								<h1>${document.team.name}</h1>
								<div>
									<h2>Message:</h2>
									<h3>${document.title}</h3>
									<p>${document.content}</p>
								</div>
								<div>
									<h2>New comment:</h2>
									<p>${content}</p>
								</div>
							`
						}));
					return comment.populate('user document likes').execPopulate();
				});
		},
		updateDocComment: (_, { input }) => {
			const { id } = input;
			return DocComment.findById(id).then(comment => {
				if (comment) {
					return DocComment.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user document likes');
				} else {
					throw new ValidationError("Comment doesn't exist.");
				}
			});
		},
		deleteDocComment: (_, { input: { id } }) =>
			DocComment.findById(id).then(async comment => {
				if (comment) {
					const deleted = await DocComment.findOneAndDelete({ _id: id });
					await Document.findOneAndUpdate(
						{ _id: deleted.document },
						{ $pull: { comments: deleted._id } }
					);
					return deleted;
				} else {
					throw new ValidationError("Comment doesn't exist.");
				}
			}),
		likeDocComment: (_, { input: { id } }, { user: { _id } }) =>
			DocComment.findOneAndUpdate(
				{ _id: id },
				{ $addToSet: { likes: _id } },
				{ new: true }
			).populate('user document likes'),
		unlikeDocComment: (_, { input: { id } }, { user: { _id } }) =>
			DocComment.findOneAndUpdate(
				{ _id: id },
				{ $pull: { likes: _id } },
				{ new: true }
			).populate('user document likes')
	}
};

module.exports = docCommentResolver;
