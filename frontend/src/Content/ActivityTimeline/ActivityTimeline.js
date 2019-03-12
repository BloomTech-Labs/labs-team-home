import React from 'react';

// ------------- gql Imports ---------------------- //
import { Query } from 'react-apollo';
import { FIND_EVENTS_BY_TEAM } from '../../constants/queries';

// ------------- Component Imports ---------------------- //
import Activity from './Activity';
import ActivityModal from './ActivityModal';
import { StyledProgressSpinner } from '../../app-styles';
import styled from 'styled-components';

const ContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default class ActivityTimeline extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			eventDetailOpen: false,
			currentEvent: null
		};
	}

	toggleEventDetail = event => {
		this.setState(prevState => ({
			eventDetailOpen: !prevState.eventDetailOpen,
			currentEvent: event
		}));
	};

	render() {
		// console.log('current props from activity timeline: ', this.props);
		return (
			<ContainerDiv>
				{/* Queries for all Events, reflected every 5000ms (5 seconds)*/}
				<Query
					query={FIND_EVENTS_BY_TEAM}
					variables={{ team: this.props.team._id }}
					pollInterval={5000}
				>
					{({ loading, error, data: { findEventsByTeam } }) => {
						if (loading) return <StyledProgressSpinner />;
						if (error) return <p>Error!</p>;

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
									return (
										<Activity
											event={event}
											key={index}
											own={
												event.user._id === this.props.currentUser._id
													? 'true'
													: 'false'
											}
											clickHandler={e => {
												e.preventDefault();
												e.stopPropagation();
												this.toggleEventDetail(event);
											}}
										/>
									);
								}
								return (
									<div key={index}>
										There is an event here but it was not recorded properly
									</div>
								);
							});
						} else {
							return <div> No events </div>;
						}
					}}
				</Query>
				<ActivityModal
					open={this.state.eventDetailOpen}
					hideModal={() => this.toggleEventDetail(null)}
					event={this.state.currentEvent}
					currentUser={this.props.currentUser}
					team={this.props.team}
					stopProp={e => e.stopPropagation()}
					{...this.props}
				/>
			</ContainerDiv>
		);
	}
}
