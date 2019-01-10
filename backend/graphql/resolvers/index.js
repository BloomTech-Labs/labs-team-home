const Tag = require('./Tag');
const User = require('./User');
const Message = require('./Message');
const MsgComment = require('./MsgComment');
const Team = require('./Team');
const { merge } = require('lodash');

module.exports = merge({}, Tag, User);
