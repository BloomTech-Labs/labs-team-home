const Folder = /* GraphQL */ `
	type Folder {
		_id: ID
		title: String!
		user: User!
		team: Team!
		documents: [ID]
		createdAt: String
		updatedAt: String
	}
	input FindFoldersInput {
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
		documents: [String]
	}
	input DeleteFolderInput {
		id: ID!
	}
	extend type Query {
		folders: [Folder]
		findFoldersByTeam(input: FindFoldersByTeamInput): [Folder]
		findFolders(input: FindFoldersInput): Folder
	}
	extend type Mutation {
		addFolder(input: AddFolderInput!): Folder
		updateFolder(input: UpdateFolderInput!): Folder
		deleteFolder(input: DeleteFolderInput!): Folder
	}
`;

module.exports = Folder;
