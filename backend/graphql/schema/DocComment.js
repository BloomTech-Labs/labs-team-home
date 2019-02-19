const DocComment = /* GraphQL */ `
	type DocComment {
		_id: ID
		user: User!
		document: Document!
		content: String!
		createdAt: String
		updatedAt: String
	}
	extend type Query {
		docComments: [DocComment]
	}
`;

module.exports = DocComment;
