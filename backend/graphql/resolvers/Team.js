const Team = require('../../models/Team');

const teamResolvers = {
	Query: {
		teams: () => Team.find(),
		findTeam: (_, { input }) => {
			return Team.findById(input);
		}
	},
	Mutation: {
		addTeam: (_, { input }) => {
			const { name } = input;

			if (!name) {
				throw new Error('Name is required.');
			} else {
				console.log(input);
				return new Team(input).save();
			}
		},
		updateTeam: (_, { input }) => {
			const { name, users, premium } = input;

			if (!name && !users && !premium)
				throw new Error('No name or users or premium provided.');
			return Team.findById(id).then(team => {
				if (team) {
					Team.findOneAndUpdate(
						{ _id: input.id },
						{ $set: input },
						{ new: true }
					);
				} else {
					throw new Error("Team doesn't exist");
				}
			});
		},
		deleteTeam: (_, { input: { id } }) => {
			return Team.findById(id).then(team => {
				if (team) {
					return Team.findOneAndDelete({ _id: id });
				} else {
					throw new Error("Team doesn't exist");
				}
			});
		}
	}
};

module.exports = teamResolvers;
