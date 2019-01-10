const Tag = require('../../models/Tag');

const tagResolvers = {
	Query: {
		tags: () => Tag.find()
	},
	Mutation: {
		addTag: (_, { input: { name, team } }) => {
			const newTag = {};
			if (name) newTag.name = name;
			if (team) newTag.team = team;
			return new Tag(newTag).save();
		}
	}
};

module.exports = tagResolvers;
