const Message = `
  type Message {
    _id: ID
    title: String!
    user: String!
    content: String!
    images: [String!]
    tags: [Tag]
    comments: [MsgComment]
    subscribedUsers: [User]
    createdAt: String
    updatedAt: String
}
`;

module.exports = Message;
