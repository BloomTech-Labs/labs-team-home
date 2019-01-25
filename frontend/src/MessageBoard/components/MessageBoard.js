import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Message from './Message';
import AddMessage from './AddMessage';
import { Query, Mutation } from 'react-apollo';
import Invites from './Invites';
import * as query from '../../constants/queries';
import * as mutation from '../../constants/mutations';
import mediaQueryFor from '../../_global_styles/responsive_querie';

import MessageDetail from './MessageDetail';
import UserList from './UserList';
const TH_logo = 'https://i.imgur.com/31LTJFH.png';
const TH_name = 'TeamHome';

/**
 * Color palette:
 * #17151B << Dark Gray
 * #FF8C63 << Orange
 * #FFD17C << Lt Orange
 * #DE3B61 << Red
 * #3F1F6A << Purple
 * #F1FCEF << Creme
 * #73FF6D << Green
 */

const Messageboard = styled.div`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	/* max-width: 1000px; */
	font-family: Comfortaa;
	font-weight: 600;
	font-size: 1.4rem;
	width: 96%;
	margin: 0 auto;
	margin-top: 80px;
	padding: 1%;
	background-color: rgba(23, 21, 27, 0.9);
	border: solid 1px #f1fcef;
	border-radius: 2px;
	color: #f1fcef;
	& p {
		color: #f1fcef;
		font-size: 16px;
	}
	${mediaQueryFor.smDevice`
    background-color:#fff;
    color:#000;
    /* font-size:3rem; */
  `}
`;

const StyledLink = styled(Link)`
	color: white;
	color: #f1fcef;
	text-decoration: none;
	margin: 5px;
	font-weight: bold;
`;

const TeamName = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 40px;
	/* color: #F1FCEF; */
	text-align: center;
	font-size: 2rem;
`;

const Teamlogo = styled.div`
	display: flex;
	align-items: center;
	flex-flow: column;
	& button {
		width: 220px;
		height: 40px;
		margin: 2px;
		font-size: 1.2rem;
		/* color:#17151B; */
		background-color: #f1fcef;
		&:hover {
			background-color: #f1fcef;
		}
	}
`;

const Logo = styled.img`
	width: 200px;
	display: inline;
	margin: 5px;
	border-radius: 45px;
`;

const MessagesContainer = styled.div`
	border: 1px solid black;
	margin: 0;
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
	constructor(props) {
		super(props);
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
			userListOpen: false,
			email: '',
			number: '',
			images: [],
			isAdmin: true,
			sortOption: 'newest',
			teamName: '73@m n@m3'
		};

		this.openModalHandler = this.openModalHandler.bind(this);
		this.closeModalHandler = this.closeModalHandler.bind(this);
		this.openInviteHandler = this.openInviteHandler.bind(this);
		this.closeInviteHandler = this.closeInviteHandler.bind(this);
		this.inviteChangeHandler = this.inviteChangeHandler.bind(this);
		// this.inviteSubmitHandler = this.inviteSubmitHandler.bind(this);
		this.stopProp = this.stopProp.bind(this);
		this.sortChange = this.sortChange.bind(this);
	}
	//
	// componentDidMount() {
	// 	this.setState({ user: this.props.currentUser._id });
	// }

	componentDidMount = () => {
		//
	};

	sortChange(e) {
		this.setState({ sortOption: e.target.value });
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

	// inviteSubmitHandler(e) {
	// 	e.preventDefault();
	// 	axios
	// 		.post(this.URI, { email: this.state.email, number: this.state.number })
	// 		.then(res => {
	// 			this.setState({
	// 				email: ''
	// 			});
	// 		})
	// 		.then(() => {
	// 			this.closeInviteHandler();
	// 			alert('Invitation sent');
	// 		})
	// 		.catch(err => {
	// 			console.error(err);
	// 		});
	// }

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

	openUserList = e => {
		this.setState({ userListOpen: true });
	};
	closeUserList = e => {
		this.setState({ userListOpen: false });
	};

	render() {
		return (
			<>
				<Messageboard>
					{this.state.showModal ? (
						<AddMessage
							closeHandler={this.closeModalHandler}
							stopProp={this.stopProp}
							team={this.props.team}
							user={this.props.currentUser._id}
						/>
					) : null}
					{this.state.showInvite ? (
						<Mutation mutation={mutation.INVITE_USER}>
							{inviteUser => (
								<Invites
									closeHandler={this.closeInviteHandler}
									stopProp={this.stopProp}
									submitHandler={e => {
										e.preventDefault();
										let input = { id: this.props.team };
										if (this.state.email.length) input.email = this.state.email;
										if (this.state.number.length)
											input.phoneNumber = this.state.number;
										inviteUser({ variables: input })
											.then(res => {
												this.setState({
													email: '',
													number: ''
												});
											})
											.then(() => {
												this.closeInviteHandler();
												alert('Invitation sent');
											})
											.catch(err => {
												console.error(err);
											});
									}}
									changeHandler={this.inviteChangeHandler}
									email={this.state.email}
									number={this.state.number}
								/>
							)}
						</Mutation>
					) : null}
					<TeamName>
						<h1>{this.state.teamName}</h1>
						<Teamlogo>
							<Logo src={TH_logo} alt="team logo" />
							{this.state.isAdmin ? (
								<button onClick={this.openInviteHandler}>Invite</button>
							) : null}
							<button
								onClick={e => {
									e.preventDefault();
									this.setState({ userListOpen: true });
								}}
							>
								Open User List
							</button>
						</Teamlogo>
					</TeamName>
					<MessagesContainer>
						<AddMsgBtn onClick={this.openModalHandler}>+</AddMsgBtn>
						<form>
							<label>
								Sort:
								<select value={this.state.value} onChange={this.sortChange}>
									<option value="newest">Newest First</option>
									<option value="oldest">Oldest First</option>
								</select>
							</label>
						</form>
						<Query
							query={query.FIND_MESSAGES_BY_TEAM}
							variables={{ team: this.props.team }}
						>
							{({ loading, error, data: { findMessagesByTeam } }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return <p>Error :(</p>;
								switch (this.state.sortOption) {
									case 'newest':
										findMessagesByTeam.sort((a, b) => {
											if (a.updatedAt < b.updatedAt) return 1;
											if (a.updatedAt > b.updatedAt) return -1;
											return 0;
										});
										break;
									case 'oldest':
										findMessagesByTeam.sort((a, b) => {
											if (a.updatedAt < b.updatedAt) return -1;
											if (a.updatedAt > b.updatedAt) return 1;
											return 0;
										});
										break;
									default:
										break;
								}

								return findMessagesByTeam.map(message => (
									<Message
										message={message}
										userInfo={message.user}
										key={message._id}
										openMessage={e => {
											e.preventDefault();
											this.setState({
												messageDetailOpen: true,
												currentMessage: message
											});
										}}
									/>
								));
							}}
						</Query>
					</MessagesContainer>
				</Messageboard>
				<MessageDetail
					open={this.state.messageDetailOpen}
					hideModal={this.closeMessageDetail}
					message={this.state.currentMessage}
					currentUser={this.props.currentUser}
					team={this.props.team}
				/>
				<UserList
					open={this.state.userListOpen}
					team={this.props.team}
					currentUser={this.props.currentUser}
					hideModal={this.closeUserList}
				/>
			</>
		);
	}
}

export default MessageBoard;
