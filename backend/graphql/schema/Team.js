const Team = `
  type Team {
    _id: ID
    name: String!
    users: [teamUser]
    premium: Boolean!
  }
  type teamUser {
    user: User!
    admin: Boolean!
  }
  input FindTeamInput {
    id: ID!
  }
`;
module.exports = Team;
