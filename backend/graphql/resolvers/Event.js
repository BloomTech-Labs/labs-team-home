require('dotenv').config();
const Event = require('../../models/Event');

const { ValidationError } = require('apollo-server-express');

const action_str = {
	created: 'created',
	edited: 'edited',
	deleted: 'deleted',
	liked: 'liked',
	unliked: 'unliked',
	joined: 'joined',
	left: 'left',
	moved: 'moved',
	subscribed: 'subscribed',
	unsubscribed: 'unsubscribed',
	invited: 'invited'
};
const object_str = {
	message: 'message',
	msgComment: 'message comment',
	folder: 'folder',
	document: 'document',
	docComment: 'document comment',
	team: 'team',
	user: 'user'
};

const eventResolver = {
	Query: {
		events: () => Event.find().populate('team'),
		findEvent: (_, { input: { id } }) =>
			Event.findById(id)
				.populate('team')
				.then(event => event),
		findEventsByTeam: async (_, { input: { team } }) => {
			const events = await Event.find({ team: team }).populate('team');
			return events;
		},
		findEventsByUser: async (_, { input: { user } }) => {
			const events = await Event.find({ team: user }).populate('team');
			return events;
		}
	},

	Mutation: {
		addEvent: (_, { input }) => {
			console.log('hey nedim, ur a cool guy.');
			new Event({ ...input }).save().then(event => {
				console.log(input);
				event.populate('team').execPopulate();
			});
		},
		deleteEvent: (_, { input: { id } }) =>
			Event.findById(id).then(async event => {
				if (event) {
					await Event.findByIdAndDelete({ _id: id });
					return event;
				} else {
					throw new ValidationError("Event doesn't exist.");
				}
			})
	}
};

module.exports = { eventResolver, object_str, action_str };
