const Team = /* GraphQL */ `
	type Team {
		_id: ID
		name: String!
		users: [TeamUser]
		premium: Boolean!
	}
	type TeamUser {
		user: ID!
		admin: Boolean!
	}
	input TeamUserInput {
		user: String
		admin: Boolean
	}
	input FindTeamInput {
		id: ID!
	}
	input AddTeamInput {
		name: String!
		users: [TeamUserInput]
		premium: Boolean
	}
	input UpdateTeamInput {
		id: ID!
		name: String
		users: [TeamUserInput]
		premium: Boolean
	}
	input DeleteTeamInput {
		id: ID!
	}
	extend type Query {
		teams: [Team]
		findTeam(input: FindTeamInput): Team
	}
	extend type Mutation {
		addTeam(input: AddTeamInput!): Team
		updateTeam(input: UpdateTeamInput!): Team
		deleteTeam(input: DeleteTeamInput!): Team
	}
`;
module.exports = Team;
