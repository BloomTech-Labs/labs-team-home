const Tag = require('../../models/Tag');

const tagResolvers = {
	Query: {
		tags: () => Tag.find(),
		findTag: (_, input) => {
			return Tag.findById(input);
		}
	},
	Mutation: {
		addTag: (_, { input }) => {
			// const { name, team } = input;
			// if (!name || !team) throw new Error('Name and team are required.');
			return new Tag(input).save();
		},
		updateTag: (_, { input }) => {
			const { id, name, team } = input;
			if (!name && !team) throw new Error('No name or team provided.');
			return Tag.findById(id).then(tag => {
				if (tag) {
					return Tag.findOneAndUpdate(
						{ _id: input.id },
						{ $set: input },
						{ new: true }
					);
				} else {
					throw new Error("Tag doesn't exist");
				}
			});
		},
		deleteTag: (_, { input: { id } }) => {
			Tag.findById(id).then(tag => {
				if (tag) {
					return Tag.findOneAndDelete({ _id: id });
				} else {
					throw new Error("Tag doesn't exist");
				}
			});
		}
	}
};

module.exports = tagResolvers;

// Post.findOneAndUpdate(
// 	{ _id: req.params.id },
// 	{ $set: req.body },
// 	{ new: true }
//   )

// create: new Model(object).save()
// read: find, findById()
// update: findOneAndUpdate()
// delete: findOneAndDelete()
