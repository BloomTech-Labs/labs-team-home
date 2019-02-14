import React from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import Message from './Message';
import AddMessage from './AddMessage';
import { Query, Mutation } from 'react-apollo';
import Invites from './Invites';
import * as query from '../../constants/queries';
import * as mutation from '../../constants/mutations';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../colorVariables';
import MessageDetail from './MessageDetail';
import UserList from './UserList';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
	root: {
		backgroundColor: colors.background
	},
	fab: {
		margin: theme.spacing.unit
	},
	styledTooltip: {
		fontSize: '12px',
		backgroundColor: colors.button,
		color: colors.text
	}
});

const TH_logo = 'https://i.imgur.com/31LTJFH.png';
// const TH_name = 'TeamHome';

const Messageboard = styled.div`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	box-sizing: border-box;
	border-radius: 10px;
	font-family: sans-serif;
	font-size: 1.4rem;
	width: 96%;
	margin: 0 auto;
	margin-top: 20px;
	color: ${colors.text};

	${mediaQueryFor.mdDevice`
    width: 100%;
  `}
`;

const TeamName = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${colors.header};
	text-align: center;
	font-size: 2rem;

	${mediaQueryFor.xsDevice`
		font-size: 1rem;
	`}
`;

const Teamlogo = styled.div`
	display: flex;
	align-items: center;
	flex-flow: column;
`;

const Logo = styled.img`
	width: 200px;
	display: inline;
	margin: 5px;
	border-radius: 45px;
`;

const MessagesContainer = styled.div`
	margin: 0;
	form {
		height: 50px;
		select {
			margin-left: 10px;
		}
		option {
			height: 50px;
		}
	}

	${mediaQueryFor.mdDevice`
		margin-bottom: 10px;
		width: 100%;
	`}
`;

const AddMsgBtn = styled(Fab)`
	background-color: ${colors.button};
	margin: 25px;
	color: ${colors.text};
	height: 75px;
	width: 75px;
`;

const StyledButton = styled(Button)`
	background-color: ${colors.button};
	color: ${colors.text};
	margin: 5px;
`;

class MessageBoard extends React.Component {
	constructor(props) {
		super(props);
		//temporary url
		this.URI =
			process.env.NODE_ENV === 'production'
				? 'https://team-home-2-graphql-mongodb.herokuapp.com/invite'
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
			isAdmin: false,
			sortOption: 'newest',
			teamName: props.team.name
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

	componentDidMount() {
		this.props.team.users.map(user => {
			if (user.user._id === this.props.currentUser._id) {
				if (user.admin) this.setState({ isAdmin: true });
			}
			return null;
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

	openUserList = e => {
		this.setState({ userListOpen: true });
	};
	closeUserList = e => {
		this.setState({ userListOpen: false });
	};

	render() {
		const { classes } = this.props;
		return (
			<>
				<Messageboard>
					<AddMessage
						closeHandler={this.closeModalHandler}
						stopProp={this.stopProp}
						team={this.props.team._id}
						user={this.props.currentUser._id}
						open={this.state.showModal}
					/>
					<Mutation mutation={mutation.INVITE_USER}>
						{inviteUser => (
							<Invites
								currentUser={this.props.currentUser}
								team={this.props.team}
								open={this.state.showInvite}
								closeHandler={this.closeInviteHandler}
								stopProp={this.stopProp}
								submitHandler={e => {
									e.preventDefault();
									let input = { id: this.props.team._id };
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
					<TeamName>
						<h1>{this.props.team.name}</h1>
						<Teamlogo>
							<Logo src={TH_logo} alt="team logo" />
							{this.state.isAdmin ? (
								<StyledButton
									variant="contained"
									onClick={this.openInviteHandler}
								>
									Invite
								</StyledButton>
							) : null}
							<StyledButton
								variant="contained"
								onClick={e => {
									e.preventDefault();
									this.setState({ userListOpen: true });
								}}
							>
								Open User List
							</StyledButton>
						</Teamlogo>
					</TeamName>
					<MessagesContainer>
						<Tooltip
							title="Add Message"
							aria-label="Add Message"
							classes={{ tooltip: classes.styledTooltip }}
						>
							<AddMsgBtn
								onClick={this.openModalHandler}
								className={classes.fab}
							>
								<AddIcon />
							</AddMsgBtn>
						</Tooltip>
						<form>
							<label>
								Sort:
								<select
									value={this.state.sortOption}
									onChange={this.sortChange}
								>
									<option value="newest">Newest First</option>
									<option value="oldest">Oldest First</option>
								</select>
							</label>
						</form>
						<Query
							query={query.FIND_MESSAGES_BY_TEAM}
							variables={{ team: this.props.team._id }}
						>
							{({ loading, error, data: { findMessagesByTeam } }) => {
								if (loading) return <p>Loading...</p>;
								if (error) return console.error(error);
								switch (this.state.sortOption) {
									case 'newest':
										findMessagesByTeam.sort((a, b) => {
											if (a.createdAt < b.createdAt) return 1;
											if (a.createdAt > b.createdAt) return -1;
											return 0;
										});
										break;
									case 'oldest':
										findMessagesByTeam.sort((a, b) => {
											if (a.createdAt < b.createdAt) return -1;
											if (a.createdAt > b.createdAt) return 1;
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
					team={this.props.team._id}
				/>
				<UserList
					open={this.state.userListOpen}
					team={this.props.team._id}
					currentUser={this.props.currentUser}
					hideModal={this.closeUserList}
				/>
			</>
		);
	}
}

MessageBoard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageBoard);
