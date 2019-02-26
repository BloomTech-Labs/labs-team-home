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
	query findMessagesByTeam($team: ID!) {
		findMessagesByTeam(input: { team: $team }) {
			...FullMessage
		}
	}
	${f.FULL_MESSAGE}
`;

export const FIND_MESSAGE = gql`
	query findMessage($id: ID!) {
		findMessage(input: { id: $id }) {
			...FullMessage
		}
	}
	${f.FULL_MESSAGE}
`;

export const FIND_TEAM = gql`
	query findTeam($id: ID!) {
		findTeam(input: { id: $id }) {
			...FullTeam
		}
	}
	${f.FULL_TEAM}
`;

export const FIND_TAGS_BY_TEAM = gql`
	query findTagsByTeam($team: ID!) {
		findTagsByTeam(input: { team: $team }) {
			...FullTag
		}
	}
	${f.FULL_TAG}
`;

export const FIND_COMMENTS_BY_MESSAGE = gql`
	query findMsgCommentsByMessage($message: ID!) {
		findMsgCommentsByMessage(input: { message: $message }) {
			...FullComment
		}
	}
	${f.FULL_COMMENT}
`;

export const CURRENT_USER = gql`
	query {
		currentUser {
			_id
			authId
			firstName
			lastName
			email
			phoneNumber
			avatar
			toggles {
				receiveEmails
				receiveTexts
			}
		}
	}
`;

export const FIND_FOLDER = gql`
	query findFolders($id: ID!) {
		findFolders(input: { id: $id }) {
			...FullFolder
		}
	}
	${f.FULL_FOLDER}
`;

export const FIND_FOLDERS_BY_TEAM = gql`
	query findFoldersByTeam($team: ID!) {
		findFoldersByTeam(input: { team: $team }) {
			...FullFolder
		}
	}
	${f.FULL_FOLDER}
`;

export const FIND_DOCUMENTS_BY_TEAM = gql`
	query findDocumentsByTeam($team: ID!) {
		findDocumentsByTeam(input: { team: $team }) {
			...FullDocument
		}
	}
	${f.FULL_DOCUMENT}
`;

export const FIND_DOCUMENT = gql`
	query findDocument($id: ID!) {
		findDocument(input: { id: $id }) {
			...FullDocument
		}
	}
	${f.FULL_DOCUMENT}
`;

export const FIND_COMMENTS_BY_DOCUMENT = gql`
	query findDocCommentsByDocument($document: ID!) {
		findDocCommentsByDocument(input: { document: $document }) {
			...FullDocComment
		}
	}
	${f.FULL_DOCCOMMENT}
`;
