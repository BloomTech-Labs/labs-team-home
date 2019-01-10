const User = require('../../models/User');

const userResolvers = {
	Query: {
		users: () => User.find(),
		findUser: (_, { input }) => {
			return User.findById(input);
		}
	},
	Mutation: {
		addUser: (_, { input }) => {
			return new User(input).save();
		},
		updateUser: (
			_,
			{
				input: {
					id,
					firstName,
					lastname,
					email,
					toggles: { receiveEmails, receiveTexts }
				}
			}
		) => {
			if (
				!id &&
				!firstName &&
				!lastName &&
				!email &&
				!toggles.receiveEmails &&
				!toggles.receiveTexts
			)
				throw new Error(
					'No first name, last name, email, or toggles provided.'
				);
			User.findById(input).then(user => {
				if (user) {
					return User.findOneAndUpdate({ _id: id }, { $set: input, new: true });
				} else {
					throw new Error("User doesn't exist");
				}
			});
		},
		deleteUser: (_, input) => {
			User.findById(input).then(user => {
				if (user) return User.findOneAndDelete({ _id: id });
				else {
					throw new Error("User doesn't exist");
				}
			});
		}
	}
};

module.exports = userResolvers;
