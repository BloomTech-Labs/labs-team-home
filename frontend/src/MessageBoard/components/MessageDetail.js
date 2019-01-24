import React, { Component } from 'react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import {
	Query,
	Mutation,
	graphql,
	compose,
	ApolloConsumer,
	withApollo
} from 'react-apollo';

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
					<Query
						query={query.FIND_COMMENTS_BY_MESSAGE}
						variables={{ message: message._id }}
					>
						{({ loading, error, data: { findMsgCommentsByMessage } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;
							return (
								<>
									<button onClick={hideModal} style={{ margin: '0 20px' }}>
										Close
									</button>
									<h2>{message.title}</h2>
									<p>{message.content}</p>
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
													update={(cache, { data: { deleteMsgComment } }) => {
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
																	({ _id }) => _id !== deleteMsgComment._id
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

														this.setState({ editing: true, edited: comment });
														content.value = comment.content;
														content.focus();
													}}
												>
													Edit Comment
												</button>
											)}
										</div>
									))}
								</>
							);
						}}
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
