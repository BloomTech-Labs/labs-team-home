const MsgComment = `
  type MsgComment {
    _id: ID
    user: String!
    message: Message!
    content: String!
    likes: [User]
    createdAt: String
    updatedAt: String
  }
`;

module.exports = MsgComment;
