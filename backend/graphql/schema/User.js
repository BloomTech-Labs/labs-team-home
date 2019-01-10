const User = `
type Toggles {
    receiveEmails: Boolean!
    receiveTexts: Boolean!
}
type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String
    profilePictureURL: String
    toggles: Toggles
    }   
    input FindUserInput {
    id: ID!
    }
    input AddUserInput {
        firstName: String!
        lastName: String!
        email: String!
        phoneNumber: String
        profilePictureURL: String
    }
    input UpdateUserInput {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        phoneNumber: String
        profilePictureURL: String
        receiveEmails: Boolean!
        receiveTexts: Boolean!
    }
    input DeleteUserInput {
        id: ID!
    }
    extend type Query {
        users: [User]
        findUser(input: FindUserInput): User
    }
    extend type Mutation {
        addUser(input: AddUserInput!): User
        updateUser(input: UpdateUserInput!): User
        deleteUser(input: DeleteUserInput!): User
    }

`;

module.exports = User;
