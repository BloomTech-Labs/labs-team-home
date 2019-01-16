const Tag = /* GraphQL */ `
	type Tag {
		_id: ID
		name: String!
		team: Team
	}
	input FindTagInput {
		id: ID!
	}
	input AddTagInput {
		name: String!
		team: String
	}
	input UpdateTagInput {
		id: ID!
		name: String
		team: String
	}
	input DeleteTagInput {
		id: ID!
	}
	type Query {
		tags: [Tag]
		findTag(input: FindTagInput): Tag
	}
	type Mutation {
		addTag(input: AddTagInput!): Tag
		updateTag(input: UpdateTagInput!): Tag
		deleteTag(input: DeleteTagInput!): Tag
	}
`;

module.exports = Tag;
