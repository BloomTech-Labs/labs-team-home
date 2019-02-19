require('dotenv').config();
const Folder = require('../../models/Folder');
const Document = require('../../models/Document');

const { ValidationError } = require('apollo-server-express');

const folderResolver = {
	Query: {
		folders: () => Folder.find().populate('user team documents'),
		findFolders: (_, { input: { id } }) =>
			Folder.findById(id)
				.populate('user team documents')
				.then(folder => folder),
		findFoldersByTeam: (_, { input: { team } }) => {
			console.log(team);
			Folder.find({ team: team }).populate('user team documents');
		}
	},
	Mutation: {
		addFolder: (_, { input }, { user: { _id } }) =>
			new Folder({ ...input, user: _id })
				.save()
				.then(folder => folder.populate('user team documents').execPopulate()),
		updateFolder: (_, { input }) => {
			const { id } = input;
			return Folder.findById(id).then(folder => {
				if (folder) {
					return Folder.findByIdAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user team documents');
				} else {
					throw new ValidationError("Folder doesn't exist");
				}
			});
		},
		deleteFolder: (_, { input: { id } }) =>
			Folder.findById(id).then(async folder => {
				if (folder) {
					await Folder.findByIdAndDelete({ _id: id });
					await Document.deleteMany({ folder: folder._id });
				} else {
					throw new ValidationError("Folder doesn't exist.");
				}
			})
	}
};

module.exports = folderResolver;
