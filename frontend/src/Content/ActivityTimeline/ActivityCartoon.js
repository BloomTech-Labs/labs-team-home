import React from 'react';

import styled from 'styled-components';

import { Create } from 'styled-icons/material/Create';
import { TrashAlt } from 'styled-icons/fa-solid/TrashAlt';
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

const StyledEdit = styled(Create)`
	color: white;
	height: 25px;
`;

const StyledTrashAlt = styled(TrashAlt)`
	color: white;
	height: 18px;
	margin-top: 5px;
	/* margin-top: 2px; */
`;

const StyledAdd = styled(Add)`
	color: white;
	height: 25px;
`;

const StyledLike = styled(Like)`
	color: white;
	height: 25px;
`;

const StyledDislike = styled(Dislike)`
	color: white;
	height: 25px;
`;

const StyledMinusCircle = styled(MinusCircle)`
	color: white;
	height: 25px;
`;

const StyledExit = styled(Exit)`
	color: white;
	height: 20px;
`;

const StyledNotificationsActive = styled(NotificationsActive)`
	color: white;
	height: 25px;
`;

const StyledNotificationsOff = styled(NotificationsOff)`
	color: white;
	height: 25px;
`;

const StyledEnvelope = styled(Envelope)`
	color: white;
	height: 25px;
`;

const StyledComment = styled(Comment)`
	color: white;
	height: 25px;
	margin-top: 5px;
`;

const StyledFolder = styled(Folder)`
	color: white;
	height: 25px;
	margin-top: 5px;
`;

const StyledNote = styled(Note)`
	color: white;
	height: 25px;
`;

const StyledUserAlt = styled(UserAlt)`
	color: white;
	height: 25px;
`;

const StyledUsers = styled(Users)`
	color: white;
	height: 25px;
	margin-top: 5px;
`;

const InnerDiv = styled.div`
	margin: 5px;
`;

const ActivityCartoon = props => {
	let { action, object } = props;
	return (
		<>
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
		</>
	);
};

export default ActivityCartoon;
