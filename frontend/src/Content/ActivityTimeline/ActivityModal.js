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
import { compose, Query } from 'react-apollo';
import * as query from '../../constants/queries';
import { deleteFolder, updateFolder } from '../mutations/folders';
import { updateDocument } from '../mutations/documents';

// // ------------- Component Imports ---------------------- //
// import DocumentDetails from '../Documents/DocumentDetails';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
// import { colors } from '../../../colorVariables';

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
					<p> hello from the activity timeline modal</p>
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
