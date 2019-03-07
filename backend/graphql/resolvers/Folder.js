require('dotenv').config();
const Folder = require('../../models/Folder');
const Event = require('../../models/Event');
const { ValidationError } = require('apollo-server-express');

const { object_str, action_str } = require('./ResolverHelpers');

const folderResolver = {
	Query: {
		folders: () => Folder.find().populate('user team'),
		findFolder: (_, { input: { id } }) =>
			Folder.findById(id)
				.populate('user team')
				.then(folder => folder),
		findFoldersByTeam: async (_, { input: { team } }) => {
			const folders = await Folder.find({ team: team }).populate('user team');
			return folders;
		}
	},

	Mutation: {
		addFolder: (_, { input }, { user: { _id } }) =>
			new Folder({ ...input, user: _id })
				.save()
				.then(folder => folder.populate('user team').execPopulate())
				.then(async folder => {
					// console.log('the item in question: ', folder);
					try {
						await new Event({
							team: folder.team._id,
							user: folder.user._id,
							action_string: action_str.created,
							object_string: object_str.folder,
							event_target_id: folder._id
						})
							.save()
							.then(event => {
								// console.log('should be a success', event);
							});
					} catch (error) {
						console.error('Could not add event', error);
					}
				}),
		updateFolder: (_, { input }) => {
			const { id } = input;
			return Folder.findById(id).then(folder => {
				if (folder) {
					return Folder.findByIdAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					)
						.populate('user team')
						.then(async folder => {
							// console.log('the item in question:', folder);

							try {
								await new Event({
									team: folder.team._id,
									user: folder.user._id,
									action_string: action_str.edited,
									object_string: object_str.folder,
									event_target_id: folder._id
								})
									.save()
									.then(event => {
										// console.log('this should work yooo ->', event);
									});
							} catch (error) {
								console.error('Could not add event', error);
							}
						});
				} else {
					throw new ValidationError("Folder doesn't exist");
				}
			});
		},
		deleteFolder: (_, { input: { id } }) =>
			Folder.findById(id).then(async folder => {
				if (folder) {
					await Folder.findByIdAndDelete({ _id: id });
					// console.log('the item in question: ', folder);
					try {
						await new Event({
							team: folder.team._id,
							user: folder.user._id,
							action_string: action_str.deleted,
							object_string: object_str.folder,
							event_target_id: null
						})
							.save()
							.then(event => {
								// console.log('should be a success', event);
							});
					} catch (error) {
						console.error('Could not add event', error);
					}

					return folder;
				} else {
					throw new ValidationError("Folder doesn't exist.");
				}
			})
	}
};

module.exports = folderResolver;
