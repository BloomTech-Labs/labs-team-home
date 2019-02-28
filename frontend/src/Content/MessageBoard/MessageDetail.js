import React, { Component } from 'react';
import { Query, compose } from 'react-apollo';
import {
	addComment,
	updateComment,
	deleteComment,
	like,
	unLike
} from '../mutations/comments';
import { updateMessage, deleteMessage } from '../mutations/messages';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { palette, colors } from '../../colorVariables';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import * as query from '../../constants/queries';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import styled from 'styled-components';
import DialogActions from '@material-ui/core/DialogActions';
import mediaQueryFor from '../../_global_styles/responsive_querie';

const StyledDialog = styled(Dialog)`
	max-width: 696px;
	margin: 0 auto;
	/* should add a media query here to make the modal 
    go full screen if less than max width 
    also, something gotta be done about that scroll bar*/
`;

export const Overlay = styled(DialogContent)`
	background-color: ${palette.plumTransparent};
	color: #fff;
	word-wrap: break-word;
	padding-top: 0;
	margin-top: 0;
`;

const StyledTypography = styled(Typography)`
	color: ${colors.text};
`;

const StyledTextField = styled(TextField)`
	color: ${colors.text};
	input,
	textarea {
		color: ${colors.text};
	}
`;

const StyledButton = styled(Button)`
	border-bottom: solid 1px ${palette.yellow};
	color: ${colors.text};
	border-radius: 0px;
	margin: 10px;
`;

export const Close = styled(DialogActions)`
	&,
	div {
		background-color: transparent;
		color: #fff;
	}
`;

const StyledEditCommentLabel = styled.label`
	width: 100%;
`;

const CommentInputLabel = styled.label`
	width: 100%;
	background-color: #fff;
	padding: 5px;
	.MuiInputBase-root-320 {
		padding: 0px;
	}
`;

