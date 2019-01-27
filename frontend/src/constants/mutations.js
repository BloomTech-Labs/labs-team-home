import gql from 'graphql-tag';

import * as f from './fragments';

export const ADD_MESSAGE = gql`
	mutation addMessage(
		$team: String!
		$title: String!
		$content: String!
		$images: [String]
		$tags: [String]
	) {
		addMessage(
			input: {
				title: $title
				team: $team
				content: $content
				images: $images
				tags: $tags
			}
		) {
			...FullMessage
		}
	}
	${f.FULL_MESSAGE}
`;

export const UPDATE_MESSAGE = gql`
	mutation updateMessage(
		$id: ID!
		$team: String
		$title: String
		$content: String
		$images: [String]
		$tags: [String]
		$subscribedUsers: [String]
	) {
		updateMessage(
			input: {
				id: $id
				title: $title
				team: $team
				content: $content
				images: $images
				tags: $tags
				subscribedUsers: $subscribedUsers
			}
		) {
			...FullMessage
		}
	}
	${f.FULL_MESSAGE}
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
	${f.FULL_TAG}
`;

export const UPDATE_TAG = gql`
	mutation updateTag($id: ID!, $name: String, $team: String) {
		updateTag(input: { id: $id, name: $name, team: $team }) {
			...FullTag
		}
	}
	${f.FULL_TAG}
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
	${f.FULL_COMMENT}
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
	${f.FULL_COMMENT}
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
	${f.FULL_TEAM}
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
	${f.FULL_TEAM}
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
	${f.FULL_USER}
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
	${f.FULL_USER}
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
	${f.FULL_TEAM}
`;
