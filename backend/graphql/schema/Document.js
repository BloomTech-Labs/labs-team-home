const Document = /* GRAPHQL */ `
    type Document {
        _id: ID
        doc_url: String!
        user: User!
        folder: ID
        team: Team!
        title: String!
        textContent: String
        comments: [String]
        createdAt: String
        updatedAt: String
    }
    input FindDocumentInput {
        id: ID!
    }
    input FindDocumentsByTeamInput {
        team: ID!
    }
    input FindDocumentByFolderInput {
        folder: ID!
    }
    input AddDocumentInput {
        title: String!
        doc_url: String!
        team: String!
        folder: String!
        textContent: String
        images: [String]
    }
    input UpdateDocumentInput {
        id: ID!
        title: String
        team: String
        folder: String
        textContent: String
        images: [String]
        comments: [String]
    }
    input DeleteDocumentInput {
        id: ID!
    }
    extend type Query {
        documents: [Document]
        findDocument(input: FindDocumentInput): Document
        findDocumentsByTeam(input: FindDocumentsByTeamInput): [Document]
        findDocumentsByFolder(input: FindDocumentByFolderInput): [Document]
    }
    extend type Mutation {
        addDocument(input: AddDocumentInput): Document
        updateDocument(input: UpdateDocumentInput): Document
        deleteDocument(input: DeleteDocumentInput): Document
    }
`;

module.exports = Document;
