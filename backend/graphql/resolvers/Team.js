const Team = require('../../models/Team');
const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');

const teamResolvers = {
	Query: {
		teams: () => Team.find().populate('users.user'),
		findTeamsByUser: (_, args, { user: { _id } }) =>
			Team.find({ users: { user: _id } }),
		findTeam: (_, { input }) => {
			return Team.findById(input).populate('users.user');
		}
	},
	Mutation: {
		addTeam: (_, { input }, { user: { _id } }) => {
			const { name } = input;
			if (!name) {
				throw new Error('Name is required.');
			} else {
				return new Team({ ...input, users: [{ user: _id, admin: true }] })
					.save()
					.then(team => team.populate('users.user').execPopulate());
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
					).populate('users.user');
				} else {
					throw new Error("Team doesn't exist");
				}
			});
		},
		deleteTeam: (_, { input: { id } }) => {
			return Team.findById(id).then(team => {
				if (team) {
					return Team.findOneAndDelete({ _id: id }).then(team =>
						Message.find({ team: team._id }).then(messages =>
							Promise.all(
								messages.map(message =>
									MsgComment.deleteMany({ message: message._id })
								)
							)
								.then(() => Message.deleteMany({ team: team._id }))
								.then(() => team)
						)
					);
				} else {
					throw new Error("Team doesn't exist");
				}
			});
		}
	}
};

module.exports = teamResolvers;
