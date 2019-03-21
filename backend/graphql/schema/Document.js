const Document = /* GRAPHQL */ `
    type Document {
        _id: ID
        doc_url: String!
        user: User!
        folder: Folder
        team: Team!
        title: String!
        textContent: String!
        tag: Tag
        images: [String]
        comments: [ID]
        subscribedUsers: [User]
        createdAt: String
        updatedAt: String
    }
    input FindDocumentInput {
        id: ID!
    }
    input FindDocumentsByTeamInput {
        team: ID!
    }
    input FindDocumentsByFolderInput {
        folder: ID!
    }
    input AddDocumentInput {
        title: String!
        doc_url: String!
        team: String!
        folder: String
        textContent: String!
        tag: String
        images: [String]
        subscribedUsers: [String]
    }
    input UpdateDocumentInput {
        id: ID!
        title: String
        doc_url: String
        team: String
        folder: String
        textContent: String
        tag: String
        images: [String]
        comments: [String]
        subscribedUsers: [String]
        doc_url: String
        user: String
    }
    input DeleteDocumentInput {
        id: ID!
    }
    input SubscribeDocInput {
        id: ID!
    }
    input UnsubscribeDocInput {
        id: ID!
    }
    extend type Query {
        documents: [Document]
        findDocument(input: FindDocumentInput): Document
        findDocumentsByTeam(input: FindDocumentsByTeamInput): [Document]
        findDocumentsByFolder(input: FindDocumentsByFolderInput): [Document]
    }
    extend type Mutation {
        addDocument(input: AddDocumentInput!): Document
        updateDocument(input: UpdateDocumentInput!): Document
        deleteDocument(input: DeleteDocumentInput!): Document
        subscribeDoc(input: SubscribeDocInput!): Document
        unsubscribeDoc(input: UnsubscribeDocInput!): Document
    }
`;

module.exports = Document;
