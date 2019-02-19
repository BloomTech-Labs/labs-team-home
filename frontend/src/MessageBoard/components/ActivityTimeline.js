import React from 'react';
import { Query } from 'react-apollo';
import * as query from '../../constants/queries';
import UserActivity from './UserActivity';
import GeneralActivity from './GeneralActivity';

export default class ActivityTimeline extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			team: props.team
		};
	}

	render() {
		//messages will hold all the messages found by the first query
		let messages = [];
		//allTheThings will hold all the messages and comments will be added to this
		//array. This is seperate from the messages array so that mapping queries
		//will not accidentally use comments instead of messages
		let allTheThings = new Set();
		//loaded will be used to keep from adding more to allTheThings once all messages
		//have been mapped
		let loaded = false;
		return (
			<div>
				<Query
					query={query.FIND_MESSAGES_BY_TEAM}
					variables={{ team: this.state.team._id }}
				>
					{({ loading, error, data: { findMessagesByTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error!</p>;
						//If nothing has been loaded into messages, load results of the
						//query into messages and allTheThings.
						if (messages.length === 0) {
							messages = findMessagesByTeam;
							for (let message of messages) {
								allTheThings.add(message);
							}
						}
						//i is current index, starts at 0. End is the index of the end of
						//the messages array
						let i = 0;
						let end = messages.length - 1;
						//map through messages and create a Query component for each one
						return messages.map(message => (
							<Query
								query={query.FIND_COMMENTS_BY_MESSAGE}
								variables={{ message: message._id }}
								key={message._id}
							>
								{({ loading, error, data: { findMsgCommentsByMessage } }) => {
									if (loading) return <p>Loading...</p>;
									if (error) return <p>Error!</p>;

									//only add to the allTheThings array if the end of the messages
									//array has not been reached
									if (!loaded) {
										for (let comment of findMsgCommentsByMessage) {
											allTheThings.add(comment);
										}
									}

									if (i === end) {
										//if reached the end of the messages array set loaded to true
										loaded = true;
										//convert all updatedAt timestamps to date objects
										let activities = [];
										for (let thing of allTheThings) {
											if (typeof thing.updatedAt === 'string')
												thing.updatedAt = new Date(
													parseInt(thing.updatedAt, 10)
												);
											activities.push(thing);
										}

										//sort in reverse chronological order
										activities.sort((a, b) => {
											if (a.updatedAt < b.updatedAt) return 1;
											if (a.updatedAt > b.updatedAt) return -1;
											return 0;
										});

										//create elements based on whether the current thing is created
										//by the current user
										return activities.map(thing => {
											if (thing.user._id === this.props.currentUser._id) {
												return <UserActivity message={thing} key={thing._id} />;
											}
											return (
												<GeneralActivity message={thing} key={thing._id} />
											);
										});
									}
									//Next index
									i++;
									return null;
								}}
							</Query>
						));
					}}
				</Query>
			</div>
		);
	}
}
