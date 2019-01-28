const Message = /* GraphQL */ `
	type Message {
		_id: ID
		title: String!
		user: User!
		team: Team!
		content: String!
		images: [String]
		tag: Tag
		comments: [ID]
		subscribedUsers: [User]
		createdAt: String
		updatedAt: String
	}
	input FindMessageInput {
		id: ID!
	}
	input FindMessageByTeamInput {
		team: ID!
	}
	input AddMessageInput {
		title: String!
		team: String!
		content: String!
		images: [String]
		tag: String
		subscribedUsers: [String]
	}
	input UpdateMessageInput {
		id: ID!
		title: String
		team: String
		content: String
		images: [String]
		tag: String
		comments: [String]
		subscribedUsers: [String]
	}
	input DeleteMessageInput {
		id: ID!
	}
	input SubscribeInput {
		id: ID!
	}
	input UnsubscribeInput {
		id: ID!
	}
	extend type Query {
		messages: [Message]
		findMessagesByTeam(input: FindMessageByTeamInput): [Message]
		findMessage(input: FindMessageInput): Message
	}
	extend type Mutation {
		addMessage(input: AddMessageInput!): Message
		updateMessage(input: UpdateMessageInput!): Message
		deleteMessage(input: DeleteMessageInput!): Message
		subscribe(input: SubscribeInput!): Message
		unsubscribe(input: SubscribeInput!): Message
	}
`;

module.exports = Message;
