const action_str = {
	added: 'added',
	created: 'created',
	edited: 'edited',
	deleted: 'deleted',
	liked: 'liked',
	unliked: 'unliked',
	joined: 'joined',
	left: 'left',
	moved: 'moved',
	subscribed: 'subscribed to',
	unsubscribed: 'unsubscribed from',
	invited: 'invited',
	updated: 'updated',
	removed: 'removed'
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

module.exports = { action_str, object_str };
