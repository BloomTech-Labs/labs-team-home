const Tag = require('./Tag');
const User = require('./User');
const Message = require('./Message');
const MsgComment = require('./MsgComment');
const Team = require('./Team');
const Folder = require('./Folder');
const { merge } = require('lodash');

module.exports = merge({}, Tag, User, Team, MsgComment, Message, Folder);
