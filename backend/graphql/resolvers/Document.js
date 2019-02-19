require('dotenv').config();
const Document = require('../../models/Document');
const Folder = require('../../models/Folder');
const DocComment = require('../../models/DocComment');

const { ValidationError } = require('apollo-server-express');

const documentResolver = {
	Query: {
		documents: () => Document.find().populate('user name'),
		findDocumentsByFolder: (_, { input: { folder } }) =>
			Document.find({ folder: folder })
				.populate('user team folder')
				.then(document => document)
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
					const doc = await Document.findOneAndDelete({ _id: id });
					// await DocComment.deleteMany({ document: document._id });
					doc._id = doc._id.toString();
					doc.user = doc.user.toString();
					console.log(doc);
					return doc;
				} else {
					throw new ValidationError("Document doesn't exist");
				}
			});
		}
	}
};

module.exports = documentResolver;
