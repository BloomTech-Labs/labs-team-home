import { graphql } from 'react-apollo';
import * as query from '../../constants/queries';
import {
	ADD_MESSAGE,
	UPDATE_MESSAGE,
	DELETE_MESSAGE,
	ADD_TAG,
	SUBSCRIBE,
	UNSUBSCRIBE
} from '../../constants/mutations';

const addMessageOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		addMessage: input =>
			mutate({
				variables: input,
				update: (cache, { data: { addMessage } }) => {
					const { findMessagesByTeam } = cache.readQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team },
						data: { findMessagesByTeam: [addMessage, ...findMessagesByTeam] }
					});
				}
			})
	})
};

export const addMessage = graphql(ADD_MESSAGE, addMessageOptions);

const updateMessageOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		updateMessage: input =>
			mutate({
				variables: input,
				update: (cache, { data: { updateMessage } }) => {
					const { findMessagesByTeam } = cache.readQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team },
						data: {
							findMessagesByTeam: findMessagesByTeam.map(message => {
								return message._id === updateMessage._id
									? updateMessage
									: message;
							})
						}
					});
				}
			})
	})
};

export const updateMessage = graphql(UPDATE_MESSAGE, updateMessageOptions);

const deleteMessageOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		deleteMessage: input =>
			mutate({
				variables: input,
				update: (cache, { data: { deleteMessage } }) => {
					const { findMessagesByTeam } = cache.readQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team },
						data: {
							findMessagesByTeam: findMessagesByTeam.filter(
								({ _id }) => _id !== deleteMessage._id
							)
						}
					});
				}
			})
	})
};

export const deleteMessage = graphql(DELETE_MESSAGE, deleteMessageOptions);

const addTagOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		addTag: input =>
			mutate({
				variables: input,
				update: (cache, { data: { addTag } }) => {
					const { findTagsByTeam } = cache.readQuery({
						query: query.FIND_TAGS_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_TAGS_BY_TEAM,
						variables: { team: team },
						data: {
							findTagsByTeam: [...findTagsByTeam, addTag]
						}
					});
				}
			})
	})
};

export const addTag = graphql(ADD_TAG, addTagOptions);

//////////////
const subscribeOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		subscribe: input =>
			mutate({
				variables: input,
				update: (cache, { data: { subscribe } }) => {
					const { findMessagesByTeam } = cache.readQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team },
						data: {
							findMessagesByTeam: findMessagesByTeam.map(message =>
								message._id === subscribe._id ? subscribe : message
							)
						}
					});
				}
			})
	})
};

export const subscribe = graphql(SUBSCRIBE, subscribeOptions);

////////////

const unsubscribeOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		unsubscribe: input =>
			mutate({
				variables: input,
				update: (cache, { data: { unsubscribe } }) => {
					const { findMessagesByTeam } = cache.readQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team },
						data: {
							findMessagesByTeam: findMessagesByTeam.map(message =>
								message._id === unsubscribe._id ? unsubscribe : message
							)
						}
					});
				}
			})
	})
};

export const unsubscribe = graphql(UNSUBSCRIBE, unsubscribeOptions);
