import { graphql } from 'react-apollo';
import * as query from '../../constants/queries';
import {
	ADD_DOCCOMMENT,
	UPDATE_DOCCOMMENT,
	DELETE_DOCCOMMENT,
	LIKE_DOCCOMMENT,
	UNLIKE_DOCCOMMENT
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

export const add_DocComment = graphql(ADD_DOCCOMMENT, addDocCommentOptions);

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

const likeDocCommentOptions = {
	props: ({ ownProps: { document }, mutate }) => ({
		likeDocComment: input =>
			mutate({
				variables: input,
				update: (cache, { data: { likeDocComment } }) => {
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
									comment._id === likeDocComment._id ? likeDocComment : comment
							)
						}
					});
				}
			})
	})
};

export const likeDocComment = graphql(LIKE_DOCCOMMENT, likeDocCommentOptions);

const unLikeDocCommentOptions = {
	props: ({ ownProps: { document }, mutate }) => ({
		unLikeDocComment: input =>
			mutate({
				variables: input,
				update: (cache, { data: { unLikeDocComment } }) => {
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
									comment._id === unLikeDocComment._id
										? unLikeDocComment
										: comment
							)
						}
					});
				}
			})
	})
};

export const unLikeDocComment = graphql(
	UNLIKE_DOCCOMMENT,
	unLikeDocCommentOptions
);
