import { graphql } from 'react-apollo';
import * as query from '../../../constants/queries';
import {
	ADD_MESSAGE,
	UPDATE_MESSAGE,
	DELETE_MESSAGE,
	SUBSCRIBE,
	UNSUBSCRIBE
} from '../../../constants/mutations';

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
						data: findMessagesByTeam.map(message =>
							message._id === updateMessage._id ? updateMessage : message
						)
					});
				}
			})
	})
};

export const updateMessage = graphql(UPDATE_MESSAGE, updateMessageOptions);

export const deleteMessage = graphql(DELETE_MESSAGE);

export const subscribe = graphql(SUBSCRIBE);

export const unsubscribe = graphql(UNSUBSCRIBE);
