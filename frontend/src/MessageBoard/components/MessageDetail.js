import React, { Component } from 'react';
import { Query, compose } from 'react-apollo';
import {
	addComment,
	updateComment,
	deleteComment,
	like,
	unLike
} from './mutations/comments';
import { updateMessage, deleteMessage } from './mutations/messages';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { palette } from '../../colorVariables';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import * as query from '../../constants/queries';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import styled from 'styled-components';
import DialogActions from '@material-ui/core/DialogActions';

export const Overlay = styled(DialogContent)`
	background-color: ${palette.plumTransparent};
	color: #fff;
	word-wrap: break-word;
	padding-top: 0;
	margin-top: 0;
`;

export const Close = styled(DialogActions)`
	&,
	div {
		background-color: transparent;
		color: #fff;
	}
`;

const CommentInputLabel = styled.label`
	width: 100%;
	background-color: #fff;
	padding: 0px;
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
			commentContent: '',
			width: 0
		};
		this.edit = React.createRef();
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => this.setState({ width: window.innerWidth });

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

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
		return (
			<Dialog
				open={open}
				onClose={hideModal}
				onExit={() =>
					this.setState({
						editing: false,
						editingMessage: false,
						edited: null,
						title: '',
						content: '',
						commentContent: ''
					})
				}
				scroll="body"
				fullScreen={this.state.width <= 696}
				PaperProps={{
					style: {
						background: `transparent`,
						boxShadow: 'none',
						color: '#fff'
					}
				}}
			>
				<Close>
					<IconButton
						aria-label="Close"
						onClick={hideModal}
						style={{ color: '#fff', background: `${palette.plumTransparent}` }}
					>
						<CloseIcon />
					</IconButton>
				</Close>
				<Overlay>
					{message && (
						<Query query={query.FIND_MESSAGE} variables={{ id: message._id }}>
							{({ loading, error, data: { findMessage } }) =>
								loading ? (
									<p>Loading...</p>
								) : error ? (
									<p>Error :(</p>
								) : (
									<Query
										query={query.FIND_COMMENTS_BY_MESSAGE}
										variables={{ message: message._id }}
									>
										{({
											loading,
											error,
											data: { findMsgCommentsByMessage }
										}) => {
											if (loading) return <p>Loading...</p>;
											if (error) return <p>Error :(</p>;
											return (
												<>
													<CardHeader
														avatar={
															<Avatar
																src={findMessage.user.avatar}
																alt="avatar"
																style={{ height: '64px', width: '64px' }}
															/>
														}
														title={`${findMessage.user.firstName}
															${findMessage.user.lastName}`}
														titleTypographyProps={{
															style: { color: '#fff' }
														}}
													/>

													{this.state.editingMessage ? (
														<form
															onSubmit={e => {
																e.preventDefault();
																let updateInput = {
																	id: findMessage._id
																};
																if (
																	this.state.title === findMessage.title &&
																	this.state.content === findMessage.content
																) {
																	alert('No fields updated.');
																} else {
																	if (this.state.title !== findMessage.title)
																		updateInput.title = this.state.title;
																	if (
																		this.state.content !== findMessage.content
																	)
																		updateInput.content = this.state.content;

																	return updateMessage(updateInput).then(() =>
																		this.setState({
																			editingMessage: false,
																			title: '',
																			content: ''
																		})
																	);
																}
															}}
															style={{
																width: '100%',
																display: 'flex',
																flexDirection: 'column'
															}}
														>
															<label htmlFor="message title" />
															<TextField
																type="text"
																name="title"
																value={this.state.title}
																onChange={this.handleChange}
																inputProps={{ style: { color: '#fff' } }}
																labelProps={{ style: { color: '#fff' } }}
																maxWidth
															/>
															<label htmlFor="message content" />
															<TextField
																type="text"
																name="content"
																value={this.state.content}
																onChange={this.handleChange}
																inputProps={{
																	style: { color: '#fff' }
																}}
																labelProps={{ style: { color: '#fff' } }}
																maxWidth
																multiline
															/>
															<Button
																size="small"
																style={{
																	color: '#fff',
																	borderBottom: 'solid 1px rgb(177,177,10)'
																}}
																type="submit"
															>
																Save
															</Button>
														</form>
													) : (
														<>
															<Typography
																gutterbottom
																variant="h5"
																component="h3"
																style={{ color: '#fff' }}
															>
																{findMessage.title}
															</Typography>
															<Typography
																paragraph
																component="p"
																style={{
																	color: '#fff'
																}}
															>
																{findMessage.content}
															</Typography>
														</>
													)}
													{findMessage.images.map((image, index) => (
														<img
															key={index}
															src={image}
															alt="message-img"
															style={{ maxWidth: '50%', height: 'auto' }}
														/>
													))}
													<CardActions
														style={{
															width: '100%',
															display: 'flex',
															flexFlow: 'row',
															justifyContent: 'space-around'
														}}
													>
														{findMessage.user._id === currentUser._id && (
															<>
																<Button
																	size="small"
																	style={{
																		color: '#fff',
																		borderBottom: `solid 1px ${palette.yellow}`,
																		borderRadius: '0px'
																	}}
																	onClick={e => {
																		e.preventDefault();
																		this.setState({
																			editingMessage: true,
																			title: findMessage.title,
																			content: findMessage.content
																		});
																	}}
																>
																	Edit Message
																</Button>
																<Button
																	size="small"
																	style={{
																		color: '#fff',
																		borderBottom: `solid 1px ${palette.yellow}`,
																		borderRadius: '0px'
																	}}
																	color="secondary"
																	onClick={e => {
																		e.preventDefault();
																		deleteMessage({
																			id: findMessage._id
																		}).then(() => {
																			this.setState({
																				editing: false,
																				editingMessage: false,
																				edited: null,
																				title: '',
																				content: ''
																			});
																			hideModal();
																		});
																	}}
																>
																	Delete Message
																</Button>
															</>
														)}
														<Button
															size="small"
															style={{
																color: '#fff',
																borderBottom: `solid 1px ${palette.yellow}`,
																borderRadius: '0px'
															}}
															color="secondary"
															onClick={e => {
																e.preventDefault();
																findMessage.subscribedUsers.find(
																	({ _id }) => _id === currentUser._id
																)
																	? updateMessage({
																			id: findMessage._id,
																			subscribedUsers: findMessage.subscribedUsers
																				.filter(
																					({ _id }) => _id !== currentUser._id
																				)
																				.map(({ _id }) => _id)
																	  })
																	: updateMessage({
																			id: findMessage._id,
																			subscribedUsers: [
																				...findMessage.subscribedUsers.map(
																					({ _id }) => _id
																				),
																				currentUser._id
																			]
																	  });
															}}
														>
															{findMessage.subscribedUsers.find(
																({ _id }) => _id === currentUser._id
															)
																? 'Unsubscribe'
																: 'Subscribe'}
														</Button>
													</CardActions>

													<Typography
														gutterBottom
														variant="h6"
														component="h5"
														style={{ color: '#fff', margin: '30px 0' }}
													>
														Comments
													</Typography>
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
																	style: { color: '#fff' }
																}}
															/>
															{this.state.editing &&
															this.state.edited === comment ? (
																<form
																	action="submit"
																	onSubmit={async e => {
																		e.preventDefault();
																		await updateMsgComment({
																			id: this.state.edited._id,
																			content: this.state.commentContent
																		});
																		await this.setState({
																			editing: false,
																			edited: null,
																			commentContent: ''
																		});
																	}}
																>
																	<label htmlFor="comment-content">
																		<TextField
																			inputRef={this.edit}
																			name="commentContent"
																			value={this.state.commentContent}
																			onChange={this.handleChange}
																			inputProps={{
																				style: { color: '#fff' }
																			}}
																			variant="outlined"
																			fullWidth
																		/>
																	</label>
																</form>
															) : (
																<CardContent>
																	<Typography
																		component="p"
																		style={{ color: '#fff' }}
																	>
																		{comment.content}
																	</Typography>
																</CardContent>
															)}
															{comment.user._id === currentUser._id && (
																<Button
																	size="small"
																	style={{ color: '#fff' }}
																	onClick={async e => {
																		e.preventDefault();
																		await this.setState({
																			editing: true,
																			edited: comment,
																			commentContent: comment.content
																		});
																		await this.edit.current.focus();
																	}}
																>
																	Edit Comment
																</Button>
															)}
															{comment.user._id === currentUser._id && (
																<Button
																	size="small"
																	style={{ color: '#fff' }}
																	color="secondary"
																	onClick={e => {
																		e.preventDefault();
																		deleteMsgComment({
																			id: comment._id
																		});
																	}}
																>
																	Delete Comment
																</Button>
															)}
															<Button
																size="small"
																style={{ color: '#fff' }}
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
															</Button>
														</Paper>
													))}

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
														<CommentInputLabel
															className="comment-input"
															htmlFor="comment-content"
														>
															<TextField
																placeholder="Leave a comment.."
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
																variant="outlined"
																fullWidth
																multiline={true}
																rows={2}
																rowsMax={4}
															/>
														</CommentInputLabel>
														<IconButton type="submit">
															<SendIcon style={{ color: '#fff' }} />
														</IconButton>
													</Form>
												</>
											);
										}}
									</Query>
								)
							}
						</Query>
					)}
				</Overlay>
			</Dialog>
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
