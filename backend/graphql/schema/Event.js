const Event = /* GraphQL */ `
	type Event {
		_id: ID
		team: Team!
		createdAt: String
		updatedAt: String
		user: User
		action_string: String!
		object_string: String!
		event_target_id: String
	}
	input FindEventInput {
		id: ID!
	}
	input FindEventsByTeamInput {
		team: ID!
		limit: Int
		offset: Int
	}
	input FindEventsByUserInput {
		user: ID!
	}
	input AddEventInput {
		team: String!
		user: String
		action_string: String!
		object_string: String!
		event_target_id: String
	}
	input DeleteEventInput {
		id: ID!
	}
	extend type Query {
		events: [Event]
		findEvent(input: FindEventInput!): Event
		findEventsByTeam(input: FindEventsByTeamInput!): [Event]
		findEventsByUser(input: FindEventsByUserInput!): [Event]
	}
	extend type Mutation {
		addEvent(input: AddEventInput!): Event
		deleteEvent(input: DeleteEventInput!): Event
	}
`;

module.exports = Event;
