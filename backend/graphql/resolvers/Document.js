require('dotenv').config();
const Document = require('../../models/Document');
const Folder = require('../../models/Folder');
const DocComment = require('../../models/DocComment');

const { ValidationError } = require('apollo-server-express');

const documentResolver = {
	Query: {
		documents: () => Document.find().populate('user name')
	},
	Mutation: {
		addDocument: (_, { input }, { user: { _id } }) =>
			new Document({ ...input, user: _id })
				.save()
				.then(document => document.populate('user team')),
		updateDocument: (_, { input }) => {
			const { id } = input;
			return Document.findById(id).then(document => {
				if (document) {
					return Document.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user team folder');
				} else {
					throw new ValidationError("Document doesn't exist.");
				}
			});
		},
		deleteDocument: (_, { input: { id } }) => {
			Document.findById(id).then(async document => {
				if (document) {
					await Document.findOneAndDelete({ _id: id });
					// await DocComment.deleteMany({ document: document._id });
					return document[id];
				} else {
					throw new ValidationError("Document doesn't exist");
				}
			});
		}
	}
};

module.exports = documentResolver;
