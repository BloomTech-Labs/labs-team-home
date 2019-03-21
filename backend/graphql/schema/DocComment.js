const DocComment = /* GraphQL */ `
	type DocComment {
		_id: ID
		user: User!
		document: Document!
		content: String!
		image: String
		likes: [User]
		createdAt: String
		updatedAt: String
	}
	input FindDocCommentInput {
		id: ID!
	}
	input FindDocCommentsByDocumentInput {
		document: ID!
	}
	input AddDocCommentInput {
		document: String!
		content: String!
		image: String
	}
	input UpdateDocCommentInput {
		id: ID!
		document: String
		content: String
		image: String
		likes: [ID]
	}
	input DeleteDocCommentInput {
		id: ID!
	}
	input LikeDocCommentInput {
		id: ID!
	}
	input UnLikeDocCommentInput {
		id: ID!
	}
	extend type Query {
		docComments: [DocComment]
		findDocCommentsByDocument(
			input: FindDocCommentsByDocumentInput
		): [DocComment]
		findDocComment(input: FindDocCommentInput): DocComment
	}
	extend type Mutation {
		addDocComment(input: AddDocCommentInput!): DocComment
		updateDocComment(input: UpdateDocCommentInput!): DocComment
		deleteDocComment(input: DeleteDocCommentInput!): DocComment
		likeDocComment(input: LikeDocCommentInput!): DocComment
		unLikeDocComment(input: UnLikeDocCommentInput!): DocComment
	}
`;

module.exports = DocComment;
