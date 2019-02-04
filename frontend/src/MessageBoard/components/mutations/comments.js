import { graphql } from 'react-apollo';
import * as query from '../../../constants/queries';
import {
	ADD_COMMENT,
	UPDATE_COMMENT,
	DELETE_COMMENT,
	LIKE,
	UNLIKE
} from '../../../constants/mutations';

export const addComment = graphql(ADD_COMMENT);

const updateCommentOptions = {
	props: ({ ownProps: { message }, mutate }) => ({
		updateMsgComment: input =>
			mutate({
				variables: input,
				update: (cache, { data: { updateMsgComment } }) => {
					const { findMsgCommentsByMessage } = cache.readQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id }
					});
					cache.writeQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id },
						data: {
							findMsgCommentsByMessage: findMsgCommentsByMessage.map(comment =>
								comment._id === updateMsgComment._id
									? updateMsgComment
									: comment
							)
						}
					});
				}
			})
	})
};

export const updateComment = graphql(UPDATE_COMMENT, updateCommentOptions);

export const deleteComment = graphql(DELETE_COMMENT);

export const like = graphql(LIKE);

export const unlike = graphql(UNLIKE);
