import React from 'react';

// ------------- gql Imports ---------------------- //
import { Query } from 'react-apollo';
import * as query from '../../constants/queries';

// ------------- Component Imports ---------------------- //
import DocumentDetails from '../DocumentsTab/Documents/DocumentDetails';
import FolderDetails from '../DocumentsTab/Folders/FolderDetails';
import MessageDetails from '../MessageBoard/MessageDetail';
import TeamDetails from '../TeamOptions/TeamDetails';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { colors } from '../../colorVariables';
import { StyledProgressSpinnerSecondary } from '../../app-styles';

// ------------- Modal styling imports ---------------------- //
import {
	StyledModal,
	StyledModalOverlay,
	StyledModalClose,
	StyledModalPaper,
	StyledModalTitle,
	StyledModalButton,
	StyledModalCardAction,
	StyledModalBody,
	StyledModalIconButton
} from '../Modal.styles';

// ---------------- Styled Components ---------------------- //
const ModalTitle = styled(StyledModalTitle)`
	h2 {
		font-size: 30px;
		text-align: center;
		margin-left: 30px;
	}
`;

class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: null,
			modalOpen: false
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.event !== null) {
			if (this.props.event !== prevProps.event) {
				let modal;
				switch (this.props.event.object_string) {
					case 'message':
					case 'message comment':
						modal = 'Message';
						break;
					case 'folder':
						modal = 'Folder';
						break;
					case 'document':
					case 'document comment':
						modal = 'Document';
						break;
					case 'team':
					case 'user':
						modal = 'Team';
						break;
					default:
						break;
				}
				this.setState({ modal: modal });
			}
		}
	}

	innerToggleHandler = () => {
		this.setState(prevState => ({
			modalOpen: !prevState.modalOpen
		}));
	};

	render() {
		const { hideModal, open, event } = this.props;
		// console.log('from event modal', this.props);
		if (event === null) return <></>;
		return (
			<StyledModal
				open={open}
				onClose={() => {
					hideModal();
				}}
			>
				<StyledModalClose>
					<StyledModalIconButton
						onClick={() => {
							hideModal();
						}}
					>
						<CloseIcon />
					</StyledModalIconButton>
				</StyledModalClose>
				<StyledModalOverlay>
					<ModalTitle>Event</ModalTitle>
					{/* The header information: name, avatar */}
					<StyledModalPaper>
						<CardHeader
							avatar={
								<Avatar
									src={event.user.avatar}
									alt="avatar"
									style={{ height: '50px', width: '50px' }}
								/>
							}
							title={`${event.user.firstName} ${event.user.lastName}`}
							titleTypographyProps={{
								style: { color: colors.text }
							}}
						/>
						<CardContent>
							<StyledModalBody paragraph component="p">
								{event.user.firstName} {event.action_string} a{' '}
								{event.object_string} on {event.createdAt.toDateString()} at{' '}
								{event.createdAt.toLocaleTimeString()}
							</StyledModalBody>
							<StyledModalCardAction>
								{event.action_string !== 'deleted' ? (
									<>
										{this.state.modal === 'Document' ? (
											<Query
												query={query.FIND_DOCUMENT}
												variables={{ id: this.props.event.event_target_id }}
											>
												{({ loading, error, data: { findDocument } }) => {
													if (loading)
														return <StyledProgressSpinnerSecondary />;
													if (error) return <p>Error</p>;
													if (
														findDocument === null ||
														findDocument === undefined
													) {
														return (
															<StyledModalTitle>
																{`This ${
																	event.object_string
																} no longer exists.`}
															</StyledModalTitle>
														);
													}
													return (
														<>
															<StyledModalButton
																onClick={e => {
																	e.preventDefault();
																	e.stopPropagation();
																	this.innerToggleHandler();
																}}
															>
																{`View ${event.object_string}`}
															</StyledModalButton>
															<DocumentDetails
																open={this.state.modalOpen}
																hideModal={this.innerToggleHandler}
																team={this.props.team._id}
																currentUser={this.props.currentUser}
																document={findDocument}
															/>
														</>
													);
												}}
											</Query>
										) : null}
										{this.state.modal === 'Folder' ? (
											<Query
												query={query.FIND_FOLDER}
												variables={{ id: event.event_target_id }}
											>
												{({ loading, error, data: { findFolder } }) => {
													if (loading)
														return <StyledProgressSpinnerSecondary />;
													if (error) return <p>Error</p>;
													if (findFolder === null || findFolder === undefined) {
														return (
															<StyledModalTitle>
																{`This ${
																	event.object_string
																} no longer exists.`}
															</StyledModalTitle>
														);
													}
													return (
														<>
															<StyledModalButton
																onClick={e => {
																	e.preventDefault();
																	e.stopPropagation();
																	this.innerToggleHandler();
																}}
															>
																{`View ${event.object_string}`}
															</StyledModalButton>
															<FolderDetails
																open={this.state.modalOpen}
																hideModal={this.innerToggleHandler}
																team={this.props.team._id}
																currentUser={this.props.currentUser}
																folder={findFolder}
															/>
														</>
													);
												}}
											</Query>
										) : null}
										{this.state.modal === 'Message' ? (
											<Query
												query={query.FIND_MESSAGE}
												variables={{ id: event.event_target_id }}
											>
												{({ loading, error, data: { findMessage } }) => {
													if (loading)
														return <StyledProgressSpinnerSecondary />;
													if (error) return <p>Error</p>;
													if (
														findMessage === null ||
														findMessage === undefined
													) {
														return (
															<StyledModalTitle>
																{`This ${
																	event.object_string
																} no longer exists.`}
															</StyledModalTitle>
														);
													}
													return (
														<>
															<StyledModalButton
																onClick={e => {
																	e.preventDefault();
																	e.stopPropagation();
																	this.innerToggleHandler();
																}}
															>
																{`View ${event.object_string}`}
															</StyledModalButton>
															<MessageDetails
																open={this.state.modalOpen}
																hideModal={this.innerToggleHandler}
																team={this.props.team._id}
																currentUser={this.props.currentUser}
																message={findMessage}
															/>
														</>
													);
												}}
											</Query>
										) : null}
										{this.state.modal === 'Team' ? (
											<>
												<StyledModalButton
													onClick={e => {
														e.preventDefault();
														e.stopPropagation();
														this.innerToggleHandler();
													}}
												>
													{`View ${event.object_string}`}
												</StyledModalButton>
												<TeamDetails
													open={this.state.modalOpen}
													hideModal={this.innerToggleHandler}
													team={this.props.team}
													currentUser={this.props.currentUser}
													admin={this.props.isAdmin}
													history={this.props.history}
													location={this.props.location}
													match={this.props.match}
												/>
											</>
										) : null}
									</>
								) : (
									<StyledModalTitle>
										{`This ${event.object_string} no longer exists.`}
									</StyledModalTitle>
								)}
							</StyledModalCardAction>
						</CardContent>
					</StyledModalPaper>
				</StyledModalOverlay>
			</StyledModal>
		);
	}
}

export default EventDetails;
