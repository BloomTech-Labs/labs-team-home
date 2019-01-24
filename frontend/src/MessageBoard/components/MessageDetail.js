import React, { Component } from 'react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import * as query from '../../constants/queries';
import * as mutation from '../../constants/mutations';

class MessageDetail extends Component {
	state = { editing: false, edited: null };
	componentDidMount() {
		document.addEventListener('keydown', this.onKeyDown);
	}
	componentWillMount() {
		document.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown = ({ key }) => {
		if (key === 'Escape') {
			this.props.open && this.props.hideModal();
			this.setState({ editing: false, edited: null });
		}
	};

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
											<>
												<button
													onClick={hideModal}
													style={{ margin: '0 20px' }}
												>
													Close
												</button>
												<div>
													<h2>{findMessage.title}</h2>
													<p>{findMessage.content}</p>
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
															<button
																onClick={e => {
																	e.preventDefault();
																	findMessage.subscribedUsers.find(
																		({ _id }) => _id === currentUser._id
																	)
																		? updateMessage({
																				variables: {
																					id: findMessage._id,
																					subscribedUsers: findMessage.subscribedUsers.filter(
																						({ _id }) => _id !== currentUser._id
																					)
																				}
																		  })
																		: updateMessage({
																				variables: {
																					id: findMessage._id,
																					subscribedUsers: [
																						...findMessage.subscribedUsers,
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
															</button>
														)}
													</Mutation>
												</div>
												{findMsgCommentsByMessage.map(comment => (
													<div key={comment._id}>
														{this.state.edited &&
															this.state.edited._id === comment._id && (
																<h4 style={{ color: 'red' }}>
																	This Comment is being edited
																</h4>
															)}
														<img
															src={comment.user.avatar}
															alt="test"
															style={{ height: '32px', width: '32px' }}
														/>
														<p>
															posted by: {comment.user.firstName}{' '}
															{comment.user.lastName}
														</p>
														<p>{comment.content}</p>
														<p>{comment.likes.length} likes</p>
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
																	<button
																		onClick={e => {
																			e.preventDefault();
																			deleteMsgComment({
																				variables: { id: comment._id }
																			});
																		}}
																	>
																		Delete Comment
																	</button>
																)}
															</Mutation>
														)}
														{comment.user._id === currentUser._id && (
															<button
																onClick={e => {
																	e.preventDefault();

																	this.setState({
																		editing: true,
																		edited: comment
																	});
																	content.value = comment.content;
																	content.focus();
																}}
															>
																Edit Comment
															</button>
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
																<button
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
																	{comment.likes.find(
																		({ _id }) => _id === currentUser._id
																	)
																		? 'Unlike'
																		: 'Like'}
																</button>
															)}
														</Mutation>
													</div>
												))}
											</>
										);
									}}
								</Query>
							)
						}
					</Query>
				)}
				{this.state.editing ? (
					<Mutation
						mutation={mutation.UPDATE_COMMENT}
						update={(cache, { data: { updateMsgComment } }) => {
							const { findMsgCommentsByMessage } = cache.readQuery({
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
											content: content.value
										}
									});
									content.value = '';
									this.setState({ editing: false, edited: null });
								}}
							>
								<input
									ref={node => {
										content = node;
									}}
								/>
							</form>
						)}
					</Mutation>
				) : (
					<Mutation
						mutation={mutation.ADD_COMMENT}
						update={(cache, { data: { addMsgComment } }) => {
							const { findMsgCommentsByMessage } = cache.readQuery({
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
								<input
									ref={node => {
										content = node;
									}}
								/>
							</form>
						)}
					</Mutation>
				)}
			</Dialog>
		);
	}
}

export default MessageDetail;
