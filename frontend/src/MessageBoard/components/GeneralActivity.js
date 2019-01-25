import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	height: 75px;
	width: 80%;
	border: 1px solid black;
	background-color: white;
	padding: 20px;
	margin: 20px;

	& p {
		margin: 0 10px;
	}

	& img {
		height: 50px;
		width: 50px;
	}
`;

const Info = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5px 10px;
`;

const Title = styled.p`
	font-weight: bold;
`;

export default function GeneralActivity(props) {
	if (props.message.__typename === 'Message') {
		return (
			<Container>
				<img src={props.message.user.avatar} alt="User avatar" />
				<Info>
					<p>
						{props.message.user.firstName} {props.message.user.lastName} posted
						a new message
					</p>
					<p>{props.message.updatedAt.toDateString()}</p>
					<Title>{props.message.title}</Title>
				</Info>
			</Container>
		);
	} else {
		return <div />;
	}
}
