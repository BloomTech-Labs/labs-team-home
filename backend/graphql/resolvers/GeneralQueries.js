require('dotenv').config();
const Message = require('../../models/Message');
const MsgComment = require('../../models/MsgComment');
const Folder = require('../../models/Folder');
const Document = require('../../models/Document');
const DocComment = require('../../models/DocComment');

const generalResolver = {
	Query: {
		findAllActivities: async (_, { input: { team } }) => {
			const documents = await Document.find({ team: team }).populate(
				'user team folder subscribedUsers'
			);
			const docComments = await documents.map(doc => {
				return DocComment.findById(doc._id)
					.populate('user document likes')
					.then(comment => comment);
			});

			const folders = await Folder.find({ team: team }).populate(
				'user team documents'
			);
			const messages = await Message.find({ team: team }).populate(
				'user team subscribedUsers'
			);
			const msgComments = await messages.map(message => {
				return MsgComment.find({ message: message })
					.populate('user message likes')
					.then(comment => comment);
			});
			return [
				{ documents },
				{ folders },
				{ messages },
				{ docComments },
				{ msgComments }
			];
		}
	}
};

module.exports = generalResolver;
