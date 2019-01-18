import React from 'react';
import styled from 'styled-components';

const MessageContainer = styled.div`
	border: 1px solid black;
	margin: 20px;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
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
	message.createdAt = new Date(parseInt(message.createdAt, 10));

	return (
		<MessageContainer>
			<Pic
				src={
					userInfo.avatar
						? userInfo.avatar
						: 'https://via.placeholder.com/50.png'
				}
			/>
			<MessagePreview>
				<p>{message.title}</p>
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
				<h5>Tags</h5>
				{message.tags.map(tag => {
					return <Tag>{tag}</Tag>;
				})}
			</MessagePreview>
			{//note: images are shown here as a demo only. Will be removed and added to message detail
			message.images.length >= 1
				? message.images.map(pic => {
						return <img src={pic} />;
				  })
				: null}
		</MessageContainer>
	);
}

export default Message;
