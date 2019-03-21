import gql from 'graphql-tag';

import {
	FULL_MESSAGE,
	FULL_TAG,
	FULL_COMMENT,
	FULL_TEAM,
	FULL_USER,
	FULL_FOLDER,
	FULL_DOCUMENT,
	FULL_DOCCOMMENT
} from './fragments';

export const ADD_MESSAGE = gql`
	mutation addMessage(
		$team: String!
		$title: String!
		$content: String!
		$images: [String]
		$tag: String
	) {
		addMessage(
			input: {
				title: $title
				team: $team
				content: $content
				images: $images
				tag: $tag
			}
		) {
			...FullMessage
		}
	}
	${FULL_MESSAGE}
`;

export const UPDATE_MESSAGE = gql`
	mutation updateMessage(
		$id: ID!
		$team: String
		$title: String
		$content: String
		$images: [String]
		$tag: String
		$subscribedUsers: [String]
	) {
		updateMessage(
			input: {
				id: $id
				title: $title
				team: $team
				content: $content
				images: $images
				tag: $tag
				subscribedUsers: $subscribedUsers
			}
		) {
			...FullMessage
		}
	}
	${FULL_MESSAGE}
`;

export const DELETE_MESSAGE = gql`
	mutation deleteMessage($id: ID!) {
		deleteMessage(input: { id: $id }) {
			_id
		}
	}
`;

export const ADD_TAG = gql`
	mutation addTag($name: String!, $team: String!) {
		addTag(input: { name: $name, team: $team }) {
			...FullTag
		}
	}
	${FULL_TAG}
`;

export const UPDATE_TAG = gql`
	mutation updateTag($id: ID!, $name: String, $team: String) {
		updateTag(input: { id: $id, name: $name, team: $team }) {
			...FullTag
		}
	}
	${FULL_TAG}
`;

export const DELETE_TAG = gql`
	mutation deleteTag($id: ID!) {
		deleteTag(input: { id: $id }) {
			_id
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation addMsgComment($message: String!, $content: String!) {
		addMsgComment(input: { message: $message, content: $content }) {
			...FullComment
		}
	}
	${FULL_COMMENT}
`;

export const UPDATE_COMMENT = gql`
	mutation updateMsgComment(
		$id: ID!
		$message: String
		$content: String
		$likes: [ID]
	) {
		updateMsgComment(
			input: { id: $id, message: $message, content: $content, likes: $likes }
		) {
			...FullComment
		}
	}
	${FULL_COMMENT}
`;

export const DELETE_COMMENT = gql`
	mutation deleteMsgComment($id: ID!) {
		deleteMsgComment(input: { id: $id }) {
			_id
		}
	}
`;

export const ADD_TEAM = gql`
	mutation addTeam($name: String!) {
		addTeam(input: { name: $name }) {
			...FullTeam
		}
	}
	${FULL_TEAM}
`;

export const UPDATE_TEAM = gql`
	mutation updateTeam(
		$id: ID!
		$name: String
		$users: [TeamUserInput]
		$premium: Boolean
	) {
		updateTeam(
			input: { id: $id, name: $name, users: $users, premium: $premium }
		) {
			...FullTeam
		}
	}
	${FULL_TEAM}
`;

export const DELETE_TEAM = gql`
	mutation deleteTeam($id: ID!) {
		deleteTeam(input: { id: $id }) {
			_id
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser(
		$firstName: String
		$lastName: String
		$email: String
		$phoneNumber: String
		$avatar: String
		$toggles: TogglesInput
	) {
		updateUser(
			input: {
				firstName: $firstName
				lastName: $lastName
				email: $email
				phoneNumber: $phoneNumber
				avatar: $avatar
				toggles: $toggles
			}
		) {
			...FullUser
		}
	}
	${FULL_USER}
`;

export const ADD_USER = gql`
	mutation addUser(
		$firstName: String!
		$lastName: String!
		$email: String!
		$avatar: String
		$phoneNumber: String
	) {
		addUser(
			input: {
				firstName: $firstName
				lastName: $lastName
				email: $email
				phoneNumber: $phoneNumber
				avatar: $avatar
			}
		) {
			...FullUser
		}
	}
	${FULL_USER}
`;

export const DELETE_USER = gql`
	mutation deleteUser {
		_id
	}
`;

export const INVITE_USER = gql`
	mutation inviteUser($id: ID!, $email: String, $phoneNumber: String) {
		inviteUser(input: { id: $id, email: $email, phoneNumber: $phoneNumber }) {
			...FullTeam
		}
	}
	${FULL_TEAM}
`;

