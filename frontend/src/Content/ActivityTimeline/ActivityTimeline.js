import React from 'react';
import { Query } from 'react-apollo';
import { FIND_EVENTS_BY_TEAM } from '../../constants/queries';
import Activity from './Activity';

export default class ActivityTimeline extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			team: props.team
		};
	}

	componentDidMount(prevProps) {}

	render() {
		return (
			<div>
				{/* Queries for all Events*/}
				<Query
					query={FIND_EVENTS_BY_TEAM}
					variables={{ team: this.state.team._id }}
					notifyOnNetworkStatusChange
				>
					{({
						loading,
						error,
						data: { findEventsByTeam },
						refetch,
						networkStatus
					}) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error!</p>;
						if (networkStatus === 4) return <p> Refetching...</p>;
						console.log('all the events: ', findEventsByTeam);
						if (findEventsByTeam && findEventsByTeam.length > 0) {
							findEventsByTeam.map(event => {
								if (typeof event.createdAt === 'string' && event.createdAt) {
									event.createdAt = new Date(parseInt(event.createdAt, 10));
								}
								return event;
							});

							findEventsByTeam.sort((a, b) => {
								if (a.createdAt < b.createdAt) return 1;
								if (a.createdAt > b.createdAt) return -1;
								return 0;
							});

							return findEventsByTeam.map((event, index) => {
								if (event.user !== null) {
									if (event.user._id === this.props.currentUser._id) {
										return <Activity event={event} key={index} own="true" />;
									}
									return <Activity event={event} key={index} own="false" />;
								}
								return <div key={index}> nO uSeR</div>;
							});
						} else {
							refetch();
							return <div> No events </div>;
						}
					}}
				</Query>
			</div>
		);
	}
}
