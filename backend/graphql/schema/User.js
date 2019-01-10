const User = `
type User {
    _id: ID
    firstName: String!
    lastName: String!
    emailAddress: String!
    phoneNumber: String
    profilePictureURL: String
    receiveEmails: Boolean!
    receiveTexts: Boolean!
}
`;

module.exports = User;
