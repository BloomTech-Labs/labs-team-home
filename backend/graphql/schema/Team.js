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
	input KickUserInput {
		id: ID!
		user: ID!
	}
	input LeaveTeamInput {
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
	input SetPremiumInput {
		id: ID!
		charge: Int!
		source: String!
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
		inviteUser(input: InviteUserInput!): Team
		kickUser(input: KickUserInput!): Team
		leaveTeam(input: LeaveTeamInput!): Team
		setPremium(input: SetPremiumInput!): Team
	}
`;
module.exports = Team;
