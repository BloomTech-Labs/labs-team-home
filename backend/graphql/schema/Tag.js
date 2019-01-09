const Tag = `
type Tag {
    _id: ID
    name: String!
    team: Team
}
input TagInput {
    name: String!
    team: String
}
type Query {
    tags: [Tag]
}
type Mutation {
    addTag(input: TagInput!): Tag
}
`;
module.exports = Tag;
