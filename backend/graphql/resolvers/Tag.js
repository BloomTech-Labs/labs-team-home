const Tag = require('../../models/Tag');
const { ValidationError } = require('apollo-server-express');

const tagResolvers = {
	Query: {
		tags: () => Tag.find().populate('team'),
		findTag: (_, { input }) => Tag.findById(input).populate('team'),
		findTagsByTeam: (_, { input: { team } }) =>
			Tag.find({ team: team }).populate('team')
	},
	Mutation: {
		addTag: (_, { input }) =>
			new Tag(input).save().then(tag => tag.populate('team').execPopulate()),
		updateTag: (_, { input }) => {
			const { id } = input;
			return Tag.findById(id).then(tag => {
				if (tag) {
					Tag.findOneAndUpdate(
						{ _id: input.id },
						{ $set: input },
						{ new: true }
					).populate('team');
				} else {
					throw new ValidationError("Tag doesn't exist");
				}
			});
		},
		deleteTag: (_, { input: { id } }) =>
			Tag.findById(id).then(tag => {
				if (tag) {
					return Tag.findOneAndDelete({ _id: id });
				} else {
					throw new ValidationError("Tag doesn't exist");
				}
			})
	}
};

module.exports = tagResolvers;
