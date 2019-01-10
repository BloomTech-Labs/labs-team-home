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
`;
module.exports = Team;
