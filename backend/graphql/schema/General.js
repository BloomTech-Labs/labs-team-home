const General = /* GraphQL */ `
	type General {
		documents: [Document]
		docComments: [DocComment]
		folders: [Folder]
		messages: [Message]
		msgComments: [MsgComment]
	}
	input FindAllActivitiesInput {
		team: ID!
	}
	extend type Query {
		findAllActivities(input: FindAllActivitiesInput!): [General]
	}
`;
module.exports = General;