const Form = styled.form`
	display: flex;
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
			commentContent: ''
		};
		this.edit = React.createRef();
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	resetState = () =>
		this.setState({
			editing: false,
			editingMessage: false,
			edited: null,
			title: '',
			content: '',
			commentContent: ''
		});

	render() {
		let content;
		const {
			open,
			hideModal,
			message,
			currentUser,
			updateMsgComment,
			addMsgComment,
			deleteMsgComment,
			updateMessage,
			deleteMessage,
			like,
			unLike
		} = this.props;

		if (message === null) return <> </>;

		return (
			<StyledDialog //open the Dialog box this is the part that makes everything else around darker
				open={open}
				onClose={() => {
					hideModal();
					this.resetState();
				}}
				onExit={() => {
					hideModal();
					this.resetState();
				}}
				scroll="body"
				PaperProps={{
					style: {
						background: `transparent`,
						boxShadow: 'none'
					}
				}}
				fullScreen={mediaQueryFor.smDevice}
			>
				{/* Close the dialog box button */}
				<Close>
					<IconButton
						aria-label="Close"
						onClick={() => {
							hideModal();
							this.resetState();
						}}
						style={{
							color: colors.text,
							background: palette.plumTransparent
						}}
					>
						<CloseIcon />
					</IconButton>
				</Close>
				{/* Overlay is the dark area that the message and comments fill */}
				<Overlay>
					{/* The header information: name, avatar */}
					<CardHeader
						avatar={
							<Avatar
								src={message.user.avatar}
								alt="avatar"
								style={{ height: '64px', width: '64px' }}
							/>
						}
						title={`${message.user.firstName} ${message.user.lastName}`}
						titleTypographyProps={{
							style: { color: colors.text }
						}}
					/>
					{/* Render the message, UNLESS someone has hit the Edit Button */}
					{this.state.editingMessage ? (
						<form
							onSubmit={e => {
								e.preventDefault();
								message.title = this.state.title;
								message.content = this.state.content;
								updateMessage({
									id: message._id,
									title: this.state.title,
									content: this.state.content
								}).then(() => this.resetState());
							}}
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column'
							}}
						>
							<label htmlFor="message title" />
							<StyledTextField
								name="title"
								value={this.state.title}
								onChange={this.handleChange}
							/>
							<label htmlFor="message content" />
							<StyledTextField
								name="content"
								value={this.state.content}
								onChange={this.handleChange}
								multiline
							/>
							<StyledButton type="submit">Save</StyledButton>
						</form>
					) : (
						<>
							<StyledTypography variant="h5" component="h3">
								{message.title}
							</StyledTypography>
							<StyledTypography paragraph component="p">
								{message.content}
							</StyledTypography>

							{/* Load all the images attached to the message */}
							{message.images.map((image, index) => (
								<img
									key={index}
									src={image}
									alt="message-img"
									style={{ maxWidth: '50%', height: 'auto' }}
								/>
							))}

							{/* Display all the button actions (edit, delete, subscribe) */}
							<CardActions
								style={{
									width: '100%',
									display: 'flex',
									flexFlow: 'row',
									justifyContent: 'space-around'
								}}
							>
								{message.user._id === currentUser._id && (
									<>
										<StyledButton
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
										</StyledButton>
										<StyledButton
											onClick={e => {
												e.preventDefault();
												deleteMessage({
													id: message._id
												}).then(() => {
													this.resetState();
													hideModal();
												});
											}}
										>
											Delete
										</StyledButton>
									</>
								)}
								{/* Subscribe or unsubscribe button */}
								<StyledButton
									onClick={e => {
										e.preventDefault();
										message.subscribedUsers.find(
											({ _id }) => _id === currentUser._id
										)
											? updateMessage({
													id: message._id,
													subscribedUsers: message.subscribedUsers
														.filter(({ _id }) => _id !== currentUser._id)
														.map(({ _id }) => _id)
											  })
											: updateMessage({
													id: message._id,
													subscribedUsers: [
														...message.subscribedUsers.map(({ _id }) => _id),
														currentUser._id
													]
											  });
									}}
								>
									{message.subscribedUsers.find(
										({ _id }) => _id === currentUser._id
									)
										? 'Unsubscribe'
										: 'Subscribe'}
								</StyledButton>
							</CardActions>
						</>
					)}
					{/* Get the comments for the message */}
					<Query
						query={query.FIND_COMMENTS_BY_MESSAGE}
						variables={{ message: message._id }}
					>
						{({ loading, error, data: { findMsgCommentsByMessage } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error</p>;
							return (
								<>
									<StyledTypography
										gutterBottom
										variant="h6"
										component="h5"
										style={{ margin: '30px 0' }}
									>
										Comments
									</StyledTypography>
									{/* display all the comments */}
									{findMsgCommentsByMessage.map(comment => (
										<Paper
											key={comment._id}
											style={{
												background: palette.plum,
												marginBottom: '10px'
											}}
											elevation={1}
										>
											<CardHeader
												avatar={
													<Avatar
														src={comment.user.avatar}
														alt="test"
														style={{ height: '32px', width: '32px' }}
													/>
												}
												title={`${comment.user.firstName} ${
													comment.user.lastName
												}`}
												titleTypographyProps={{
													style: { color: colors.text }
												}}
											/>
											{/* check to see if the user can edit the comments */}
											{this.state.editing && this.state.edited === comment ? (
												<form
													action="submit"
													onSubmit={e => {
														e.preventDefault();
														updateMsgComment({
															id: this.state.edited._id,
															content: this.state.commentContent
														}).then(() => this.resetState());
													}}
												>
													<StyledEditCommentLabel htmlFor="comment-content">
														<StyledTextField
															inputRef={this.edit}
															name="commentContent"
															value={this.state.commentContent}
															onChange={this.handleChange}
															variant="outlined"
															multiline={true}
															fullWidth={true}
														/>
													</StyledEditCommentLabel>
													<StyledButton type="submit">Save</StyledButton>
												</form>
											) : (
												<>
													<CardContent>
														<StyledTypography component="p">
															{comment.content}
														</StyledTypography>
													</CardContent>

													{/* Check to see if the comment is the users and thus can be edited or deleted */}
													{comment.user._id === currentUser._id && (
														<>
															<StyledButton
																onClick={async e => {
																	//why is this async, and does it need focus ??????
																	e.preventDefault();
																	if (!this.state.editingMessage) {
																		await this.setState({
																			editing: true,
																			edited: comment,
																			commentContent: comment.content
																		});
																		await this.edit.current.focus();
																	} else {
																		alert(
																			"Please finish editing your message by clicking 'SAVE' before editing a comment."
																		);
																	}
																}}
															>
																Edit
															</StyledButton>
															<StyledButton
																onClick={e => {
																	e.preventDefault();
																	deleteMsgComment({
																		id: comment._id
																	});
																}}
															>
																Delete
															</StyledButton>
														</>
													)}
													{/* Like button */}
													<StyledButton
														onClick={e => {
															e.preventDefault();
															comment.likes.find(
																({ _id }) => _id === currentUser._id
															)
																? unLike({
																		id: comment._id
																  })
																: like({
																		id: comment._id
																  });
														}}
													>
														{`${comment.likes.length} likes`}
													</StyledButton>
												</>
											)}
										</Paper>
									))}
									{/* Add a new comment form  */}
									<Form
										action="submit"
										onSubmit={e => {
											e.preventDefault();
											addMsgComment({
												message: message._id,
												content: content.value
											});
											content.value = '';
										}}
									>
										<CommentInputLabel htmlFor="comment-content">
											<TextField
												placeholder="Leave a comment..."
												inputRef={node => {
													content = node;
												}}
												inputProps={{
													style: {
														color: '#000',
														height: '100px',
														backgroundColor: '#fff',
														padding: '0px'
													}
												}}
												fullWidth
												multiline={true}
											/>
										</CommentInputLabel>
										<IconButton type="submit">
											<SendIcon style={{ color: colors.text }} />
										</IconButton>
									</Form>
								</>
							);
						}}
					</Query>
				</Overlay>
			</StyledDialog>
		);
	}
}

export default compose(
	addComment,
	updateComment,
	deleteComment,
	updateMessage,
	deleteMessage,
	like,
	unLike
)(MessageDetail);
