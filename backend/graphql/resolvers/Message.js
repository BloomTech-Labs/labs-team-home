const Message = require('../../models/Message');

const messageResolvers = {
	Query: {
		messages: () =>
			Message.find().populate('user team tags comments subscribedUsers'),
		findMessage: (_, { input: { id } }) => {
			return Message.findById(id).populate(
				'user team tags comments subscribedUsers'
			);
		}
	},
	Mutation: {
		addMessage: (_, { input }) => {
			const { title, user, content } = input;
			if (!title && !user && !content)
				throw new Error('Title, user and content are required.');
			return new Message(input)
				.save()
				.populate('user team tags comments subscribedUsers');
		},
		updateMessage: (_, { input }) => {
			const {
				id,
				title,
				user,
				content,
				images,
				tags,
				comments,
				subscribedUsers,
				createdAt,
				updatedAt
			} = input;
			if (
				!id &&
				!title &&
				!user &&
				!content &&
				!images &&
				!tags &&
				!comments &&
				!subscribedUsers &&
				!createdAt &&
				!updatedAt
			)
				throw new Error('No fields changed');
			return Message.findById(id).then(message => {
				if (message) {
					return Message.findOneAndUpdate(
						{ _id: id },
						{ $set: input },
						{ new: true }
					).populate('user team tags comments subscribedUsers');
				} else {
					throw new Error("Message doesn't exist");
				}
			});
		},
		deleteMessage: (_, { input: { id } }) => {
			return Message.findById(id).then(message => {
				if (message) return Message.findOneAndDelete({ _id: id });
				else {
					throw new Error("Message doesn't exist");
				}
			});
		}
	}
};

module.exports = messageResolvers;
