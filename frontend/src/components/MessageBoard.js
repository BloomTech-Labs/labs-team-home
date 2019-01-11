import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Message from './Message';

const Messageboard = styled.div`
	max-width: 600px;
	margin: 0 auto;
`;
const TopSection = styled.section`
	top: 20px;
	right: 18%;
	position: absolute;
`;

const StyledLink = styled(Link)`
	color: black;
	text-decoration: none;
	margin: 5px;
	font-weight: bold;
`;

const TeamName = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 40px;
`;

const Teamlogo = styled.div`
	display: flex;
	align-items: center;

	& button {
		height: 50%;
		margin-left: 5px;
	}
`;

const Logo = styled.img`
	display: inline;
	margin-right: 5px;
	border-radius: 45px;
`;

const MessagesContainer = styled.div`
	margin-top: 30px;
	border: 1px solid black;
`;

class MessageBoard extends React.Component {
	constructor() {
		super();
		this.state = {
			teamName: 'TeamHome',
			user: 'some id',
			messages: [
				{
					_id: '5c358baf93b69c7c387fd843',
					user: { firstName: 'Joe', lastName: 'Bob', avatar: null },
					team: 'Team Home',
					title: 'Example',
					content:
						'This is purely an example, none of this is from the database...yet. The image is hosted',
					images: [
						'https://res.cloudinary.com/massamb/image/upload/v1547153046/956_IMG_3495.jpg'
					],
					tags: ['test', 'tags'],
					comments: [
						'5c358baf93b69c7c387fb843',
						'5c358baf93b69c7c387fb234',
						'5c358baf93b69c7c387fb234'
					],
					subscribedUsers: [
						'5c358baf93b69c7c387fb843',
						'5c358baf93b69c7c387fb234',
						'5c358baf93b69c7c387fb234'
					]
				},
				{
					_id: '5c358baf93b69c7c387fb843',
					user: { firstName: 'Joe', lastName: 'Bob', avatar: null },
					team: 'Team Home',
					title: 'Example',
					content:
						'This is purely an example, none of this is from the database...yet. The image is hosted',
					images: [
						'https://res.cloudinary.com/massamb/image/upload/v1547153046/956_IMG_3495.jpg'
					],
					tags: ['test', 'tags'],
					comments: [
						'5c358baf93b69c7c387fb843',
						'5c358baf93b69c7c387fb234',
						'5c358baf93b69c7c387fb234'
					],
					subscribedUsers: [
						'5c358baf93b69c7c387fb843',
						'5c358baf93b69c7c387fb234',
						'5c358baf93b69c7c387fb234'
					]
				},
				{
					_id: '5c358baf93b69c7c387fc843',
					user: { firstName: 'Joe', lastName: 'Bob', avatar: null },
					team: 'Team Home',
					title: 'Example',
					content:
						'This is purely an example, none of this is from the database...yet. The image is hosted',
					images: [
						'https://res.cloudinary.com/massamb/image/upload/v1547153046/956_IMG_3495.jpg'
					],
					tags: ['test', 'tags'],
					comments: [
						'5c358baf93b69c7c387fb843',
						'5c358baf93b69c7c387fb234',
						'5c358baf93b69c7c387fb234'
					],
					subscribedUsers: [
						'5c358baf93b69c7c387fb843',
						'5c358baf93b69c7c387fb234',
						'5c358baf93b69c7c387fb234'
					]
				}
			],
			isAdmin: true
		};
	}

	componentDidMount() {
		// TODO: Get user and team info from database and store it in state
	}

	render() {
		return (
			<Messageboard>
				<TopSection>
					<StyledLink to="#">Settings</StyledLink>
					<StyledLink to="#">Sign Out</StyledLink>
				</TopSection>
				<TeamName>
					<h1>{this.state.teamName}</h1>
					<Teamlogo>
						<Logo src="https://via.placeholder.com/50.png" alt="team logo" />
						{this.state.isAdmin ? <button>Invite</button> : null}
					</Teamlogo>
				</TeamName>
				<MessagesContainer>
					{this.state.messages.map(message => {
						return <Message message={message} key={message._id} />;
					})}
				</MessagesContainer>
			</Messageboard>
		);
	}
}

export default MessageBoard;
