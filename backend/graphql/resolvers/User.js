const User = require('../../models/User');

const userResolvers = {
	Query: {
		users: () => User.find(),
		findUser: (_, { input: { id } }) => {
			return User.findById(id);
		}
	},
	Mutation: {
		addUser: (_, { input }) => {
			return new User(input).save();
		},
		updateUser: (_, { input }) => {
			const { id, firstName, lastName, email, toggles } = input;
			if (
				!id &&
				!firstName &&
				!lastName &&
				!email &&
				!toggles.receiveEmails &&
				!toggles.receiveTexts
			)
				throw new Error(
					'No id, first name, last name, email, or toggles provided.'
				);
			return User.findById(id).then(user => {
				if (user) {
					return User.findOneAndUpdate(
						{ _id: id },
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
