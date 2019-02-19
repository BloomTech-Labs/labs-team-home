const Folder = /* GraphQL */ `
	type Folder {
		_id: ID
		title: String!
		user: User
		team: Team
		createdAt: String
		updatedAt: String
	}
	input FindFolderInput {
		id: ID!
	}
	extend type Query {
		folders: [Folder]
	}
`;

module.exports = Folder;
