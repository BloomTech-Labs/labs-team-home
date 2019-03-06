const User = require('../../models/User');
const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');
const Team = require('../../models/Team');

const { ValidationError } = require('apollo-server-express');

const userResolvers = {
	Query: {
		users: () => User.find(),
		currentUser: (_, args, { user: { _id } }) => _id && User.findById(_id), // returns null if user doesn't exist, telling the client one needs to be created
		findUser: (_, { input: { id } }) => User.findById(id)
	},
	Mutation: {
		// removed sub to allow creation without auth
		addUser: (_, { input }, { user: { sub } }) =>
			new User({ authId: sub, ...input }).save(),
		// addUser: (_, { input }) => new User({ ...input }).save(),
		updateUser: (_, { input }, { user: { _id } }) =>
			User.findById(_id).then(exists => {
				if (exists) {
					return User.findOneAndUpdate(
						{ _id: _id },
						{ $set: input },
						{ new: true }
					);
				} else {
					throw new ValidationError("User doesn't exist");
				}
			}),
		deleteUser: (_, args, { user: { _id } }) =>
			User.findById(_id).then(async foundUser => {
				if (foundUser) {
					await User.findOneAndDelete({ _id: _id });
					const messages = await Message.find({ user: _id }); // finds all messages posted by the user
					await Promise.all(
						messages.map(
							message => MsgComment.deleteMany({ message: message._id }) // deletes all comments associated with those messages
						)
					);
					await Team.updateMany(
						{ 'users.user': _id },
						{ $pull: { users: { user: _id } } } // removes user from all teams they were on
					);
					await Message.deleteMany({ user: _id }); // deletes all of the messages
					return foundUser;
				} else {
					throw new ValidationError("User doesn't exist");
				}
			})
	}
};

module.exports = userResolvers;
