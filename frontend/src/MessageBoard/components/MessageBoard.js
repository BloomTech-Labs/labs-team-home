import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Message from './Message';
import AddMessage from './AddMessage';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Invites from './Invites';
import * as q from '../../constants/queries';
import MessageDetail from './MessageDetail';

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
		//temporary url
		this.URI =
			process.env.NODE_ENV === 'production'
				? 'https://team-home.herokuapp.com/invite'
				: 'http://localhost:5000/invite';

		this.state = {
			showModal: false,
			showInvite: false,
			currentMessage: null,
			messageDetailOpen: false,
			email: '',
			number: '',
			images: [],
			team: {
				name: 'TeamName',
				_id: '5c3e1df844c51289c59648ed',
				users: ['dfasdf', 'asdfsags']
			},
			user: '5c3cdac285d92c646e97678d',
			isAdmin: true
		};

		this.openModalHandler = this.openModalHandler.bind(this);
		this.closeModalHandler = this.closeModalHandler.bind(this);
		this.openInviteHandler = this.openInviteHandler.bind(this);
		this.closeInviteHandler = this.closeInviteHandler.bind(this);
		this.inviteChangeHandler = this.inviteChangeHandler.bind(this);
		this.inviteSubmitHandler = this.inviteSubmitHandler.bind(this);
		this.stopProp = this.stopProp.bind(this);
	}

	openInviteHandler() {
		this.setState({
			showInvite: true
		});
	}

	closeInviteHandler() {
		this.setState({
			showInvite: false
		});
	}

	inviteChangeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	inviteSubmitHandler(e) {
		e.preventDefault();
		axios
			.post(this.URI, { email: this.state.email, number: this.state.number })
			.then(res => {
				this.setState({
					email: ''
				});
			})
			.then(() => {
				this.closeInviteHandler();
				alert('Invitation sent');
			})
			.catch(err => {
				console.error(err);
			});
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

	openMessageDetail = e => {
		this.setState({ messageDetailOpen: true });
	};
	closeMessageDetail = e => {
		this.setState({ messageDetailOpen: false, currentMessage: null });
	};

	render() {
		return (
			<Messageboard>
				{this.state.showModal ? (
					<AddMessage
						closeHandler={this.closeModalHandler}
						stopProp={this.stopProp}
						team={this.state.team}
						user={this.state.user}
					/>
				) : null}
				{this.state.showInvite ? (
					<Invites
						closeHandler={this.closeInviteHandler}
						stopProp={this.stopProp}
						submitHandler={this.inviteSubmitHandler}
						changeHandler={this.inviteChangeHandler}
						email={this.state.email}
						number={this.state.number}
					/>
				) : null}
				<TeamName>
					<h1>{this.state.teamName}</h1>
					<Teamlogo>
						<Logo src="https://via.placeholder.com/50.png" alt="team logo" />
						{this.state.isAdmin ? (
							<button onClick={this.openInviteHandler}>Invite</button>
						) : null}
					</Teamlogo>
				</TeamName>
				<MessagesContainer>
					<AddMsgBtn onClick={this.openModalHandler}>+</AddMsgBtn>
					<Query
						query={q.FIND_MESSAGES_BY_TEAM}
						variables={{ team: this.props.match.params.team }}
					>
						{({ loading, error, data: { findMessagesByTeam } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;

							return findMessagesByTeam.map(message => (
								<div>
									<button
										onClick={e => {
											e.preventDefault();
											this.setState({
												messageDetailOpen: true,
												currentMessage: message
											});
											console.log(message);
										}}
									>
										Open Message
									</button>
									<Message
										message={message}
										userInfo={message.user}
										key={message._id}
									/>
								</div>
							));
						}}
					</Query>
				</MessagesContainer>
				<MessageDetail
					open={this.state.messageDetailOpen}
					hideModal={this.closeMessageDetail}
					message={this.state.currentMessage}
				/>
			</Messageboard>
		);
	}
}

export default MessageBoard;
