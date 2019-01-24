import React from 'react';
import { Query } from 'react-apollo';
import * as query from '../../constants/queries';

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
							console.log('message', message);
						});
					}}
				</Query>
			</div>
		);
	}
}
