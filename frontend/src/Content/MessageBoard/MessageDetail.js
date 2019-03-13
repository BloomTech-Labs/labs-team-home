import React, { Component } from 'react';

// ------------- Component Imports ---------------------- //
import MessageBoardCommentDetails from './MessageBoardCommentDetail';

// ------------- gql imports ---------------------- //
import { Query, Mutation } from 'react-apollo';
import * as query from '../../constants/queries';
import {
	UPDATE_MESSAGE,
	DELETE_MESSAGE,
	SUBSCRIBE,
	UNSUBSCRIBE,
	ADD_COMMENT
} from '../../constants/mutations';

// ------------- MUI Imports ---------------------- //
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';

// ------------- styling libraries ---------------------- //
import styled from 'styled-components';
import { colors } from '../../colorVariables';
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight';
import { StyledProgressSpinnerSecondary } from '../../app-styles';
import mediaQueryFor from '../../_global_styles/responsive_querie';
// ------------- Modal styling imports ---------------------- //
import {
	StyledModal,
	StyledModalOverlay,
	StyledModalClose,
	StyledModalPaper,
	StyledModalIconButton,
	StyledModalTitle,
	StyledModalBody,
	StyledModalCardAction,
	StyledModalButton,
	StyledModalForm,
	StyledModalInput,
	StyledModalNewCommentInput,
	StyledModalNewCommentForm
} from '../Modal.styles';

// ------------- Styled Components --------------------------- //

const MessageTitle = styled(StyledModalTitle)`
	padding-bottom: 20px;
	border-bottom: 1px solid white;
	margin-bottom: 20px;

	h2 {
		font-size: 25px;
	}
`;

const ModalContents = styled.div`
	height: 700px;
	width: 565px;
	overflow-y: auto;
	padding-right: 1.3em;
	margin-top: 1rem;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: white;
	}

	${mediaQueryFor.smDevice`
		height: auto;
		width: auto;
	`}
`;

const Tags = styled(StyledModalBody)`
	margin-top: 30px;
`;

const MessageContent = styled(CardContent)`
	text-align: center;
	width: 80%;
	margin: 0 auto;
`;
const Image = styled.img`
	margin-top: 10px;
`;

const ArrowDiv = styled.button`
	/* height: 150px; */
	display: flex;
	align-items: center;
	background: none;
	border: 0;
	color: inherit;

	:focus {
		outline: none;
	}

	&:hover {
		background-color: #392d40;
		transition: 0.3s all ease-in-out;
	}
`;

const Arrow = styled(KeyboardArrowRight)`
	height: 25px;
`;

class MessageDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false,
			editingMessage: false,
			edited: null,
			title: '',
			content: '',
			commentContent: '',
			newComment: '',
			subscribed: null
		};
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	resetState = () =>
		this.setState({
			editing: false,
			editingMessage: false,
			edited: null,
			title: '',
			content: '',
			commentContent: '',
			newComment: '',
			subscribed: null
		});

	//set subscribed to true, if the currentUser is subscribed
	componentDidUpdate(prevProps) {
		if (this.props.message !== prevProps.message) {
			if (this.props.message !== null && this.props.message !== undefined) {
				if (
					this.props.message.subscribedUsers.find(
						user => user._id === this.props.currentUser._id
					)
				) {
					this.setState({ subscribed: true });
				} else this.setState({ subscribed: false });
			}
		}
	}

	render() {
		const { message, currentUser } = this.props;
		if (message === null) return <> </>;

		return (
			<StyledModal //open the Dialog box this is the part that makes everything else around darker
				open={this.props.open}
				onClose={() => {
					this.props.hideModal();
					this.resetState();
				}}
			>
				{/* Close the dialog box button */}
				<StyledModalClose>
					<StyledModalIconButton
						onClick={() => {
							this.props.hideModal();
							this.resetState();
						}}
					>
						<CloseIcon />
					</StyledModalIconButton>
				</StyledModalClose>
				<StyledModalOverlay>
					<ModalContents>
						{/* The header information: name, avatar */}
						<CardHeader
							avatar={
								<Avatar
									src={message.user.avatar}
									alt="avatar"
									style={{ height: '50px', width: '50px' }}
								/>
							}
							title={`${message.user.firstName} ${message.user.lastName}`}
							titleTypographyProps={{
								style: { color: colors.text }
							}}
						/>
						<StyledModalPaper>
							{/* Render the message, UNLESS someone has hit the Edit Button */}
							{this.state.editingMessage ? (
								<Mutation mutation={UPDATE_MESSAGE}>
									{updateMessage => (
										<StyledModalForm
											onSubmit={e => {
												e.preventDefault();
												message.title = this.state.title;
												message.content = this.state.content;
												updateMessage({
													variables: {
														id: message._id,
														title: this.state.title,
														content: this.state.content
													},
													refetchQueries: [
														{
															query: query.FIND_MESSAGES_BY_TEAM,
															variables: { team: this.props.team }
														}
													]
												}).then(() => this.resetState());
											}}
										>
											<StyledModalInput
												name="title"
												value={this.state.title}
												onChange={this.handleChange}
											/>

											<StyledModalInput
												name="content"
												value={this.state.content}
												onChange={this.handleChange}
												multiline
											/>
											<StyledModalButton type="submit">Save</StyledModalButton>
										</StyledModalForm>
									)}
								</Mutation>
							) : (
								<MessageContent>
									<MessageTitle>{message.title}</MessageTitle>
									<StyledModalBody paragraph component="p">
										{message.content}
									</StyledModalBody>
									{/* Load all the images attached to the message */}
									{message.images.map((image, index) => (
										<Image
											key={index}
											src={image}
											alt="message-img"
											style={{ maxWidth: '50%', height: 'auto' }}
										/>
									))}
									{/* Displays the tag associated with message. Includes a hashtag if not already present. */}
									{message.tag ? (
										message.tag.name.charAt(0).includes('#') ? (
											<Tags>Tag: {message.tag.name}</Tags>
										) : (
											<Tags>Tag: #{message.tag.name}</Tags>
										)
									) : (
										<></>
									)}

									{/* Display all the button actions (edit, delete, subscribe) */}
									<StyledModalCardAction>
										{message.user._id === currentUser._id && (
											<>
												<StyledModalButton
													onClick={e => {
														e.preventDefault();
														if (!this.state.editing) {
															this.setState({
																editingMessage: true,
																title: message.title,
																content: message.content
															});
														} else {
															alert(
																"Please finish editing your comment by clicking 'SAVE' before editing the message."
															);
														}
													}}
												>
													Edit
												</StyledModalButton>
												<Mutation mutation={DELETE_MESSAGE}>
													{deleteMessage => (
														<StyledModalButton
															onClick={e => {
																e.preventDefault();
																deleteMessage({
																	variables: { id: message._id },
																	refetchQueries: [
																		{
																			query: query.FIND_MESSAGES_BY_TEAM,
																			variables: { team: this.props.team }
																		}
																	]
																}).then(() => {
																	this.resetState();
																	this.props.hideModal();
																});
															}}
														>
															Delete
														</StyledModalButton>
													)}
												</Mutation>
											</>
										)}
										{/* Subscribe or unsubscribe button */}
										<Mutation mutation={UNSUBSCRIBE}>
											{unsubscribe => (
												<Mutation mutation={SUBSCRIBE}>
													{subscribe => (
														<StyledModalButton
															onClick={e => {
																e.preventDefault();
																this.setState(prevState => ({
																	subscribed: !prevState.subscribed
																}));
																this.state.subscribed
																	? unsubscribe({
																			variables: {
																				id: message._id,
																				user: currentUser._id
																			},
																			refetchQueries: [
																				{
																					query: query.FIND_MESSAGES_BY_TEAM,
																					variables: { team: this.props.team }
																				}
																			]
																	  })
																	: subscribe({
																			variables: {
																				id: message._id,
																				user: currentUser._id
																			},
																			refetchQueries: [
																				{
																					query: query.FIND_MESSAGES_BY_TEAM,
																					variables: { team: this.props.team }
																				}
																			]
																	  });
															}}
														>
															{this.state.subscribed
																? 'Unsubscribe'
																: 'Subscribe'}
														</StyledModalButton>
													)}
												</Mutation>
											)}
										</Mutation>
									</StyledModalCardAction>
								</MessageContent>
							)}
						</StyledModalPaper>
						{/* Get the comments for the message */}
						<StyledModalTitle>Comments</StyledModalTitle>
						<Query
							query={query.FIND_COMMENTS_BY_MESSAGE}
							variables={{ message: message._id }}
						>
							{({ loading, error, data: { findMsgCommentsByMessage } }) => {
								if (loading) return <StyledProgressSpinnerSecondary />;
								if (error) return <p>Error</p>;
								return (
									<>
										{findMsgCommentsByMessage.map(comment => (
											<MessageBoardCommentDetails
												key={comment._id}
												comment={comment}
												currentUser={currentUser}
												editingDocument={this.state.editingMessage}
												{...this.props}
											/>
										))}
									</>
								);
							}}
						</Query>
						{/* Add a new comment form */}
						<Mutation mutation={ADD_COMMENT}>
							{addMsgComment => (
								<StyledModalNewCommentForm
									onSubmit={e => {
										e.preventDefault();
										addMsgComment({
											variables: {
												message: message._id,
												content: this.state.newComment
											},
											refetchQueries: [
												{
													query: query.FIND_COMMENTS_BY_MESSAGE,
													variables: { message: message._id }
												},
												{
													query: query.FIND_MESSAGES_BY_TEAM,
													variables: { team: this.props.team }
												}
											]
										}).then(this.resetState());
									}}
								>
									<StyledModalNewCommentInput
										value={this.state.newComment}
										name="newComment"
										onChange={this.handleChange}
										placeholder="Leave a comment..."
									/>
									<ArrowDiv type="submit">
										<Arrow />
									</ArrowDiv>
								</StyledModalNewCommentForm>
							)}
						</Mutation>
					</ModalContents>
				</StyledModalOverlay>
			</StyledModal>
		);
	}
}

export default MessageDetail;
