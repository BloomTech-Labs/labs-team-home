require('dotenv').config();
const Folder = require('../../models/Folder');

const { ValidationError } = require('apollo-server-express');

const folderResolver = {
	Query: {
		// folders: () => Folder.find().populate('user team')
		folders() {
			return [{ id: 1, title: 'some title' }];
		}
	}
};

module.exports = folderResolver;
