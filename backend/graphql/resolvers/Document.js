require('dotenv').config();
const Document = require('../../models/Document');
const DocComment = require('../../models/DocComment');
const Event = require('../../models/Event');
const { ValidationError } = require('apollo-server-express');

const { object_str, action_str } = require('./ResolverHelpers');

const documentResolver = {
	Query: {
		documents: () =>
			Document.find().populate('user team folder tag subscribedUsers'),
		findDocument: (_, { input: { id } }) =>
			Document.findById(id)
				.populate('team folder user tag subscribedUsers')
				.then(document => document),

		findDocumentsByFolder: (_, { input: { folder } }) =>
			Document.find({ folder: folder })
				.populate('user team folder tag subscribedUsers')
				.then(document => document),
		findDocumentsByTeam: async (_, { input: { team } }) => {
			const documents = await Document.find({ team: team }).populate(
				'user team folder tag subscribedUsers'
			);

			return documents.map(x => {
				x._id = x._id.toString();
				return x;
			});
		}
	},
	Mutation: {
		addDocument: (_, { input }, { user: { _id } }) =>
			new Document({ ...input, user: _id }).save().then(document =>
				document
					.populate('user team tag subscribedUsers folder')
					.execPopulate()
					.then(async item => {
						// console.log('item before event is called: ', item);
						if (item) {
							try {
								await new Event({
									team: item.team._id,
									user: item.user._id,
									action_string: action_str.created,
									object_string: object_str.document,
									event_target_id: item._id
								})
									.save()
									.then(event => {
										// console.log('Event added', event);
									});
							} catch (error) {
								console.error('Could not add event', error);
							}
						}
					})
			),
		updateDocument: (_, { input }, { user }) => {
			const { id } = input;
			// console.log(user);

			return Document.findById(id).then(document => {
				if (document) {
					return Document.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					)
						.populate('user team folder tag subscribedUsers')
						.then(async item => {
							// console.log('item before event is called: ', item);

							if (item) {
								try {
									await new Event({
										team: item.team._id,
										user: user._id,
										action_string: action_str.edited,
										object_string: object_str.document,
										event_target_id: item._id
									})
										.save()
										.then(event => {
											// console.log('Event added', event);
										});
								} catch (error) {
									console.error('Could not add event', error);
								}
							}
						});
				} else {
					throw new ValidationError("Document doesn't exist");
				}
			});
		},

		deleteDocument: (_, { input: { id } }) =>
			Document.findById(id).then(async document => {
				if (document) {
					await Document.findByIdAndDelete({ _id: id });
					await DocComment.deleteMany({ document: document._id });
					try {
						await new Event({
							team: document.team._id,
							user: document.user._id,
							action_string: action_str.deleted,
							object_string: object_str.document,
							event_target_id: null
						})
							.save()
							.then(event => {
								// console.log('should be a success', event);
							});
					} catch (error) {
						console.error('Could not add event', error);
					}
					return document;
				} else {
					throw new ValidationError("Document doesn't exist");
				}
			}),
		subscribeDoc: (_, { input: { id } }, { user: { _id } }) =>
			Document.findOneAndUpdate(
				{ _id: id },
				{ $addToSet: { subscribedUsers: _id } },
				{ new: true }
			)
				.populate('user team folder tag subscribedUsers')
				.then(async item => {
					// console.log('\n\nthe item to be passed: \n\n', item);
					if (item) {
						try {
							await new Event({
								team: item.team._id,
								user: _id,
								action_string: action_str.subscribed,
								object_string: object_str.document,
								event_target_id: item._id
							})
								.save()
								.then(event => {
									// console.log('\n\nEvent added: \n\n', event);
								});
						} catch (error) {
							console.error('Could not add event', error);
						}
					} else {
						throw new ValidationError("Document doesn't exist");
					}
				}),
		unsubscribeDoc: (_, { input: { id } }, { user: { _id } }) =>
			Document.findOneAndUpdate(
				{ _id: id },
				{ $pull: { subscribedUsers: _id } },
				{ new: true }
			)
				.populate('user team folder tag subscribedUsers')
				.then(async item => {
					// console.log(item);
					if (item) {
						try {
							await new Event({
								team: item.team._id,
								user: _id,
								action_string: action_str.unsubscribed,
								object_string: object_str.document,
								event_target_id: item._id
							})
								.save()
								.then(event => {
									// console.log('Event added', event);
								});
						} catch (error) {
							console.error('Could not add event', error);
						}
					} else {
						throw new ValidationError("Document doesn't exist");
					}
				})
	}
};

module.exports = documentResolver;
