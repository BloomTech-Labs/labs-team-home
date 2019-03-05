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
import CloseIcon from '@material-ui/icons/Close';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { colors } from '../../../colorVariables';

// ------------- Modal styling imports ---------------------- //
import {
	StyledModal,
	StyledModalOverlay,
	StyledModalClose,
	StyledModalPaper,
	StyledModalTitle,
	StyledModalBody,
	StyledModalButton,
	StyledModalForm,
	StyledModalInput,
	StyledModalIconButton
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
		return (
			<StyledModal
				open={open}
				onClose={() => {
					hideModal();
					this.resetState();
				}}
			>
				<StyledModalClose>
					<StyledModalIconButton
						onClick={() => {
							hideModal();
							this.resetState();
						}}
					>
						<CloseIcon />
					</StyledModalIconButton>
				</StyledModalClose>
				<StyledModalOverlay>
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
								refetch().then(this.refreshFolderInfo());
								// .catch(err => console.error(err));
							}
							return (
								<>
									{this.state.editingFolder ? (
										<CardContent>
											<StyledModalForm
												onSubmit={e => {
													e.preventDefault();
													folder.title = this.state.title;
													updateFolder({
														id: folder._id,
														title: this.state.title
													}).then(() => this.resetState());
												}}
											>
												<StyledModalInput
													name="title"
													value={this.state.title}
													onChange={this.handleChange}
												/>
												<StyledModalButton type="submit">
													Save
												</StyledModalButton>
											</StyledModalForm>
										</CardContent>
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

									{/* If there are any, display all the documents */}
									{findDocumentsByFolder.length ? (
										<StyledModalTitle>Documents</StyledModalTitle>
									) : (
										<StyledModalTitle>
											No document at the moment, drag some in!
										</StyledModalTitle>
									)}
									{findDocumentsByFolder.map(document => (
										<StyledModalPaper key={document._id}>
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
														this.resetState();
														this.toggleDocumentDetail(document);
													}}
												>
													View
												</StyledModalButton>
											</CardContent>
										</StyledModalPaper>
									))}
								</>
							);
						}}
					</Query>
				</StyledModalOverlay>
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
