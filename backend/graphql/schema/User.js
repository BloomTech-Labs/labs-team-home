const User = /* GraphQL */ `
	type Toggles {
		receiveEmails: Boolean!
		receiveTexts: Boolean!
	}
	type User {
		_id: ID
		firstName: String!
		lastName: String!
		email: String!
		phoneNumber: String
		avatar: String
		toggles: Toggles
	}
	input FindUserInput {
		id: ID!
	}
	input AddUserInput {
		_id: ID!
		firstName: String!
		lastName: String!
		email: String!
		phoneNumber: String
		avatar: String
	}
	input UpdateUserInput {
		id: ID!
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
	input DeleteUserInput {
		id: ID!
	}
	extend type Query {
		users: [User]
		findUser(input: FindUserInput): User
	}
	extend type Mutation {
		addUser(input: AddUserInput!): User
		updateUser(input: UpdateUserInput!): User
		deleteUser(input: DeleteUserInput!): User
	}
`;

module.exports = User;
