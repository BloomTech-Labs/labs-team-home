const MsgComment = /* GraphQL */ `
	type MsgComment {
		_id: ID
		user: String!
		message: ID!
		content: String!
		likes: [ID]
		createdAt: String
		updatedAt: String
	}
	input FindMsgCommentInput {
		id: ID!
	}
	input AddMsgCommentInput {
		user: String!
		message: String!
		content: String!
	}
	input UpdateMsgCommentInput {
		id: ID!
		user: String
		message: String
		content: String
	}
	input DeleteMsgCommentInput {
		id: ID!
	}
	extend type Query {
		MsgComments: [MsgComment]
		findMsgComment(input: FindMsgCommentInput): MsgComment
	}
	extend type Mutation {
		addMsgComment(input: AddMsgCommentInput!): MsgComment
		updateMsgComment(input: UpdateMsgCommentInput!): MsgComment
		deleteMsgComment(input: DeleteMsgCommentInput!): MsgComment
	}
`;

module.exports = MsgComment;
