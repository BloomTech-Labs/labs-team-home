/* activitySwitch changes the message depending on the type of the object */
// const objectSwitch = type => {
// 	switch (type) {
// 		case 'Message':
// 			return 'Message';
// 		case 'Comment':
// 			return 'Comment';
// 		case 'Document':
// 			return 'Document';
// 		case 'Folder':
// 			return 'Folder';
// 		default:
// 			return 'Comment';
// 	}
// };

import React from 'react';

// ------------- gql Imports ---------------------- //
import { Query } from 'react-apollo';
import * as query from '../../constants/queries';

// // ------------- Component Imports ---------------------- //
// import DocumentDetails from '../Documents/DocumentDetails';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { colors } from '../../colorVariables';

// ------------- Modal styling imports ---------------------- //
import {
	StyledModal,
	StyledModalOverlay,
	StyledModalClose,
	StyledModalPaper,
	StyledModalTitle,
	StyledModalButton,
	StyledModalForm,
	StyledModalInput,
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

const SmallerTitle = styled(ModalTitle)`
	h2 {
		font-size: 18px;
	}
`;

const DocumentTitle = styled(StyledModalTitle)`
	h2 {
		font-size: 18px;
		margin-left: 15px;
	}
`;

class EventDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			editingFolder: false,
			documentDetailOpen: false,
			currentDocument: null,
			refreshed: false
		};
	}

	render() {
		const { hideModal, open, event } = this.props;

		if (event === null) return <></>;
		return (
			<StyledModal
				open={open}
				onClose={() => {
					hideModal();
					// this.resetState();
				}}
			>
				<StyledModalClose>
					<StyledModalIconButton
						onClick={() => {
							hideModal();
							// this.resetState();
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
								{event.object_string} on {event.createdAt.toDateString()}
							</StyledModalBody>
							<StyledModalCardAction>
								{event.action_string === 'deleted' ? (
									<StyledModalTitle>
										{`This ${event.object_string} no longer exists.`}
									</StyledModalTitle>
								) : (
									<StyledModalButton>
										{`View ${event.object_string}`}
									</StyledModalButton>
								)}
							</StyledModalCardAction>
						</CardContent>
					</StyledModalPaper>
				</StyledModalOverlay>
				{/* // Modals */}
				{/* <DocumentDetails
					open={this.state.documentDetailOpen}
					hideModal={() => this.toggleDocumentDetail(null)}
					document={this.state.currentDocument}
					currentUser={currentUser}
					team={this.props.team}
				/> */}
			</StyledModal>
		);
	}
}

export default EventDetails;
