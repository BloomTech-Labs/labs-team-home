import React from 'react';
import PropTypes from 'prop-types';

// ---------------- Components ---------------------- //
import Message from './Message';
import MessageDetail from './MessageDetail';

// ---------------- GQL ---------------------- //
import { Query } from 'react-apollo';
import * as query from '../../constants/queries';

// ---------------- Styles ---------------------- //
import mediaQueryFor from '../../_global_styles/responsive_querie';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../colorVariables';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { MenuItem } from '@material-ui/core';

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
	padding: 10px;
	padding-bottom: 20px;
	border: 2px solid #4a4550;
	position: relative;
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

const ContainerTitle = styled.div`
	position: absolute;
	width: 150px;
	height: 40px;
	text-align: center;
	top: -15px;
	left: 20px;
	background-color: #5a5560;

	p {
		color: white;
		font-size: 18px;
		letter-spacing: 1px;
	}
`;

const FormDiv = styled.div`
	width: 97%;
	display: flex;
	flex-direction: row-reverse;
`;

const SortForm = styled.form`
	height: 50px;
	margin-top: 20px;
	font-size: 16px;
`;

const StyledOutline = styled(OutlinedInput).attrs(() => ({
	labelWidth: 10
}))`
	height: 30px;
	border-radius: 5px;
`;

const StyledSelect = styled(Select)`
	background-color: rgb(143, 136, 150, 0.75);
	margin-left: 10px;
	color: ${colors.text};
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

	toggleMessageDetail = msg => {
		this.setState(prevState => ({
			messageDetailOpen: !prevState.messageDetailOpen,
			currentMessage: msg
		}));
	};

	render() {
		return (
			<Messageboard>
				{/* List of all the messages */}
				<MessagesContainer>
					{/* Sorting options */}
					<ContainerTitle>
						<p>MESSAGES</p>
					</ContainerTitle>
					<FormDiv>
						<SortForm>
							<label>
								Sort:
								<StyledSelect
									outlined="true"
									value={this.state.sortOption}
									onChange={this.sortChange}
									input={<StyledOutline name="Sort" />}
								>
									<MenuItem value="newest">Newest First</MenuItem>
									<MenuItem value="oldest">Oldest First</MenuItem>
								</StyledSelect>
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
