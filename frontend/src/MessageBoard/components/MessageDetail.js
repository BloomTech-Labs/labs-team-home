import React, { Component } from 'react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { Query } from 'react-apollo';

import * as q from '../../constants/queries';

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
		const { open, hideModal, message } = this.props;
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
										<div>
											<img src={comment.user.avatar} alt="test" />
											<p>{comment.content}</p>
										</div>
									))}
									<div>
										<button onClick={hideModal} style={{ margin: '0 20px' }}>
											Close
										</button>
									</div>
								</>
							);
						}}
					</Query>
				)}
			</Dialog>
		);
	}
}

export default MessageDetail;
