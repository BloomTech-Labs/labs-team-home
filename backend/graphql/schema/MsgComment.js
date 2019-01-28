const MsgComment = /* GraphQL */ `
	type MsgComment {
		_id: ID
		user: User!
		message: Message!
		content: String!
		image: String
		likes: [User]
		createdAt: String
		updatedAt: String
	}
	input FindMsgCommentInput {
		id: ID!
	}
	input FindMsgCommentsByMessageInput {
		message: ID!
	}
	input AddMsgCommentInput {
		message: String!
		content: String!
		image: String
	}
	input UpdateMsgCommentInput {
		id: ID!
		message: String
		content: String
		image: String
		likes: [ID]
	}
	input DeleteMsgCommentInput {
		id: ID!
	}
	input LikeMsgCommentInput {
		id: ID!
	}
	input UnLikeMsgCommentInput {
		id: ID!
	}
	extend type Query {
		MsgComments: [MsgComment]
		findMsgCommentsByMessage(input: FindMsgCommentsByMessageInput): [MsgComment]
		findMsgComment(input: FindMsgCommentInput): MsgComment
	}
	extend type Mutation {
		addMsgComment(input: AddMsgCommentInput!): MsgComment
		updateMsgComment(input: UpdateMsgCommentInput!): MsgComment
		deleteMsgComment(input: DeleteMsgCommentInput!): MsgComment
		likeMsgComment(input: LikeMsgCommentInput!): MsgComment
		unLikeMsgComment(input: UnLikeMsgCommentInput!): MsgComment
	}
`;

module.exports = MsgComment;
