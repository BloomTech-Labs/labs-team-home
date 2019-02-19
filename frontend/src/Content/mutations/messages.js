import { graphql } from 'react-apollo';
import * as query from '../../constants/queries';
import {
	ADD_MESSAGE,
	UPDATE_MESSAGE,
	DELETE_MESSAGE,
	ADD_TAG
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
						query: query.FIND_MESSAGE,
						variables: { id: input.id },
						data: updateMessage
					});
					cache.writeQuery({
						query: query.FIND_MESSAGES_BY_TEAM,
						variables: { team: team },
						data: {
							findMessagesByTeam: findMessagesByTeam.map(message =>
								message._id === updateMessage._id ? updateMessage : message
							)
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
