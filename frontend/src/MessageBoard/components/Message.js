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
	return (
		<MessageContainer>
			<Pic
				src={
					props.message.user.avatar
						? props.message.user.avatar
						: 'https://via.placeholder.com/50.png'
				}
			/>
			<MessagePreview>
				<p>{props.message.title}</p>
				<p>
					{props.message.user.firstName} {props.message.user.lastName} -
					timestamp
				</p>
				<p>
					{props.message.content.length <= 40
						? props.message.content
						: props.message.content.slice(0, 39) + '...'}
				</p>
			</MessagePreview>
			<MessagePreview>
				<h5>Comments</h5>
				<h4>{props.message.comments.length}</h4>
			</MessagePreview>
			<MessagePreview>
				<h5>Tags</h5>
				{props.message.tags.map(tag => {
					return <Tag>{tag}</Tag>;
				})}
			</MessagePreview>
		</MessageContainer>
	);
}

export default Message;
