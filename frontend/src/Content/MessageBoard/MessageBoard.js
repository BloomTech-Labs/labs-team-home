import React from 'react';
import styled from 'styled-components';
import Message from './Message';
import AddMessage from './AddMessage';
import { Query } from 'react-apollo';
import * as query from '../../constants/queries';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../colorVariables';
import MessageDetail from './MessageDetail';
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

// ---------------- Styled Components ---------------------- //

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

const FormDiv = styled.div`
	width: 95%;
	display: flex;
	flex-direction: row-reverse;
`;

const SortForm = styled.form`
	height: 50px;
	margin-top: 20px;
	font-size: 16px;
	label {
		color: white;
	}
	select {
		margin-left: 10px;
	}
	option {
		height: 30px;
	}
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
			isAdmin: false,
			sortOption: 'newest',
			teamName: props.team.name
		};
	}

	componentDidMount = () => {
		this.props.team.users.map(user => {
			if (user.user._id === this.props.currentUser._id) {
				if (user.admin) this.setState({ isAdmin: true });
			}
			return null;
		});
	};

	sortChange = e => {
		this.setState({ sortOption: e.target.value });
	};

	toggleModalHandler = () => {
		this.setState(prevState => ({
			showModal: !prevState.showModal
		}));
	};

	toggleMessageDetail = msg => {
		this.setState(prevState => ({
			messageDetailOpen: !prevState.messageDetailOpen,
			currentMessage: msg
		}));
	};

	render() {
		const { classes } = this.props;
		return (
			<Messageboard>
				{/* List of all the messages */}
				<MessagesContainer>
					<Tooltip
						title="Add Message"
						aria-label="Add Message"
						classes={{ tooltip: classes.styledTooltip }}
					>
						<AddMsgBtn
							onClick={this.toggleModalHandler}
							className={classes.fab}
						>
							<AddIcon />
						</AddMsgBtn>
					</Tooltip>

					{/* Sorting options */}
					<FormDiv>
						<SortForm>
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
						</SortForm>
					</FormDiv>
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
									openMessage={() => this.toggleMessageDetail(message)}
								/>
							));
						}}
					</Query>
				</MessagesContainer>
				{/* All modals */}
				{/* Add a message modal*/}
				<AddMessage
					open={this.state.showModal}
					hideModal={this.toggleModalHandler}
					stopProp={e => e.stopPropagation()}
					team={this.props.team._id}
					user={this.props.currentUser._id}
				/>

				{/* Click on a message and view its contents modal */}
				<MessageDetail
					open={this.state.messageDetailOpen}
					hideModal={() => this.toggleMessageDetail(null)}
					message={this.state.currentMessage}
					currentUser={this.props.currentUser}
					team={this.props.team._id}
				/>
			</Messageboard>
		);
	}
}

MessageBoard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageBoard);
