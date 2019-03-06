const Tag = require('./Tag');
const User = require('./User');
const Message = require('./Message');
const MsgComment = require('./MsgComment');
const Team = require('./Team');
const Folder = require('./Folder');
const Document = require('./Document');
const DocComment = require('./DocComment');
const { merge } = require('lodash');
const Event = require('./Event');

module.exports = merge(
	{},
	Tag,
	User,
	Team,
	MsgComment,
	Message,
	Folder,
	Document,
	DocComment,
	Event
);
