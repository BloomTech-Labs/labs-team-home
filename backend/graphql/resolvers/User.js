const User = require('../../models/User');

const userResolvers = {
	Query: {
		users: () => User.find(),
		currentUser: (_, args, { user: { _id } }) => User.findById(_id),
		findUser: (_, { input: { id } }) => {
			return User.findById(id);
		}
	},
	Mutation: {
		addUser: (_, { input }) => {
			return new User(input).save();
		},
		updateUser: (_, { input }, { user: { _id } }) => {
			const { firstName, lastName, email, toggles } = input;
			if (
				!firstName &&
				!lastName &&
				!email &&
				!toggles.receiveEmails &&
				!toggles.receiveTexts
			)
				throw new Error(
					'No id, first name, last name, email, or toggles provided.'
				);
			return User.findById(_id).then(exists => {
				if (exists) {
					return User.findOneAndUpdate(
						{ _id: _id },
						{ $set: input },
						{ new: true }
					);
				} else {
					throw new Error("User doesn't exist");
				}
			});
		},
		deleteUser: (_, { input: { id } }) => {
			return User.findById(id).then(user => {
				if (user) return User.findOneAndDelete({ _id: id });
				else {
					throw new Error("User doesn't exist");
				}
			});
		}
	}
};

module.exports = userResolvers;
