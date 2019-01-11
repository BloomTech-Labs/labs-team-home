const Message = /* GraphQL */ `
	type Message {
		_id: ID
		title: String!
		user: ID!
		team: ID!
		content: String!
		images: [String]
		tags: [ID]
		comments: [ID]
		subscribedUsers: [ID]
		createdAt: String
		updatedAt: String
	}
	input FindMessageInput {
		id: ID!
	}
	input AddMessageInput {
		title: String!
		user: String!
		team: String!
		content: String!
		images: [String]
		tags: [String]
		subscribedUsers: [String]
	}
	input UpdateMessageInput {
		id: ID!
		title: String
		user: String
		team: String
		content: String
		images: [String]
		tags: [String]
		comments: [String]
		subscribedUsers: [String]
	}
	input DeleteMessageInput {
		id: ID!
	}
	extend type Query {
		messages: [Message]
		findMessage(input: FindMessageInput): Message
	}
	extend type Mutation {
		addMessage(input: AddMessageInput!): Message
		updateMessage(input: UpdateMessageInput!): Message
		deleteMessage(input: DeleteMessageInput!): Message
	}
`;

module.exports = Message;
