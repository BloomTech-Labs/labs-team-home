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

const AddMsgBtn = styled.button`
	border-radius: 45px;
	font-size: 40px;
	width: 75px;
	height: 75px;
	margin: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

class MessageBoard extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false,
			title: '',
			contents: '',
			images: [],
			team: {
				name: 'TeamName',
				_id: '5c3e1df844c51289c59648ed',
				users: ['dfasdf', 'asdfsags']
			},
			user: '5c3cdac285d92c646e97678d',
			messages: [],
			isAdmin: true
		};

		this.openModalHandler = this.openModalHandler.bind(this);
		this.closeModalHandler = this.closeModalHandler.bind(this);
		this.stopProp = this.stopProp.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}

	openModalHandler() {
		this.setState({
			showModal: true
		});
	}

	closeModalHandler() {
		this.setState({
			showModal: false
		});
	}

	stopProp(e) {
		e.stopPropagation();
	}

	changeHandler(e) {
		if (e.target.name === 'images') {
			let images = this.state.images;
			images.push(e.target.value);
			this.setState({
				images: images
			});
		} else {
			this.setState({
				[e.target.name]: e.target.value
			});
		}
	}

	submitHandler(e) {
		e.preventDefault();
		const newMessage = {
			title: this.state.title,
			user: this.state.user,
			team: this.state.teamName,
			content: this.state.contents,
			images: [],
			tags: [],
			subscribedUsers: []
		};
		console.log('New message created: ', newMessage);
	}

	render() {
		return (
			<Messageboard>
				{this.state.showModal ? (
					<AddMessage
						changeHandler={this.changeHandler}
						submitHandler={this.submitHandler}
						closeHandler={this.closeModalHandler}
						stopProp={this.stopProp}
						title={this.state.title}
						contents={this.state.contents}
						team={this.state.team}
						user={this.state.user}
					/>
				) : null}
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
					<AddMsgBtn onClick={this.openModalHandler}>+</AddMsgBtn>
					{this.state.messages.map(message => {
						return <Message message={message} key={message._id} />;
					})}
				</MessagesContainer>
			</Messageboard>
		);
	}
}

export default MessageBoard;
