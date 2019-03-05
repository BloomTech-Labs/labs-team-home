import { graphql } from 'react-apollo';
import * as query from '../../constants/queries';
import {
	ADD_COMMENT,
	UPDATE_COMMENT,
	DELETE_COMMENT,
	LIKE,
	UNLIKE
} from '../../constants/mutations';

const addCommentOptions = {
	props: ({ ownProps: { message }, mutate }) => ({
		addMsgComment: input =>
			mutate({
				variables: input,
				update: (cache, { data: { addMsgComment } }) => {
					const { findMsgCommentsByMessage } = cache.readQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id }
					});
					cache.writeQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id },
						data: {
							findMsgCommentsByMessage: [
								...findMsgCommentsByMessage,
								addMsgComment
							]
						}
					});
				}
			})
	})
};

export const addComment = graphql(ADD_COMMENT, addCommentOptions);

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

const deleteCommentOptions = {
	props: ({ ownProps: { message }, mutate }) => ({
		deleteMsgComment: input =>
			mutate({
				variables: input,
				update: (cache, { data: { deleteMsgComment } }) => {
					const { findMsgCommentsByMessage } = cache.readQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id }
					});
					cache.writeQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id },
						data: {
							findMsgCommentsByMessage: findMsgCommentsByMessage.filter(
								({ _id }) => _id !== deleteMsgComment._id
							)
						}
					});
				}
			})
	})
};

export const deleteComment = graphql(DELETE_COMMENT, deleteCommentOptions);

const likeOptions = {
	props: ({ ownProps: { message }, mutate }) => ({
		like: input =>
			mutate({
				variables: input,
				update: (cache, { data: { likeMsgComment } }) => {
					const { findMsgCommentsByMessage } = cache.readQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id }
					});
					cache.writeQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id },
						data: {
							findMsgCommentsByMessage: findMsgCommentsByMessage.map(comment =>
								comment._id === likeMsgComment._id ? likeMsgComment : comment
							)
						}
					});
				}
			})
	})
};

export const like = graphql(LIKE, likeOptions);

const unLikeOptions = {
	props: ({ ownProps: { message }, mutate }) => ({
		unLike: input =>
			mutate({
				variables: input,
				update: (cache, { data: { unLikeMsgComment } }) => {
					const { findMsgCommentsByMessage } = cache.readQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id }
					});
					cache.writeQuery({
						query: query.FIND_COMMENTS_BY_MESSAGE,
						variables: { message: message._id },
						data: {
							findMsgCommentsByMessage: findMsgCommentsByMessage.map(comment =>
								comment._id === unLikeMsgComment._id
									? unLikeMsgComment
									: comment
							)
						}
					});
				}
			})
	})
};

export const unLike = graphql(UNLIKE, unLikeOptions);
