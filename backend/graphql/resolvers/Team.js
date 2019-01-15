const Team = require('../../models/Team');

const teamResolvers = {
	Query: {
		teams: () => Team.find().populate('users'),
		findTeam: (_, { input }) => {
			return Team.findById(input).populate('users');
		}
	},
	Mutation: {
		addTeam: (_, { input }) => {
			const { name } = input;

			if (!name) {
				throw new Error('Name is required.');
			} else {
				return new Team(input)
					.save()
					.then(team => team.populate('users').execPopulate());
			}
		},
		updateTeam: (_, { input }) => {
			const { name, users, premium, id } = input;

			if (!name && !users && !premium)
				throw new Error('No name or users or premium provided.');
			return Team.findById(id).then(team => {
				if (team) {
					return Team.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('users');
				} else {
					throw new Error("Team doesn't exist");
				}
			});
		},
		deleteTeam: (_, { input: { id } }) => {
			return Team.findById(id).then(team => {
				if (team) {
					return Team.findOneAndDelete({ _id: id }).populate('users');
				} else {
					throw new Error("Team doesn't exist");
				}
			});
		}
	}
};

module.exports = teamResolvers;
