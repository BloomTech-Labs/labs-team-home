import React from 'react';

// ------------- gql Imports ---------------------- //
import { Query, Mutation } from 'react-apollo';
import * as query from '../../../constants/queries';
import {
	UPDATE_DOCUMENT,
	UPDATE_FOLDER,
	DELETE_FOLDER
} from '../../../constants/mutations';

// ------------- Component Imports ---------------------- //
import DocumentDetails from '../Documents/DocumentDetails';

// ------------- MI Imports ---------------------- //
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

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

// ---------------- Styled Imports ---------------------- //
import styled from 'styled-components';
import { colors } from '../../../colorVariables';
import { StyledProgressSpinnerSecondary } from '../../../app-styles';
import mediaQueryFor from '../../../_global_styles/responsive_querie';
import { FileAlt } from 'styled-icons/fa-solid/FileAlt';

const ModalContents = styled.div`
	height: 700px;
	width: 565px;
	overflow-y: auto;
	padding-right: 1.3em;
	margin-top: 1rem;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: white;
	}

	${mediaQueryFor.smDevice`
		height: auto;
		width: auto;
	`}
`;

const FileIcon = styled(FileAlt)`
	height: 24px;
	margin-right: 10px;
`;

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
		const { folder, hideModal, currentUser, open } = this.props;
		// console.log('the props from the folder modal: ', this.props);
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
					<ModalContents>
						{/* show all the folder details */}
						<Query
							query={query.FIND_DOCUMENTS_BY_FOLDER}
							variables={{ folder: folder._id }}
						>
							{({ loading, error, data: { findDocumentsByFolder } }) => {
								if (loading) return <StyledProgressSpinnerSecondary />;
								if (error) return <p>Error</p>;

								return (
									<>
										{this.state.editingFolder ? (
											<CardContent>
												{/* edit the fodler options */}
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

												{/* All the folder options */}
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
															<Mutation
																mutation={DELETE_FOLDER}
																refetchQueries={[
																	{
																		query: query.FIND_FOLDERS_BY_TEAM,
																		variables: { team: this.props.team }
																	}
																]}
															>
																{deleteFolder => (
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
																							query:
																								query.FIND_DOCUMENTS_BY_TEAM,
																							variables: {
																								team: this.props.team
																							}
																						}
																					]
																				})
																			);
																			deleteFolder({
																				variables: { id: this.props.folder._id }
																			}).then(() => {
																				this.props.hideModal();
																			});
																		}}
																	>
																		Delete
																	</StyledModalButton>
																)}
															</Mutation>
														)}
													</Mutation>
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
													<DocumentTitle>
														<FileIcon />
														{document.title}
													</DocumentTitle>
												</CardContent>

												{/* Option to remove document from the folder */}
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

													{/* option to view the document details modal */}
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
					</ModalContents>
				</StyledModalOverlay>
				{/* // Modals */}
				<DocumentDetails
					open={this.state.documentDetailOpen}
					hideModal={() => this.toggleDocumentDetail(null)}
					document={this.state.currentDocument}
					currentUser={currentUser}
					team={this.props.team}
					folder={this.props.folder}
				/>
			</StyledModal>
		);
	}
}

export default FolderDetails;
