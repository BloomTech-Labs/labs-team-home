import React from 'react';

// ------------- gql Imports ---------------------- //
import { Query } from 'react-apollo';
import { FIND_EVENTS_BY_TEAM } from '../../constants/queries';

// ------------- Component Imports ---------------------- //
import Activity from './Activity';
import ActivityModal from './ActivityModal';
import { StyledProgressSpinner } from '../../app-styles';
import Select from '@material-ui/core/Select';

// ------------- Style Imports ---------------------- //
import mediaQueryFor from '../../_global_styles/responsive_querie';
import styled from 'styled-components';
import { MenuItem } from '@material-ui/core';
import { colors } from '../../colorVariables';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const ContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 96%;
	max-width: 1100px;

	padding: 20px;
	border: 2px solid #4a4550;
	position: relative;
	margin: 15px auto;

	${mediaQueryFor.mdDevice`
		padding-top: 25px;
		width: 100%;
	`};
`;

const ContainerTitle = styled.div`
	position: absolute;
	width: 150px;
	height: 40px;
	text-align: center;
	top: -15px;
	left: 20px;
	background-color: #5a5560;

	p {
		color: white;
		font-size: 18px;
		letter-spacing: 1px;
	}
`;

const FormDiv = styled.div`
	width: 97%;
	display: flex;
	flex-direction: row-reverse;
`;
const StyledOutline = styled(OutlinedInput).attrs(() => ({
	labelWidth: 10
}))`
	height: 30px;
	border-radius: 5px;
`;

const StyledSelect = styled(Select)`
	background-color: rgb(143, 136, 150, 0.75);
	margin-left: 10px;
	margin-right: 10px;
	color: ${colors.text};
`;

const SortForm = styled.form`
	height: 50px;
	margin-top: 20px;
	font-size: 16px;
	color: white;
`;

export default class ActivityTimeline extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			eventDetailOpen: false,
			currentEvent: null,
			objectOption: 'all',
			actionOption: 'all',
			userOption: 'all'
		};
	}

	toggleEventDetail = event => {
		this.setState(prevState => ({
			eventDetailOpen: !prevState.eventDetailOpen,
			currentEvent: event
		}));
	};

	objectChange = e => {
		this.setState({ objectOption: e.target.value });
	};

	actionChange = e => {
		this.setState({ actionOption: e.target.value });
	};

	userChange = e => {
		this.setState({ userOption: e.target.value });
	};

	render() {
		// console.log('current props from activity timeline: ', this.props);
		return (
			<ContainerDiv>
				<ContainerTitle>
					<p>ACTIVITY</p>
				</ContainerTitle>
				<FormDiv>
					<SortForm>
						<label>
							User:
							<StyledSelect
								value={this.state.userOption}
								onChange={this.userChange}
								input={<StyledOutline name="Sort" />}
							>
								<MenuItem value="all">All</MenuItem>
								{this.props.team.users.map((user, index) => (
									<MenuItem key={index} value={`${user.user._id}`}>{`${
										user.user.firstName
									}`}</MenuItem>
								))}
							</StyledSelect>
						</label>
					</SortForm>
					<SortForm>
						<label>
							Action:
							<StyledSelect
								value={this.state.actionOption}
								onChange={this.actionChange}
								input={<StyledOutline name="Sort" />}
							>
								<MenuItem value="all">All</MenuItem>
								<MenuItem value="added">Added</MenuItem>
								<MenuItem value="created">Created</MenuItem>
								<MenuItem value="edited">Edited</MenuItem>
								<MenuItem value="deleted">Deleted</MenuItem>
								<MenuItem value="liked">Liked</MenuItem>
								<MenuItem value="unliked">Unliked</MenuItem>
								<MenuItem value="joined">Joined</MenuItem>
								<MenuItem value="left">Left</MenuItem>
								<MenuItem value="moved">Moved</MenuItem>
								<MenuItem value="subscribed to">Subscribed to</MenuItem>
								<MenuItem value="unsubscribed from">Unsubscribed from</MenuItem>
								<MenuItem value="invited">Invited</MenuItem>
								<MenuItem value="updated">Updated</MenuItem>
								<MenuItem value="removed">Removed</MenuItem>
							</StyledSelect>
						</label>
					</SortForm>
					<SortForm>
						<label>
							Object:
							<StyledSelect
								value={this.state.objectOption}
								onChange={this.objectChange}
								input={<StyledOutline name="Sort" />}
							>
								<MenuItem value="all">All</MenuItem>
								<MenuItem value="message">Message</MenuItem>
								<MenuItem value="message comment">Message Comment</MenuItem>
								<MenuItem value="folder">Folder</MenuItem>
								<MenuItem value="document">Document</MenuItem>
								<MenuItem value="document comment">Document Comment</MenuItem>
								{/* <MenuItem value="team">Team</MenuItem> */}
								<MenuItem value="user">User</MenuItem>
							</StyledSelect>
						</label>
					</SortForm>
				</FormDiv>

				{/* Queries for all Events, reflected every 5000ms (5 seconds)*/}
				<Query
					query={FIND_EVENTS_BY_TEAM}
					variables={{ team: this.props.team._id }} // limit: Int and offset: Int --available as variables
					pollInterval={5000}
				>
					{({ loading, error, data: { findEventsByTeam }, fetchMore }) => {
						if (loading) return <StyledProgressSpinner />;
						if (error) return <p>Error!</p>;

						if (findEventsByTeam && findEventsByTeam.length > 0) {
							findEventsByTeam.map(event => {
								if (typeof event.createdAt === 'string' && event.createdAt) {
									event.createdAt = new Date(parseInt(event.createdAt, 10));
								}
								return event;
							});

							// findEventsByTeam.sort((a, b) => {
							// 	if (a.createdAt < b.createdAt) return 1;
							// 	if (a.createdAt > b.createdAt) return -1;
							// 	return 0;
							// });

							const sortedEvents = findEventsByTeam
								.filter(event => {
									if (event.object_string === this.state.objectOption) {
										return event;
									} else {
										if (this.state.objectOption === 'all') {
											return event;
										} else {
											return null;
										}
									}
								})
								.filter(event => {
									if (event.action_string === this.state.actionOption) {
										return event;
									} else {
										if (this.state.actionOption === 'all') {
											return event;
										} else {
											return null;
										}
									}
								})
								.filter(event => {
									if (
										event.user !== null &&
										event.user._id === this.state.userOption
									) {
										return event;
									} else {
										if (this.state.userOption === 'all') {
											return event;
										} else {
											return null;
										}
									}
								});

							return (
								<>
									{sortedEvents.length > 0 ? (
										sortedEvents.map((event, index) => {
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
													There is an event here but it was not recorded
													properly
												</div>
											);
										})
									) : (
										<div>No Results Found</div>
									)}
									{/* Code Below is to Enable Pagination - Query above needs pollInterval commented out 
										to prevent refetching of data and override the pagination fetched*/}

									{/* <button
										onClick={e => {
											e.preventDefault();
											fetchMore({
												variables: { offset: findEventsByTeam.length },
												updateQuery: (prev, { fetchMoreResult }) => {
													if (!fetchMoreResult) return prev;
													return Object.assign({}, prev, {
														findEventsByTeam: [
															...prev.findEventsByTeam,
															...fetchMoreResult.findEventsByTeam
														]
													});
												}
											});
										}}
									>
										More ...
									</button> */}
								</>
							);
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
