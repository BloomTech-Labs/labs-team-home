import gql from 'graphql-tag';

export const FULL_USER = gql`
	fragment FullUser on User {
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
`;

export const FULL_TEAM = gql`
	fragment FullTeam on Team {
		_id
		name
		users {
			user {
				...FullUser
			}
			admin
		}
		premium
	}
	${FULL_USER}
`;

export const FULL_TAG = gql`
	fragment FullTag on Tag {
		_id
		name
		team {
			_id
		}
	}
`;

export const FULL_MESSAGE = gql`
	fragment FullMessage on Message {
		_id
		title
		user {
			...FullUser
		}
		content
		images
		tag {
			...FullTag
		}
		comments
		subscribedUsers {
			_id
		}
		createdAt
		updatedAt
	}
	${FULL_USER}
	${FULL_TAG}
`;

export const FULL_COMMENT = gql`
	fragment FullComment on MsgComment {
		_id
		user {
			...FullUser
		}
		message {
			_id
		}
		content
		image
		likes {
			_id
		}
		createdAt
		updatedAt
	}
	${FULL_USER}
`;

export const FULL_FOLDER = gql`
	fragment FullFolder on Folder {
		_id
		title
		team {
			name
		}
		user {
			...FullUser
		}
		createdAt
		updatedAt
	}
	${FULL_USER}
`;

export const FULL_DOCUMENT = gql`
	fragment FullDocument on Document {
		_id
		title
		doc_url
		tag {
			...FullTag
		}
		team {
			_id
		}
		folder {
			_id
		}
		user {
			...FullUser
		}
		createdAt
		updatedAt
		textContent
		subscribedUsers {
			_id
		}
	}
	${FULL_USER}
	${FULL_TAG}
`;

export const FULL_DOCCOMMENT = gql`
	fragment FullDocComment on DocComment {
		_id
		user {
			...FullUser
		}
		document {
			_id
		}
		content
		image
		likes {
			_id
		}
		createdAt
		updatedAt
	}
	${FULL_USER}
`;

export const FULL_EVENT = gql`
	fragment FullEvent on Event {
		_id
		team {
			...FullTeam
		}
		user {
			...FullUser
		}
		action_string
		object_string
		event_target_id
		createdAt
	}
	${FULL_TEAM}
	${FULL_USER}
`;
