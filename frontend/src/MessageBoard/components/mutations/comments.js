import { graphql } from 'react-apollo';
import {
	ADD_COMMENT,
	UPDATE_COMMENT,
	DELETE_COMMENT,
	LIKE,
	UNLIKE
} from '../../../constants/mutations';

export const addComment = graphql(ADD_COMMENT);

export const updateComment = graphql(UPDATE_COMMENT);

export const deleteComment = graphql(DELETE_COMMENT);

export const like = graphql(LIKE);

export const unlike = graphql(UNLIKE);
