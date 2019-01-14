import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Message from './Message';
import AddMessage from './AddMessage';

const Messageboard = styled.div`
	max-width: 800px;
	width: 100%;
	margin: 0 auto;
	background-color: white;
	color: black;

	& p {
		font-size: 16px;
	}
`;
const TopSection = styled.section`
	margin-left: 8%;
	margin-right: 8%;
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
	margin: 30px 20px;
	border: 1px solid black;
`;

class MessageBoard extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			teamName: 'TeamHome',
			user: 'some id',
			messages: [],
			isAdmin: true
		};
	}

	componentDidMount() {
		// TODO: Get user and team info from database and store it in state
	}

	render() {
		return (
			<Messageboard>
				{this.state.showModal ? <AddMessage /> : null}
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
