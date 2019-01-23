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

import * as q from '../../constants/queries';
import * as m from '../../constants/mutations';

class MessageDetail extends Component {
	componentDidMount() {
		document.addEventListener('keydown', this.onKeyDown);
	}
	componentWillMount() {
		document.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown = ({ key }) => {
		if (key === 'Escape') {
			this.props.open && this.props.hideModal();
		}
	};

	render() {
		let content;
		console.log(this.props);
		const { open, hideModal, message, currentUser } = this.props;
		return (
			<Dialog isOpen={open}>
				{message && (
					<Query
						query={q.FIND_COMMENTS_BY_MESSAGE}
						variables={{ message: message._id }}
					>
						{({ loading, error, data: { findMsgCommentsByMessage } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;
							return (
								<>
									<h2>{message.title}</h2>
									<p>{message.content}</p>
									{findMsgCommentsByMessage.map(comment => (
										<div key={comment._id}>
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
											<Mutation
												mutation={m.DELETE_COMMENT}
												update={(cache, { data: { deleteMsgComment } }) => {
													const { findMsgCommentsByMessage } = cache.readQuery({
														query: q.FIND_COMMENTS_BY_MESSAGE,
														variables: { message: message._id }
													});
													cache.writeQuery({
														query: q.FIND_COMMENTS_BY_MESSAGE,
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
															comment.user._id === currentUser._id
																? deleteMsgComment({
																		variables: { id: comment._id }
																  })
																: alert("That doesn't belong to you.");
														}}
													>
														Delete Comment
													</button>
												)}
											</Mutation>
										</div>
									))}
									<button onClick={hideModal} style={{ margin: '0 20px' }}>
										Close
									</button>
								</>
							);
						}}
					</Query>
				)}
				<Mutation
					mutation={m.ADD_COMMENT}
					update={(cache, { data: { addMsgComment } }) => {
						const { findMsgCommentsByMessage } = cache.readQuery({
							query: q.FIND_COMMENTS_BY_MESSAGE,
							variables: { message: message._id }
						});
						cache.writeQuery({
							query: q.FIND_COMMENTS_BY_MESSAGE,
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
			</Dialog>
		);
	}
}

export default MessageDetail;
