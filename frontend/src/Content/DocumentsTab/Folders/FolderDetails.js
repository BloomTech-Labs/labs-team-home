import React from 'react';

// ------------- gql Imports ---------------------- //
import { compose, Query } from 'react-apollo';
import * as query from '../../../constants/queries';
import { deleteFolder, updateFolder } from '../../mutations/folders';
import { updateDocument } from '../../mutations/documents';

// ------------- Component Imports ---------------------- //
import DocumentDetails from '../Documents/DocumentDetails';

// ------------- Style Imports ---------------------- //
// import styled from 'styled-components';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardActions from '@material-ui/core/CardActions';
import { Paper } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import { colors, palette } from '../../../colorVariables';
// import mediaQueryFor from '../../../_global_styles/responsive_querie';

// ------------- Modal styling imports ---------------------- //
import { StyledModal, ModalOverlay, ModalClose } from '../../Modal.styles';
import {
	StyledModalTitle,
	StyledModalBody,
	StyledModalButton,
	StyledModalInput
} from '../../Modal.styles';

class FolderDetails extends React.Component {
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

	resetState = () =>
		this.setState({
			title: '',
			editingFolder: false
		});

	toggleDocumentDetail = doc => {
		this.setState(prevState => ({
			documentDetailOpen: !prevState.documentDetailOpen,
			currentDocument: doc
		}));
	};

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	refreshFolderInfo = e => {
		this.setState({
			refreshed: !this.state.refreshed
		});
	};

	render() {
		const {
			deleteFolder,
			updateFolder,
			folder,
			hideModal,
			updateDocument,
			currentUser,
			open
		} = this.props;

		if (folder === null) return <></>;
		// console.log(this.props);
		return (
			<StyledModal
				open={open}
				onClose={() => {
					hideModal();
					this.resetState();
				}}
				PaperProps={{
					style: {
						background: `transparent`,
						boxShadow: 'none'
					}
				}}
				fullScreen
				// ={mediaQueryFor.smDevice}
			>
				<ModalClose>
					<IconButton
						aria-label="Close"
						onClick={() => {
							hideModal();
							this.resetState();
						}}
						style={{
							color: colors.text,
							background: palette.plumTransparent
						}}
					>
						<CloseIcon />
					</IconButton>
				</ModalClose>
				<ModalOverlay>
					{/* All fo the folder info should go here 
                    Not just the ability to delete 
				Should also include a list of all the files */}
					<Query
						query={query.FIND_DOCUMENTS_BY_FOLDER}
						variables={{ folder: folder._id }}
						notifyOnNetworkStatusChange
					>
						{({
							loading,
							error,
							data: { findDocumentsByFolder },
							refetch,
							networkStatus
						}) => {
							if (networkStatus === 4) return 'Refetching';
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error</p>;
							if (this.props.open === true && this.state.refreshed === false) {
								// console.log(this.props.open, this.state.refreshed);
								refetch()
									.then(this.refreshFolderInfo())
									.catch(err => console.error(err));
							}
							return (
								<>
									{this.state.editingFolder ? (
										<form
											onSubmit={e => {
												e.preventDefault();
												folder.title = this.state.title;
												updateFolder({
													id: folder._id,
													title: this.state.title
												}).then(() => this.resetState());
											}}
											style={{
												width: '100%',
												display: 'flex',
												flexDirection: 'column'
											}}
										>
											<label htmlFor="Folder title" />
											<StyledModalInput
												name="title"
												value={this.state.title}
												onChange={this.handleChange}
											/>
											<StyledModalButton type="submit">Save</StyledModalButton>
										</form>
									) : (
										<>
											<StyledModalTitle variant="h5" component="h3">
												{folder.title}
											</StyledModalTitle>

											{/* Load all the images attached to the message */}

											<CardActions
												style={{
													width: '100%',
													display: 'flex',
													flexFlow: 'row',
													justifyContent: 'space-around'
												}}
											>
												<StyledModalButton
													onClick={e => {
														e.preventDefault();
														this.setState({
															editingFolder: true,
															title: folder.title
														});
													}}
												>
													Edit
												</StyledModalButton>
												<StyledModalButton
													onClick={e => {
														e.preventDefault();
														findDocumentsByFolder.map(document =>
															updateDocument({
																id: document._id,
																folder: null
															})
														);
														deleteFolder({
															id: this.props.folder._id
														}).then(() => {
															this.props.hideModal();
														});
													}}
												>
													Delete
												</StyledModalButton>

												{/* Subscription for the document stuff goes here */}
											</CardActions>
										</>
									)}
									<StyledModalTitle
										variant="h6"
										component="h5"
										style={{ margin: '30px 0' }}
									>
										Documents
									</StyledModalTitle>
									{/* Display all the documents */}
									{findDocumentsByFolder.map(document => (
										<Paper
											key={document._id}
											style={{
												background: palette.plum,
												marginBottom: '10px',
												display: 'flex',
												flexDirection: 'column'
											}}
											elevation={1}
										>
											<CardHeader
												avatar={
													<Avatar
														src={document.user.avatar}
														alt="test"
														style={{ height: '32px', width: '32px' }}
													/>
												}
												title={`${document.user.firstName} ${
													document.user.lastName
												}`}
												titleTypographyProps={{
													style: { color: colors.text }
												}}
											/>

											<CardContent>
												<StyledModalTitle component="p">
													{document.title}
												</StyledModalTitle>
												<StyledModalBody paragraph component="p">
													{document.doc_url}
												</StyledModalBody>
											</CardContent>

											{/* Check to see if the comment is the users and thus can be edited or deleted */}

											<CardContent>
												<StyledModalButton
													onClick={e => {
														e.preventDefault();
														updateDocument({
															id: document._id,
															folder: null
														});
														refetch()
															.then(this.refreshFolderInfo())
															.catch(err => console.error(err));
													}}
												>
													Remove from Folder
												</StyledModalButton>
												<StyledModalButton
													onClick={e => {
														e.preventDefault();
														//hideModal();
														this.resetState();
														this.toggleDocumentDetail(document);
													}}
												>
													View
												</StyledModalButton>
											</CardContent>
										</Paper>
									))}
								</>
							);
						}}
					</Query>
				</ModalOverlay>
				{/* // Modals */}
				<DocumentDetails
					open={this.state.documentDetailOpen}
					hideModal={() => this.toggleDocumentDetail(null)}
					document={this.state.currentDocument}
					currentUser={currentUser}
					team={this.props.team}
				/>
			</StyledModal>
		);
	}
}

export default compose(
	deleteFolder,
	updateFolder,
	updateDocument
)(FolderDetails);
