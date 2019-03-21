require('dotenv').config();
const DocComment = require('../../models/DocComment');
const Document = require('../../models/Document');
const Event = require('../../models/Event');

const { object_str, action_str } = require('./ResolverHelpers');

const { ValidationError } = require('apollo-server-express');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const docCommentResolver = {
	Query: {
		docComments: () => DocComment.find().populate('user document likes'),
		findDocCommentsByDocument: (_, { input: { document } }) =>
			DocComment.find({ document: document }).populate('user document likes'),
		findDocComment: (_, { input: { id } }) =>
			DocComment.findById(id).populate('user document likes')
	},
	Mutation: {
		addDocComment: (_, { input }, { user: { _id, firstName, lastName } }) => {
			const { content } = input;
			return new DocComment({ ...input, user: _id })
				.save()
				.then(async comment => {
					await Document.findOneAndUpdate(
						{ _id: input.document },
						{ $push: { comments: [comment._id] } },
						{ new: true }
					)
						.populate('team subscribedUsers')
						.then(async document => {
							// console.log('the item in question:', document);
							try {
								await new Event({
									team: document.team._id,
									user: document.user._id,
									action_string: action_str.created,
									object_string: object_str.docComment,
									event_target_id: document._id
								})
									.save()
									.then(event => {
										// console.log('this is the populated event: ', event);
									});
							} catch (error) {
								console.error('Could not add event', error);
							}

							return document;
						})
						.then(async document => {
							const emails = document.subscribedUsers
								.filter(
									user =>
										user.toggles.receiveEmails && user.email && user._id !== _id
								)
								.map(user => user.email);

							emails.length &&
								(await sgMail.send({
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
											<p>${document.textContent}</p>
										</div>
										<div>
											<h2>New comment:</h2>
											<p>${content}</p>
										</div>
									`
								}));

							return comment.populate('user document likes').execPopulate();
						});
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
					)
						.populate('user document likes')
						.then(async DocComment => {
							// console.log('the item in question:', DocComment);

							try {
								await new Event({
									team: DocComment.document.team,
									user: DocComment.user._id,
									action_string: action_str.edited,
									object_string: object_str.docComment,
									event_target_id: DocComment._id
								})
									.save()
									.then(event => {
										// console.log('this should work ->', event);
									});
							} catch (error) {
								console.error('Could not add event', error);
							}
						});
				} else {
					throw new ValidationError("Comment doesn't exist.");
				}
			});
		},
		deleteDocComment: (_, { input: { id } }) =>
			DocComment.findById(id).then(async comment => {
				if (comment) {
					const deleted = await DocComment.findOneAndDelete({
						_id: id
					}).populate('document');
					// console.log(deleted);
					try {
						await new Event({
							team: deleted.document.team._id,
							user: deleted.user._id,
							action_string: action_str.deleted,
							object_string: object_str.docComment,
							event_target_id: null
						})
							.save()
							.then(event => {
								// console.log('should be a success', event);
							});
					} catch (error) {
						console.error('Could not add event', error);
					}
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
			)
				.populate('user document likes')
				.then(async item => {
					// console.log('\n\n the item before it hits EVENTS: \n\n', item);
					if (item) {
						try {
							await new Event({
								team: item.document.team._id,
								user: _id,
								action_string: action_str.liked,
								object_string: object_str.docComment,
								event_target_id: item.document._id
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
		unLikeDocComment: (_, { input: { id } }, { user: { _id } }) =>
			DocComment.findOneAndUpdate(
				{ _id: id },
				{ $pull: { likes: _id } },
				{ new: true }
			)
				.populate('user document likes')
				.then(async item => {
					// console.log('\n\n the item before it hits EVENTS: \n\n', item);
					if (item) {
						try {
							await new Event({
								team: item.document.team._id,
								user: _id,
								action_string: action_str.unliked,
								object_string: object_str.docComment,
								event_target_id: item.document._id
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

module.exports = docCommentResolver;
