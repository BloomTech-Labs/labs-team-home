import { graphql } from 'react-apollo';
import * as query from '../../constants/queries';
import {
	ADD_DOCCOMMENT,
	UPDATE_DOCCOMMENT,
	DELETE_DOCCOMMENT
	// LIKE,
	// UNLIKE
} from '../../constants/mutations';

const addDocCommentOptions = {
	props: ({ ownProps: { document }, mutate }) => ({
		addDocComment: input =>
			mutate({
				variables: input,
				update: (cache, { data: { addDocComment } }) => {
					const { findDocCommentsByDocument } = cache.readQuery({
						query: query.FIND_COMMENTS_BY_DOCUMENT,
						variables: { document: document._id }
					});
					cache.writeQuery({
						query: query.FIND_COMMENTS_BY_DOCUMENT,
						variables: { document: document._id },
						data: {
							findDocCommentsByDocument: [
								...findDocCommentsByDocument,
								addDocComment
							]
						}
					});
				}
			})
	})
};

export const addDocComment = graphql(ADD_DOCCOMMENT, addDocCommentOptions);

const updateDocCommentOptions = {
	props: ({ ownProps: { document }, mutate }) => ({
		updateDocComment: input =>
			mutate({
				variables: input,
				update: (cache, { data: { updateDocComment } }) => {
					const { findDocCommentsByDocument } = cache.readQuery({
						query: query.FIND_COMMENTS_BY_DOCUMENT,
						variables: { document: document._id }
					});
					cache.writeQuery({
						query: query.FIND_COMMENTS_BY_DOCUMENT,
						variables: { document: document._id },
						data: {
							findDocCommentsByDocument: findDocCommentsByDocument.map(
								comment =>
									comment._id === updateDocComment._id
										? updateDocComment
										: comment
							)
						}
					});
				}
			})
	})
};

export const updateDocComment = graphql(
	UPDATE_DOCCOMMENT,
	updateDocCommentOptions
);

const deleteDocCommentOptions = {
	props: ({ ownProps: { document }, mutate }) => ({
		deleteDocComment: input =>
			mutate({
				variables: input,
				update: (cache, { data: { deleteDocComment } }) => {
					const { findDocCommentsByDocument } = cache.readQuery({
						query: query.FIND_COMMENTS_BY_DOCUMENT,
						variables: { document: document._id }
					});
					cache.writeQuery({
						query: query.FIND_COMMENTS_BY_DOCUMENT,
						variables: { document: document._id },
						data: {
							findDocCommentsByDocument: findDocCommentsByDocument.filter(
								({ _id }) => _id !== deleteDocComment._id
							)
						}
					});
				}
			})
	})
};

export const deleteDocComment = graphql(
	DELETE_DOCCOMMENT,
	deleteDocCommentOptions
);

// const likeOptions = {
// 	props: ({ ownProps: { message }, mutate }) => ({
// 		like: input =>
// 			mutate({
// 				variables: input,
// 				update: (cache, { data: { likeMsgComment } }) => {
// 					const { findMsgCommentsByMessage } = cache.readQuery({
// 						query: query.FIND_COMMENTS_BY_MESSAGE,
// 						variables: { message: message._id }
// 					});
// 					cache.writeQuery({
// 						query: query.FIND_COMMENTS_BY_MESSAGE,
// 						variables: { message: message._id },
// 						data: {
// 							findMsgCommentsByMessage: findMsgCommentsByMessage.map(comment =>
// 								comment._id === likeMsgComment._id ? likeMsgComment : comment
// 							)
// 						}
// 					});
// 				}
// 			})
// 	})
// };

// export const like = graphql(LIKE, likeOptions);

// const unLikeOptions = {
// 	props: ({ ownProps: { message }, mutate }) => ({
// 		unLike: input =>
// 			mutate({
// 				variables: input,
// 				update: (cache, { data: { unLikeMsgComment } }) => {
// 					const { findMsgCommentsByMessage } = cache.readQuery({
// 						query: query.FIND_COMMENTS_BY_MESSAGE,
// 						variables: { message: message._id }
// 					});
// 					cache.writeQuery({
// 						query: query.FIND_COMMENTS_BY_MESSAGE,
// 						variables: { message: message._id },
// 						data: {
// 							findMsgCommentsByMessage: findMsgCommentsByMessage.map(comment =>
// 								comment._id === unLikeMsgComment._id
// 									? unLikeMsgComment
// 									: comment
// 							)
// 						}
// 					});
// 				}
// 			})
// 	})
// };

// export const unLike = graphql(UNLIKE, unLikeOptions);
