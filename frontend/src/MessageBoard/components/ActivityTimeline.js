import React from 'react';
import { Query } from 'react-apollo';
import * as query from '../../constants/queries';
import UserActivity from './UserActivity';
import GeneralActivity from './GeneralActivity';

export default class ActivityTimeline extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			team: props.team,
			messages: []
		};

		this.addMessages = this.addMessages.bind(this);
	}

	addMessages(messages) {
		this.setState({ messages: messages });
	}

	render() {
		let messages = [];
		let allTheThings = [];
		return (
			<div>
				<Query
					query={query.FIND_MESSAGES_BY_TEAM}
					variables={{ team: this.state.team }}
				>
					{({ loading, error, data: { findMessagesByTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error!</p>;
						return findMessagesByTeam.map(message => {
							console.log('user', this.props.currentUser);
							console.log(message);
							if (typeof message.updatedAt === 'string')
								message.updatedAt = new Date(parseInt(message.updatedAt, 10));
							if (message.user._id === this.props.currentUser._id)
								return <UserActivity message={message} key={message._id} />;
							return <GeneralActivity message={message} key={message._id} />;
						});
					}}
				</Query>
			</div>
		);
	}
}
