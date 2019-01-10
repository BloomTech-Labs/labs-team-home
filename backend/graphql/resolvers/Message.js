const Message = require('../../models/Message');

// const messageResolvers = {
// 	Query: {
// 		messages: () => Message.find(),
// 		findMessage: (_, input) => {
// 			return Message(input).findById();
// 		}
// 	},
// 	Mutation: {
// 		addMessage: (_, input) => {
// 			return new Message(input).save();
// 		},
// 		updateMessage: (_, input) => {
// 			Message.findById(input).then(message => {
// 				if (message) return Message.findOneAndUpdate(_id);
// 				else {
// 					throw new Error("Message doesn't exist");
// 				}
// 			});
// 		},
// 		deleteMessage: (_, input) => {
// 			Message.findById(input).then(message => {
// 				if (message) return Message.findOneAndDelete(_id);
// 				else {
// 					throw new Error("Message doesn't exist");
// 				}
// 			});
// 		}
// 	}
// };

// module.exports = messageResolvers;
