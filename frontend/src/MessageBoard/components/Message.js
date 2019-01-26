import React from 'react';
import styled, { css } from 'styled-components';

const MessageContainer = styled.div`
	margin: 2% auto;
	background-color: rgba(107, 40, 59, 0.3);
	width: 100%;
	height: 80px;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	&:hover {
		background-color: rgba(107, 40, 59, 0.7);
	}
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

	& div {
		margin-left: 20px;
		word-break: break-all;
		word-wrap: break-word;
		font-size: 1.2rem;
	}

	& p.user-name {
		margin-left: 17%;
		margin-top: 1%;
		align-self: center;
		color: pink;
		font-size: 0.8rem;
	}

	& p.content {
		margin: 0;
		padding-top: 10px;
		align-self: center;
		font-size: 1px;
		display: none;
	}
	& h5.comments {
		margin: 0 0 2% 0;
	}
	& h5.comments-length {
		margin: 0 0 2% 0;
		left: 50px;
	}
	& h5.tags {
		margin: 0 0 2% 0;
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
				<div>
					{message.title.length <= 20
						? message.title
						: message.title.slice(0, 19) + '...'}
				</div>
				<p className="user-name">
					{`${userInfo.firstName} ${
						userInfo.lastName
					} - ${message.createdAt.toDateString()}`}
				</p>
				<p className="content">
					{message.content.length <= 50
						? message.content
						: message.content.slice(0, 49) + '...'}
				</p>
			</MessagePreview>
			<MessagePreview>
				<h5 className="comments">Comments</h5>
				<h5 className="comments-length">{message.comments.length}</h5>
			</MessagePreview>
			<MessagePreview>
				<h5 className="tags">Tags</h5>
				{message.tags.map(tag => {
					return <Tag>{tag}</Tag>;
				})}
			</MessagePreview>
		</MessageContainer>
	);
}

export default Message;
