require('dotenv').config();
const Document = require('../../models/Document');
const DocComment = require('../../models/DocComment');

const { ValidationError } = require('apollo-server-express');

const documentResolver = {
	Query: {
		documents: () =>
			Document.find().populate('user team folder subscribedUsers'),
		findDocument: (_, { input: { id } }) =>
			Document.findById(id)
				.populate('team folder user subscribedUsers')
				.then(document => document),

		findDocumentsByFolder: (_, { input: { folder } }) =>
			Document.find({ folder: folder })
				.populate('user team folder subscribedUsers')
				.then(document => document),
		findDocumentsByTeam: async (_, { input: { team } }) => {
			const documents = await Document.find({ team: team }).populate(
				'user team folder subscribedUsers'
			);

			return documents.map(x => {
				x._id = x._id.toString();
				return x;
			});
		}
	},
	Mutation: {
		addDocument: (_, { input }, { user: { _id } }) =>
			new Document({ ...input, user: _id })
				.save()
				.then(document =>
					document.populate('user team subscribedUsers folder').execPopulate()
				),
		updateDocument: (_, { input }) => {
			const { id } = input;
			return Document.findById(id).then(document => {
				if (document) {
					return Document.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user team folder subscribedUsers');
				} else {
					throw new ValidationError("Document doesn't exist.");
				}
			});
		},
		deleteDocument: (_, { input: { id } }) =>
			Document.findById(id).then(async document => {
				if (document) {
					await Document.findByIdAndDelete({ _id: id });
					await DocComment.deleteMany({ document: document._id });
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
			).populate('user team folder subscribedUsers'),
		unsubscribeDoc: (_, { input: { id } }, { user: { _id } }) =>
			Document.findOneAndUpdate(
				{ _id: id },
				{ $pull: { subscribedUsers: _id } },
				{ new: true }
			).populate('user team folder subscribedUsers')
	}
};

module.exports = documentResolver;
