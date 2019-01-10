import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
	border: 1px solid black;
	margin: 20px;
`;

const Pic = styled.img`
	position: relative;
	left: 0;
`;

function Message(props) {
	return (
		<MessageContainer>
			<Pic
				src={
					props.message.user.avatar
						? props.message.user.avatar
						: 'https://via.placeholder.com/50.png'
				}
			/>
		</MessageContainer>
	);
}

export default Message;
