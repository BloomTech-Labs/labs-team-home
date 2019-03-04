require('dotenv').config();
const Folder = require('../../models/Folder');
const Document = require('../../models/Document');

const { ValidationError } = require('apollo-server-express');

const folderResolver = {
	Query: {
		folders: () => Folder.find().populate('user team'),
		findFolder: (_, { input: { id } }) =>
			Folder.findById(id)
				.populate('user team')
				.then(folder => folder),
		findFoldersByTeam: async (_, { input: { team } }) => {
			const folders = await Folder.find({ team: team }).populate('user team');
			// return folders.map(x => {
			// 	x._id = x._id.toString();
			// 	return x;
			// });
			return folders;
		}
	},

	Mutation: {
		addFolder: (_, { input }, { user: { _id } }) =>
			new Folder({ ...input, user: _id })
				.save()
				.then(folder => folder.populate('user team').execPopulate()),
		updateFolder: (_, { input }) => {
			const { id } = input;
			return Folder.findById(id).then(folder => {
				if (folder) {
					return Folder.findByIdAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user team');
				} else {
					throw new ValidationError("Folder doesn't exist");
				}
			});
		},
		deleteFolder: (_, { input: { id } }) =>
			Folder.findById(id).then(async folder => {
				if (folder) {
					await Folder.findByIdAndDelete({ _id: id });
					//currently, below code is not necessary, as frontend nullifies it.
					//await Document.deleteMany({ folder: folder._id });
					return folder;
				} else {
					throw new ValidationError("Folder doesn't exist.");
				}
			})
	}
};

module.exports = folderResolver;
