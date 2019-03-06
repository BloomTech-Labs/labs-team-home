const User = /* GraphQL */ `
	type Toggles {
		receiveEmails: Boolean!
		receiveTexts: Boolean!
	}
	type User {
		_id: ID!
		authId: String
		firstName: String
		lastName: String
		email: String
		phoneNumber: String
		avatar: String
		toggles: Toggles
	}
	input FindUserInput {
		id: ID!
	}
	input AddUserInput {
		firstName: String!
		lastName: String!
		email: String!
		phoneNumber: String
		avatar: String
	}
	input UpdateUserInput {
		firstName: String
		lastName: String
		email: String
		phoneNumber: String
		avatar: String
		toggles: TogglesInput
	}
	input TogglesInput {
		receiveEmails: Boolean
		receiveTexts: Boolean
	}
	extend type Query {
		users: [User]
		currentUser: User
		findUser(input: FindUserInput): User
	}
	extend type Mutation {
		addUser(input: AddUserInput!): User
		updateUser(input: UpdateUserInput!): User
		deleteUser: User
	}
`;

module.exports = User;
