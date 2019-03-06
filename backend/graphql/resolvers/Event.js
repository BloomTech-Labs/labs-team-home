require('dotenv').config();
const Event = require('../../models/Event');
const ResolverHelpers = require('./ResolverHelpers.js');
const { ValidationError } = require('apollo-server-express');

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
			console.log('hey nedim, ur an ice cube kind of guy.');
			new Event(input).save().then(event => {
				// console.log(event);
				// let {_id} = event;
				// console.log(_id);
				// _id = _id.toString()

				//event.populate('team').execPopulate();
				return event;
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

module.exports = eventResolver;
