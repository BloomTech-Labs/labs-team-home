require('dotenv').config();
const Event = require('../../models/Event');
const ResolverHelpers = require('./ResolverHelpers.js');
const { ValidationError } = require('apollo-server-express');

const eventResolver = {
	Query: {
		events: () => Event.find().populate('team user'),
		findEvent: (_, { input: { id } }) =>
			Event.findById(id)
				.populate('team user')
				.then(event => event),
		findEventsByTeam: async (_, { input: { team, limit, offset } }) => {
			const events = await Event.find({ team: team })
				.sort({ createdAt: -1 })
				.limit(limit)
				.skip(offset)
				.populate('team user');
			return events;
		},
		findEventsByUser: async (_, { input: { user } }) => {
			const events = await Event.find({ user: user }).populate('team user');
			return events;
		}
	},

	Mutation: {
		addEvent: async (_, { input }) => {
			const event = await new Event(input).save();
			return event;
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

module.exports = eventResolver;
