const Folder = /* GraphQL */ `
	type Folder {
		_id: ID
		title: String!
		user: User!
		team: Team!
		createdAt: String
		updatedAt: String
	}
	input FindFolderInput {
		id: ID!
	}
	input FindFoldersByTeamInput {
		team: ID!
	}
	input AddFolderInput {
		title: String!
		team: String!
	}
	input UpdateFolderInput {
		id: ID!
		title: String
		team: String
	}
	input DeleteFolderInput {
		id: ID!
	}
	extend type Query {
		folders: [Folder]
		findFoldersByTeam(input: FindFoldersByTeamInput): [Folder]
		findFolder(input: FindFolderInput): Folder
	}
	extend type Mutation {
		addFolder(input: AddFolderInput!): Folder
		updateFolder(input: UpdateFolderInput!): Folder
		deleteFolder(input: DeleteFolderInput!): Folder
	}
`;

module.exports = Folder;
