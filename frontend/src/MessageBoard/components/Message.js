import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
	border: 1px solid black;
	margin: 20px;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	@media (max-width: 800px) {
		flex-direction: column;
	}
`;

const Pic = styled.img`
	height: 50px;
	width: 50px;
`;

const MessagePreview = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	margin-left: 5px;

	& p {
		margin: 0;
		word-break: break-all;
		word-wrap: break-word;
	}

	& h5 {
		margin: 0;
		align-self: center;
	}

	& h4 {
		margin: 0;
		padding-top: 10px;
		align-self: center;
		font-size: 18px;
	}
`;

const Tag = styled.p``;

function Message(props) {
	let userInfo = props.userInfo;
	let message = props.message;
	//createdAt is passed as a string. Make it an int to conver to Date
	if (typeof message.createdAt === 'string')
		message.createdAt = new Date(parseInt(message.createdAt, 10));

	return (
		<MessageContainer onClick={props.openMessage}>
			<Pic
				src={
					userInfo.avatar
						? userInfo.avatar
						: 'https://via.placeholder.com/50.png'
				}
			/>
			<MessagePreview>
				<p>
					{message.title.length <= 20
						? message.title
						: message.title.slice(0, 19) + '...'}
				</p>
				<p>
					{`${userInfo.firstName} ${
						userInfo.lastName
					} - ${message.createdAt.toDateString()}`}
				</p>
				<p>
					{message.content.length <= 50
						? message.content
						: message.content.slice(0, 49) + '...'}
				</p>
			</MessagePreview>
			<MessagePreview>
				<h5>Comments</h5>
				<h4>{message.comments.length}</h4>
			</MessagePreview>
			<MessagePreview>
				<h5>Tag</h5>
				<Tag>{message.tag}</Tag>;
			</MessagePreview>
		</MessageContainer>
	);
}

export default Message;
