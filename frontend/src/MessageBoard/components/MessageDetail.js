import React, { Component } from 'react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { Query, Mutation, compose } from 'react-apollo';
import { updateMessage, deleteMessage } from './mutations/messages';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import * as query from '../../constants/queries';
import * as mutation from '../../constants/mutations';

class MessageDetail extends Component {
	state = {
		editing: false,
		editingMessage: false,
		edited: null,
		title: '',
		content: '',
		commentContent: ''
	};
	componentDidMount() {
		document.addEventListener('keydown', this.onKeyDown);
	}
	componentWillMount() {
		document.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown = ({ key }) => {
		if (key === 'Escape') {
			this.props.open && this.props.hideModal();
			this.setState({
				editing: false,
				editingMessage: false,
				edited: null,
				title: '',
				content: ''
			});
		}
	};

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		let content;
		const { open, hideModal, message, currentUser } = this.props;
		return (
			<Dialog isOpen={open}>
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
									{({ loading, error, data: { findMsgCommentsByMessage } }) => {
										if (loading) return <p>Loading...</p>;
										if (error) return <p>Error :(</p>;
										return (
											<Card>
												<CardActions>
													<Button
														color="primary"
														onClick={hideModal}
														style={{ margin: '0 20px' }}
													>
														Close
													</Button>
												</CardActions>
												<Card>
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
													/>
													<CardContent>
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

																		return this.props
																			.updateMessage(updateInput)
																			.then(() =>
																				this.setState({
																					editingMessage: false,
																					title: '',
																					content: ''
																				})
																			);
																	}
																}}
															>
																<label htmlFor="title">
																	<Input
																		type="text"
																		name="title"
																		value={this.state.title}
																		onChange={this.handleChange}
																	/>
																</label>
																<label htmlFor="message-content">
																	<Input
																		type="text"
																		name="content"
																		value={this.state.content}
																		onChange={this.handleChange}
																	/>
																</label>
																<button type="submit">Save</button>
															</form>
														) : (
															<>
																<Typography
																	gutterBottom
																	variant="h5"
																	component="h2"
																>
																	{findMessage.title}
																</Typography>
																<Typography component="p">
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
													</CardContent>
													<CardActions>
														{findMessage.user._id === currentUser._id && (
															<>
																<Button
																	color="primary"
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
																	color="secondary"
																	onClick={e => {
																		e.preventDefault();
																		this.props
																			.deleteMessage({
																				id: findMessage._id
																			})
																			.then(() => {
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
														<Mutation
															mutation={mutation.UPDATE_MESSAGE}
															update={(cache, { data: { updateMessage } }) => {
																const { findMessagesByTeam } = cache.readQuery({
																	query: query.FIND_MESSAGES_BY_TEAM,
																	variables: { team: this.props.team }
																});
																cache.writeQuery({
																	query: query.FIND_MESSAGES_BY_TEAM,
																	variables: { team: this.props.team },
																	data: {
																		findMessagesByTeam: findMessagesByTeam.map(
																			message =>
																				message._id === updateMessage._id
																					? updateMessage
																					: message
																		)
																	}
																});
															}}
														>
															{updateMessage => (
																<Button
																	color="secondary"
																	onClick={e => {
																		e.preventDefault();
																		findMessage.subscribedUsers.find(
																			({ _id }) => _id === currentUser._id
																		)
																			? updateMessage({
																					variables: {
																						id: findMessage._id,
																						subscribedUsers: findMessage.subscribedUsers
																							.filter(
																								({ _id }) =>
																									_id !== currentUser._id
																							)
																							.map(({ _id }) => _id)
																					}
																			  })
																			: updateMessage({
																					variables: {
																						id: findMessage._id,
																						subscribedUsers: [
																							...findMessage.subscribedUsers.map(
																								({ _id }) => _id
																							),
																							currentUser._id
																						]
																					}
																			  });
																	}}
																>
																	{findMessage.subscribedUsers.find(
																		({ _id }) => _id === currentUser._id
																	)
																		? 'Unsubscribe'
																		: 'Subscribe'}
																</Button>
															)}
														</Mutation>
													</CardActions>
												</Card>
												{findMsgCommentsByMessage.map(comment => (
													<Card key={comment._id}>
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
														/>
														<CardContent>
															<Typography component="p">
																{comment.content}
															</Typography>
														</CardContent>
														{comment.user._id === currentUser._id && (
															<Button
																color="primary"
																onClick={e => {
																	e.preventDefault();

																	this.setState({
																		editing: true,
																		edited: comment,
																		commentContent: comment.content
																	});
																	content.value = comment.content;
																	content.focus();
																}}
															>
																Edit Comment
															</Button>
														)}
														{comment.user._id === currentUser._id && (
															<Mutation
																mutation={mutation.DELETE_COMMENT}
																update={(
																	cache,
																	{ data: { deleteMsgComment } }
																) => {
																	const {
																		findMsgCommentsByMessage
																	} = cache.readQuery({
																		query: query.FIND_COMMENTS_BY_MESSAGE,
																		variables: { message: message._id }
																	});
																	cache.writeQuery({
																		query: query.FIND_COMMENTS_BY_MESSAGE,
																		variables: { message: message._id },
																		data: {
																			findMsgCommentsByMessage: findMsgCommentsByMessage.filter(
																				({ _id }) =>
																					_id !== deleteMsgComment._id
																			)
																		}
																	});
																}}
															>
																{deleteMsgComment => (
																	<Button
																		color="secondary"
																		onClick={e => {
																			e.preventDefault();
																			deleteMsgComment({
																				variables: { id: comment._id }
																			});
																		}}
																	>
																		Delete Comment
																	</Button>
																)}
															</Mutation>
														)}

														<Mutation
															mutation={mutation.UPDATE_COMMENT}
															update={(
																cache,
																{ data: { updateMsgComment } }
															) => {
																const {
																	findMsgCommentsByMessage
																} = cache.readQuery({
																	query: query.FIND_COMMENTS_BY_MESSAGE,
																	variables: { message: message._id }
																});
																cache.writeQuery({
																	query: query.FIND_COMMENTS_BY_MESSAGE,
																	variables: { message: message._id },
																	data: {
																		findMsgCommentsByMessage: findMsgCommentsByMessage.map(
																			comment =>
																				comment._id === updateMsgComment._id
																					? updateMsgComment
																					: comment
																		)
																	}
																});
															}}
														>
															{updateMsgComment => (
																<Button
																	color={
																		comment.likes.find(
																			({ _id }) => _id === currentUser._id
																		)
																			? 'secondary'
																			: 'primary'
																	}
																	onClick={e => {
																		const sanitized = comment.likes.map(
																			({ _id }) => _id
																		); // makes the array of likes back to the format it as stored as in the database
																		e.preventDefault();
																		comment.likes.find(
																			({ _id }) => _id === currentUser._id
																		)
																			? updateMsgComment({
																					variables: {
																						id: comment._id,
																						likes: sanitized.filter(
																							item => item !== currentUser._id
																						)
																					}
																			  })
																			: updateMsgComment({
																					variables: {
																						id: comment._id,
																						likes: [
																							...sanitized,
																							currentUser._id
																						]
																					}
																			  });
																	}}
																>
																	{`${comment.likes.length} likes`}
																</Button>
															)}
														</Mutation>
													</Card>
												))}
												{this.state.editing ? (
													<Mutation
														mutation={mutation.UPDATE_COMMENT}
														update={(cache, { data: { updateMsgComment } }) => {
															const {
																findMsgCommentsByMessage
															} = cache.readQuery({
																query: query.FIND_COMMENTS_BY_MESSAGE,
																variables: { message: message._id }
															});
															cache.writeQuery({
																query: query.FIND_COMMENTS_BY_MESSAGE,
																variables: { message: message._id },
																data: {
																	findMsgCommentsByMessage: findMsgCommentsByMessage.map(
																		comment =>
																			comment._id === updateMsgComment._id
																				? updateMsgComment
																				: comment
																	)
																}
															});
														}}
													>
														{updateMsgComment => (
															<form
																action="submit"
																onSubmit={async e => {
																	e.preventDefault();

																	await updateMsgComment({
																		variables: {
																			id: this.state.edited._id,
																			content: this.state.commentContent
																		}
																	});
																	content.value = '';
																	this.setState({
																		editing: false,
																		edited: null,
																		commentContent: ''
																	});
																}}
															>
																<label htmlFor="comment-content">
																	<Input
																		value={this.state.commentContent}
																		name="commentContent"
																		inputRef={node => (content = node)}
																	/>
																</label>
															</form>
														)}
													</Mutation>
												) : (
													<Mutation
														mutation={mutation.ADD_COMMENT}
														update={(cache, { data: { addMsgComment } }) => {
															const {
																findMsgCommentsByMessage
															} = cache.readQuery({
																query: query.FIND_COMMENTS_BY_MESSAGE,
																variables: { message: message._id }
															});
															cache.writeQuery({
																query: query.FIND_COMMENTS_BY_MESSAGE,
																variables: { message: message._id },
																data: {
																	findMsgCommentsByMessage: [
																		...findMsgCommentsByMessage,
																		addMsgComment
																	]
																}
															});
														}}
													>
														{addMsgComment => (
															<form
																action="submit"
																onSubmit={e => {
																	e.preventDefault();

																	addMsgComment({
																		variables: {
																			message: message._id,
																			content: content.value
																		}
																	});
																	content.value = '';
																}}
															>
																<label htmlFor="comment-content">
																	<Input
																		placeholder="Leave a comment.."
																		inputRef={node => {
																			content = node;
																		}}
																		style={{ width: '100%' }}
																		variant="outlined"
																	/>
																</label>
															</form>
														)}
													</Mutation>
												)}
											</Card>
										);
									}}
								</Query>
							)
						}
					</Query>
				)}
			</Dialog>
		);
	}
}

export default compose(
	updateMessage,
	deleteMessage
)(MessageDetail);