export const KICK_USER = gql`
	mutation kickUser($id: ID!, $user: ID!) {
		kickUser(input: { id: $id, user: $user }) {
			...FullTeam
		}
	}
	${FULL_TEAM}
`;

export const LEAVE_TEAM = gql`
	mutation leaveTeam($id: ID!) {
		leaveTeam(input: { id: $id }) {
			_id
		}
	}
`;

export const SUBSCRIBE = gql`
	mutation subscribe($id: ID!) {
		subscribe(input: { id: $id }) {
			...FullMessage
		}
	}
	${FULL_MESSAGE}
`;

export const UNSUBSCRIBE = gql`
	mutation unsubscribe($id: ID!) {
		unsubscribe(input: { id: $id }) {
			...FullMessage
		}
	}
	${FULL_MESSAGE}
`;

export const LIKE = gql`
	mutation likeMsgComment($id: ID!) {
		likeMsgComment(input: { id: $id }) {
			...FullComment
		}
	}
	${FULL_COMMENT}
`;

export const UNLIKE = gql`
	mutation unLikeMsgComment($id: ID!) {
		unLikeMsgComment(input: { id: $id }) {
			...FullComment
		}
	}
	${FULL_COMMENT}
`;

//Folders
export const ADD_FOLDER = gql`
	mutation addFolder($team: String!, $title: String!) {
		addFolder(input: { title: $title, team: $team }) {
			...FullFolder
		}
	}
	${FULL_FOLDER}
`;

export const DELETE_FOLDER = gql`
	mutation deleteFolder($id: ID!) {
		deleteFolder(input: { id: $id }) {
			_id
		}
	}
`;

export const UPDATE_FOLDER = gql`
	mutation updateFolder($id: ID!, $title: String) {
		updateFolder(input: { id: $id, title: $title }) {
			...FullFolder
		}
	}
	${FULL_FOLDER}
`;

//Documents
export const ADD_DOCUMENT = gql`
	mutation addDocument(
		$team: String!
		$title: String!
		$content: String!
		$url: String!
		$folder: String
		$tag: String
	) {
		addDocument(
			input: {
				title: $title
				team: $team
				textContent: $content
				doc_url: $url
				folder: $folder
				tag: $tag
			}
		) {
			...FullDocument
		}
	}
	${FULL_DOCUMENT}
`;

export const DELETE_DOCUMENT = gql`
	mutation deleteDocument($id: ID!) {
		deleteDocument(input: { id: $id }) {
			_id
		}
	}
`;

export const UPDATE_DOCUMENT = gql`
	mutation updateDocument(
		$id: ID!
		$title: String
		$textContent: String
		$doc_url: String
		$folder: String
		$subscribedUsers: [String]
	) {
		updateDocument(
			input: {
				id: $id
				title: $title
				textContent: $textContent
				doc_url: $doc_url
				folder: $folder
				subscribedUsers: $subscribedUsers
			}
		) {
			...FullDocument
		}
	}
	${FULL_DOCUMENT}
`;

export const ADD_DOCCOMMENT = gql`
	mutation addDocComment($document: String!, $content: String!) {
		addDocComment(input: { document: $document, content: $content }) {
			...FullDocComment
		}
	}
	${FULL_DOCCOMMENT}
`;

export const DELETE_DOCCOMMENT = gql`
	mutation deleteDocComment($id: ID!) {
		deleteDocComment(input: { id: $id }) {
			_id
		}
	}
`;

export const UPDATE_DOCCOMMENT = gql`
	mutation updateDocComment(
		$id: ID!
		$document: String
		$content: String
		$likes: [ID]
	) {
		updateDocComment(
			input: { id: $id, document: $document, content: $content, likes: $likes }
		) {
			...FullDocComment
		}
	}
	${FULL_DOCCOMMENT}
`;

export const LIKE_DOCCOMMENT = gql`
	mutation likeDocComment($id: ID!) {
		likeDocComment(input: { id: $id }) {
			...FullDocComment
		}
	}
	${FULL_DOCCOMMENT}
`;

export const UNLIKE_DOCCOMMENT = gql`
	mutation unLikeDocComment($id: ID!) {
		unLikeDocComment(input: { id: $id }) {
			...FullDocComment
		}
	}
	${FULL_DOCCOMMENT}
`;

export const SUBSCRIBE_DOC = gql`
	mutation subscribeDoc($id: ID!) {
		subscribeDoc(input: { id: $id }) {
			...FullDocument
		}
	}
	${FULL_DOCUMENT}
`;

export const UNSUBSCRIBE_DOC = gql`
	mutation unsubscribeDoc($id: ID!) {
		unsubscribeDoc(input: { id: $id }) {
			...FullDocument
		}
	}
	${FULL_DOCUMENT}
`;
