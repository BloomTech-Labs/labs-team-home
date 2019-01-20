const Team = require('../../models/Team');
const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');
const { ForbiddenError, ValidationError } = require('apollo-server-express');

const teamResolvers = {
	Query: {
		teams: () => Team.find().populate('users.user'),
		findTeamsByUser: (_, args, { user: { _id } }) =>
			Team.find({ 'users.user': _id }).populate('users.user'),
		findTeam: (_, { input }) => Team.findById(input).populate('users.user')
	},
	Mutation: {
		addTeam: (_, { input }, { user: { _id } }) =>
			new Team({ ...input, users: [{ user: _id, admin: true }] })
				.save()
				.then(team => team.populate('users.user').execPopulate()),
		updateTeam: (_, { input }) => {
			const { id } = input;
			return Team.findById(id).then(team => {
				if (team) {
					return Team.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('users.user');
				} else {
					throw new ValidationError("Team doesn't exist");
				}
			});
		},
		deleteTeam: (_, { input: { id } }, { user }) =>
			Team.findById(id).then(async foundTeam => {
				if (foundTeam) {
					const foundUser = foundTeam.users.find(
						item => item.user.toString() === user._id.toString()
					); // checks if current user is on the team and admin
					if (foundUser && foundUser.admin) {
						const team = await Team.findOneAndDelete({ _id: id });
						const messages = await Message.find({ team: team._id }); // finds all messages on the team
						await Promise.all(
							messages.map(message =>
								MsgComment.deleteMany({ message: message._id })
							) // deletes all comments associated with the messages
						);
						await Message.deleteMany({ team: team._id }); // deletes all messages
						return team;
					} else {
						throw new ForbiddenError('You do not have permission to do that.');
					}
				} else {
					throw new ValidationError("Team doesn't exist");
				}
			})
	}
};

module.exports = teamResolvers;
