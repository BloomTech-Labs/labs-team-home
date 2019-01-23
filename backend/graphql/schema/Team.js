const Team = /* GraphQL */ `
	type Team {
		_id: ID
		name: String!
		users: [TeamUser]
		premium: Boolean!
	}
	type TeamUser {
		user: User!
		admin: Boolean!
	}
	input TeamUserInput {
		user: String
		admin: Boolean
	}
	input FindTeamInput {
		id: ID!
	}
	input InviteUserInput {
		id: ID!
		email: String
		phoneNumber: String
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
	input SetPremiumInput {
		id: ID!
		charge: Int!
		source: String!
	}
	input DeleteTeamInput {
		id: ID!
	}
	extend type Query {
		teams: [Team]
		findTeam(input: FindTeamInput): Team
		findTeamsByUser: [Team]
	}
	extend type Mutation {
		addTeam(input: AddTeamInput!): Team
		updateTeam(input: UpdateTeamInput!): Team
		deleteTeam(input: DeleteTeamInput!): Team
		setPremium(input: SetPremiumInput!): Team
		inviteUser(input: InviteUserInput!): Team
	}
`;
module.exports = Team;
