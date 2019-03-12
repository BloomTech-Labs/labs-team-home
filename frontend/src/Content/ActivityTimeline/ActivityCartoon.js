import React from 'react';

import styled from 'styled-components';

import { Create } from 'styled-icons/material/Create';
import { TrashAlt } from 'styled-icons/fa-solid/TrashAlt';
import { AddCircle } from 'styled-icons/material/AddCircle';
import { MinusCircle } from 'styled-icons/boxicons-regular/MinusCircle';
import { Like } from 'styled-icons/boxicons-solid/Like';
import { Dislike } from 'styled-icons/boxicons-solid/Dislike';
import { UserAlt } from 'styled-icons/fa-solid/UserAlt';
import { Exit } from 'styled-icons/icomoon/Exit';
import { NotificationsActive } from 'styled-icons/material/NotificationsActive';
import { NotificationsOff } from 'styled-icons/material/NotificationsOff';
import { Envelope } from 'styled-icons/boxicons-solid/Envelope';
import { Comment } from 'styled-icons/fa-solid/Comment';
import { Folder } from 'styled-icons/fa-solid/Folder';
import { Note } from 'styled-icons/material/Note';
import { Users } from 'styled-icons/fa-solid/Users';
import { Add } from 'styled-icons/material/Add';

// left: 'left', Exit
// moved: 'moved', -- not used
// subscribed: 'subscribed to',
// unsubscribed: 'unsubscribed from',
// invited: 'invited', AddCircle
// updated: 'updated', Create
// removed: 'removed' minuscircle

// message: 'message', envelop
// msgComment: 'message comment', comment
// folder: 'folder', fodler
// document: 'document', note
// docComment: 'document comment', comment
// team: 'team', Users
// user: 'user' UserCircle

const StyledEdit = styled(Create)`
	color: white;
	height: 1.3rem;
`;

const StyledTrashAlt = styled(TrashAlt)`
	color: white;
	height: 1rem;
	margin-top: 2px;
`;

const StyledAdd = styled(Add)`
	color: white;
	height: 1.3rem;
`;

const StyledLike = styled(Like)`
	color: white;
	height: 1.6rem;
`;

const StyledDislike = styled(Dislike)`
	color: white;
	height: 1.6rem;
`;

const StyledMinusCircle = styled(MinusCircle)`
	color: white;
	height: 1.6rem;
`;

const StyledExit = styled(Exit)`
	color: white;
	height: 1.6rem;
`;

const StyledNotificationsActive = styled(NotificationsActive)`
	color: white;
	height: 1.6rem;
`;

const StyledNotificationsOff = styled(NotificationsOff)`
	color: white;
	height: 1.6rem;
`;

const StyledEnvelope = styled(Envelope)`
	color: white;
	height: 1.5rem;
`;

const StyledComment = styled(Comment)`
	color: white;
	height: 1.4rem;
`;

const StyledFolder = styled(Folder)`
	color: white;
	height: 1.2rem;
`;

const StyledNote = styled(Note)`
	color: white;
	height: 1.4rem;
`;

const StyledUserAlt = styled(UserAlt)`
	color: white;
	height: 1.1rem;
`;

const StyledUsers = styled(Users)`
	color: white;
	height: 1.4rem;
`;

const WarpperDiv = styled.div`
	display: flex;
	margin: 3px;
	margin-right: 5px;
	margin-left: 0;
`;
const InnerDiv = styled.div`
	margin: 3px;
`;

const ActivityCartoon = props => {
	let { action, object } = props;
	return (
		<WarpperDiv>
			<InnerDiv>
				{action === 'added' || action === 'created' || action === 'invited' ? (
					<StyledAdd />
				) : null}
				{action === 'edited' || action === 'updated' ? <StyledEdit /> : null}
				{action === 'deleted' ? <StyledTrashAlt /> : null}
				{action === 'liked' ? <StyledLike /> : null}
				{action === 'unliked' ? <StyledDislike /> : null}
				{action === 'removed' ? <StyledMinusCircle /> : null}
				{action === 'left' ? <StyledExit /> : null}
				{action === 'subscribed to' ? <StyledNotificationsActive /> : null}
				{action === 'unsubscribed from' ? <StyledNotificationsOff /> : null}
			</InnerDiv>{' '}
			<InnerDiv>
				{object === 'message' ? <StyledEnvelope /> : null}
				{object === 'message comment' || object === 'document comment' ? (
					<StyledComment />
				) : null}
				{object === 'folder' ? <StyledFolder /> : null}
				{object === 'document' ? <StyledNote /> : null}
				{object === 'user' ? <StyledUserAlt /> : null}
				{object === 'team' ? <StyledUsers /> : null}
			</InnerDiv>
		</WarpperDiv>
	);
};

export default ActivityCartoon;
