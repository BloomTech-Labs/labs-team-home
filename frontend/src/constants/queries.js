import gql from 'graphql-tag';
import * as f from './fragments';

export const FIND_TEAMS_BY_USER = gql`
	{
		findTeamsByUser {
			...FullTeam
		}
	}
	${f.FULL_TEAM}
`;

export const FIND_MESSAGES_BY_TEAM = gql`
	query findMessagesByTeam($id: ID) {
		findMessagesByTeam(input: { id: $id }) {
			...FullMessage
		}
	}
	${f.FULL_MESSAGE}
`;

export const FIND_TAGS_BY_TEAM = gql`
	query findTagsByTeam($id: ID) {
		findTagsByTeam(input: { id: $id }) {
			...FullTag
		}
	}
	${f.FULL_TAG}
`;

export const FIND_COMMENTS_BY_MESSAGE = gql`
	query findMsgCommentsByMessage($id: ID) {
		findMsgCommentsByMessage(input: { id: $id }) {
			...FullComment
		}
	}
	${f.FULL_COMMENT}
`;
