import React from 'react';

// ------------- gql Imports ---------------------- //
import { compose, Query, Mutation } from 'react-apollo';
import * as query from '../../../constants/queries';
import { deleteFolder } from '../../mutations/folders';
import { updateDocument } from '../../mutations/documents';
import { UPDATE_DOCUMENT, UPDATE_FOLDER } from '../../../constants/mutations';

// ------------- Component Imports ---------------------- //
import DocumentDetails from '../Documents/DocumentDetails';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
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
	StyledModalButton,
	StyledModalForm,
	StyledModalInput,
	StyledModalIconButton,
	StyledModalCardAction
} from '../../Modal.styles';

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

class FolderDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			editingFolder: false,
			documentDetailOpen: false,
			currentDocument: null
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

	render() {
		const { deleteFolder, folder, hideModal, currentUser, open } = this.props;

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
					>
						{({ loading, error, data: { findDocumentsByFolder } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error</p>;

							return (
								<>
									{this.state.editingFolder ? (
										<CardContent>
											<Mutation mutation={UPDATE_FOLDER}>
												{updateFolder => (
													<StyledModalForm
														onSubmit={e => {
															e.preventDefault();
															folder.title = this.state.title;
															updateFolder({
																variables: {
																	id: folder._id,
																	title: this.state.title
																},
																refetchQueries: [
																	{
																		query: query.FIND_FOLDERS_BY_TEAM,
																		variables: { team: this.props.team }
																	}
																]
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
												)}
											</Mutation>
										</CardContent>
									) : (
										<>
											<ModalTitle>{folder.title}</ModalTitle>

											{/* Load all the images attached to the message */}
											<StyledModalCardAction>
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
												<Mutation mutation={UPDATE_DOCUMENT}>
													{updateDocument => (
														<StyledModalButton
															onClick={e => {
																e.preventDefault();
																findDocumentsByFolder.map(document =>
																	updateDocument({
																		variables: {
																			id: document._id,
																			folder: null
																		},
																		refetchQueries: [
																			{
																				query: query.FIND_DOCUMENTS_BY_TEAM,
																				variables: { team: this.props.team }
																			}
																		]
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
													)}
												</Mutation>

												{/* Subscription for the document stuff goes here */}
											</StyledModalCardAction>
										</>
									)}

									{/* If there are any, display all the documents */}
									{findDocumentsByFolder.length ? (
										<StyledModalTitle>Documents</StyledModalTitle>
									) : (
										<SmallerTitle>
											No document at the moment, drag some in!
										</SmallerTitle>
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
												<DocumentTitle>{document.title}</DocumentTitle>
											</CardContent>

											{/* Check to see if the comment is the users and thus can be edited or deleted */}
											<CardContent>
												<Mutation
													mutation={UPDATE_DOCUMENT}
													variables={{ id: document._id, folder: null }}
												>
													{updateDocument => (
														<StyledModalButton
															onClick={e => {
																e.preventDefault();
																updateDocument({
																	refetchQueries: [
																		{
																			query: query.FIND_DOCUMENTS_BY_FOLDER,
																			variables: {
																				folder: this.props.folder._id
																			}
																		},
																		{
																			query: query.FIND_DOCUMENTS_BY_TEAM,
																			variables: { team: this.props.team }
																		}
																	]
																});
															}}
														>
															Remove from Folder
														</StyledModalButton>
													)}
												</Mutation>
												<StyledModalButton
													onClick={e => {
														e.preventDefault();
														this.resetState();
														this.toggleDocumentDetail(document);
													}}
												>
													Details
												</StyledModalButton>
												<a
													href={
														document.doc_url.includes('http://') ||
														document.doc_url.includes('https://')
															? document.doc_url
															: `http://www.${document.doc_url}`
													}
													target="_blank"
													rel="noopener noreferrer"
												>
													<StyledModalButton>View</StyledModalButton>
												</a>
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
	updateDocument
)(FolderDetails);
