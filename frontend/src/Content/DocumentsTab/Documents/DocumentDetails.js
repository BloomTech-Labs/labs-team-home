import React from 'react';

// ------------- Component Imports ---------------------- //
import DocumentCommentDetail from './DocumentCommentDetails';

// ------------- gql Imports ---------------------- //
import { Query, Mutation } from 'react-apollo';
import * as query from '../../../constants/queries';
import {
	UPDATE_DOCUMENT,
	ADD_DOCCOMMENT,
	UNSUBSCRIBE_DOC,
	SUBSCRIBE_DOC,
	DELETE_DOCUMENT
} from '../../../constants/mutations';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import { StyledProgressSpinnerSecondary } from '../../../app-styles';
import mediaQueryFor from '../../../_global_styles/responsive_querie';

// ------------- Icon imports ------------------------------- //
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight';

// ------------- Modal styling imports ---------------------- //
import {
	StyledModal,
	StyledModalOverlay,
	StyledModalClose,
	StyledModalPaper,
	StyledModalCardAction,
	StyledModalTitle,
	StyledModalBody,
	StyledModalButton,
	StyledModalForm,
	StyledModalInput,
	StyledModalIconButton,
	StyledModalNewCommentForm,
	StyledModalNewCommentInput
} from '../../Modal.styles';

// ---------------- Styled Components ---------------------- //

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

const ModalTitle = styled(StyledModalTitle)`
	h2 {
		font-size: 30px;
		text-align: center;
		margin-left: 30px;
	}
`;

const ModalBody = styled(StyledModalBody)`
	text-align: center;
	margin: 10px 0;
`;

const DocumentContent = styled(StyledModalBody)`
	text-align: center;
	width: 80%;
	margin: 20px auto;
	padding-top: 20px;
	border-top: 1px solid white;
	span {
		display: block;
		font-weight: bold;
		margin-bottom: 5px;
		font-size: 18px;
	}
`;

const DocUrl = styled(StyledModalBody)`
	margin: 10px auto;
	margin-top: 25px;
	text-align: center;
	padding: 5px;
	border-bottom: 1px solid #ecff26;
	width: 65px;
	cursor: pointer;
	a,
	a:hover {
		color: white;
		text-decoration: none;
	}
	&:hover {
		background-color: #392d40;
		transition: 0.3s all ease-in-out;
	}
`;

// this needs to be a button for functionality purposes
const ArrowDiv = styled.button`
	/* height: 150px; */
	display: flex;
	align-items: center;
	background: none;
	border: 0;
	color: inherit;
	:focus {
		outline: none;
	}
	&:hover {
		background-color: #392d40;
		transition: 0.3s all ease-in-out;
	}
`;

const Arrow = styled(KeyboardArrowRight)`
	height: 25px;
`;

const FormDiv = styled.div`
	width: 95%;
	display: flex;
	justify-content: center;
	flex-direction: row-reverse;
`;

const SortForm = styled.form`
	height: 50px;
	margin: 0 auto;
	margin-top: 15px;
	label {
		color: white;
	}
	select {
		margin-left: 10px;
	}
	option {
		height: 25px;
	}
`;

class DocumentDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editingDocument: false,
			title: '',
			doc_url: '',
			textContent: '',
			editingComment: false,
			commentContent: '',
			editedComment: null,
			newCommentContent: '',
			subscribed: null,
			folderOption: 'Move to Folder'
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props.document !== prevProps.document) {
			if (this.props.document !== null && this.props.document !== undefined) {
				if (
					this.props.document.subscribedUsers.find(
						user => user._id === this.props.currentUser._id
					)
				) {
					this.setState({ subscribed: true });
				} else this.setState({ subscribed: false });
			}
		}
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	resetState = () =>
		this.setState({
			editingDocument: false,
			title: '',
			doc_url: '',
			textContent: '',
			editingComment: false,
			commentContent: '',
			editedComment: null,
			newCommentContent: '',
			folderOption: 'Move to Folder'
		});

	folderChange = (e, updateDocument) => {
		if (e.target.value !== '') {
			//Moving a doc from the Documents container to a folder by using the drop down menu
			if (this.props.document.folder === null) {
				// console.log('moving into folder', e.target.value);
				updateDocument({
					variables: { id: this.props.document._id, folder: e.target.value },
					refetchQueries: [
						{
							query: query.FIND_DOCUMENTS_BY_TEAM,
							variables: { team: this.props.team }
						},
						{
							query: query.FIND_DOCUMENTS_BY_FOLDER,
							variables: { folder: e.target.value }
						}
					]
				});
			} else if (this.props.document.folder !== null) {
				//Moving a doc from a folder container to a another folder by using the drop down menu
				// console.log('moving folder to folder:', e.target.value);
				updateDocument({
					variables: {
						id: this.props.document._id,
						folder: e.target.value,
						previous: this.props.document.folder._id
					},
					refetchQueries: [
						{
							query: query.FIND_DOCUMENTS_BY_TEAM,
							variables: { team: this.props.team }
						},
						{
							query: query.FIND_DOCUMENTS_BY_FOLDER,
							variables: { folder: e.target.value }
						},
						{
							query: query.FIND_DOCUMENTS_BY_FOLDER,
							variables: { folder: this.props.document.folder._id }
						}
					]
				});
			} else {
				// console.log('did we run an update?');
			}
		} else {
			// console.log('pick a folder');
		}
		this.props.hideModal();
	};

	render() {
		const { document, currentUser, hideModal, open } = this.props;
		// console.log('All the props from the document modal: ', this.props);
		if (document === null || document === undefined) return <></>;
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
						<StyledModalPaper>
							{/* toggle editing document */}
							{this.state.editingDocument ? (
								<CardContent>
									<Mutation mutation={UPDATE_DOCUMENT}>
										{updateDocument => (
											<StyledModalForm
												onSubmit={e => {
													e.preventDefault();
													document.title = this.state.title;
													document.textContent = this.state.textContent;
													document.doc_url = this.state.doc_url;
													updateDocument({
														variables: {
															id: document._id,
															title: this.state.title,
															doc_url: this.state.doc_url,
															textContent: this.state.textContent
														},
														refetchQueries: [
															{
																query: query.FIND_DOCUMENTS_BY_TEAM,
																variables: { team: this.props.team }
															}
														]
													});
													this.resetState();
												}}
											>
												<StyledModalInput
													name="title"
													value={this.state.title}
													onChange={this.handleChange}
												/>
												<StyledModalInput
													name="doc_url"
													value={this.state.doc_url}
													onChange={this.handleChange}
												/>
												<StyledModalInput
													name="textContent"
													value={this.state.textContent}
													onChange={this.handleChange}
													multiline
												/>
												<StyledModalButton type="submit">
													Save
												</StyledModalButton>
											</StyledModalForm>
										)}
									</Mutation>
								</CardContent>
							) : (
								<CardContent>
									{/* View document info */}
									<ModalTitle>{document.title}</ModalTitle>
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
										<DocUrl paragraph component="p">
											VIEW
										</DocUrl>
									</a>
									<FormDiv>
										{/* Move the doc to a new folder via drop down menu */}
										<SortForm>
											<Mutation mutation={UPDATE_DOCUMENT}>
												{updateDocument => (
													<select
														value={this.state.folderOption}
														onChange={e => this.folderChange(e, updateDocument)}
													>
														<option value="">Move to ...</option>
														<Query
															query={query.FIND_FOLDERS_BY_TEAM}
															variables={{ team: this.props.team }}
														>
															{({
																loading,
																error,
																data: { findFoldersByTeam }
															}) => {
																if (loading) return 'Loading...';
																if (error) return console.error(error);
																if (
																	findFoldersByTeam &&
																	findFoldersByTeam.length > 0
																) {
																	return findFoldersByTeam.map(folder => (
																		<option
																			key={folder._id}
																			value={`${folder._id}`}
																		>{`${folder.title}`}</option>
																	));
																}
																return <>no folders here</>;
															}}
														</Query>
													</select>
												)}
											</Mutation>
										</SortForm>
									</FormDiv>
									{/* All the document content */}
									<ModalBody>
										Posted by{' '}
										{`${document.user.firstName} ${document.user.lastName}`} •
										Tag:
										{` ${document.tag ? document.tag.name : 'none'}`}
									</ModalBody>
									<DocumentContent paragraph component="p">
										<span>Notes:</span>
										{document.textContent}
									</DocumentContent>
									{/* All the document options buttons */}
									<StyledModalCardAction>
										{document.user._id === currentUser._id && (
											<>
												<StyledModalButton
													onClick={e => {
														e.preventDefault();
														if (!this.state.editingComment) {
															this.setState({
																editingDocument: true,
																title: document.title,
																textContent: document.textContent,
																doc_url: document.doc_url
															});
														} else {
															alert(
																"Please finish editing your comment by clicking 'SAVE' before editing the document."
															);
														}
													}}
												>
													Edit
												</StyledModalButton>
												<Mutation mutation={DELETE_DOCUMENT}>
													{deleteDocument => (
														<StyledModalButton
															onClick={e => {
																e.preventDefault();
																if (document.folder) {
																	deleteDocument({
																		variables: { id: document._id },
																		refetchQueries: [
																			{
																				query: query.FIND_DOCUMENTS_BY_TEAM,
																				variables: { team: this.props.team }
																			},
																			{
																				query: query.FIND_FOLDERS_BY_TEAM,
																				variables: { team: this.props.team }
																			},
																			{
																				query: query.FIND_DOCUMENTS_BY_FOLDER,
																				variables: {
																					folder: this.props.folder._id
																				}
																			}
																		]
																	}).then(() => {
																		hideModal();
																	});
																} else {
																	deleteDocument({
																		variables: { id: document._id },
																		refetchQueries: [
																			{
																				query: query.FIND_DOCUMENTS_BY_TEAM,
																				variables: { team: this.props.team }
																			},
																			{
																				query: query.FIND_FOLDERS_BY_TEAM,
																				variables: { team: this.props.team }
																			}
																		]
																	}).then(() => {
																		hideModal();
																	});
																}
															}}
														>
															Delete
														</StyledModalButton>
													)}
												</Mutation>
											</>
										)}

										{/* Subscribe or unsubscribe button */}
										<Mutation mutation={UNSUBSCRIBE_DOC}>
											{unsubscribeDoc => (
												<Mutation mutation={SUBSCRIBE_DOC}>
													{subscribeDoc => (
														<StyledModalButton
															onClick={e => {
																e.preventDefault();
																this.setState(prevState => ({
																	subscribed: !prevState.subscribed
																}));
																this.state.subscribed
																	? unsubscribeDoc({
																			variables: {
																				id: document._id,
																				user: currentUser._id
																			},
																			refetchQueries: [
																				{
																					query: query.FIND_DOCUMENTS_BY_TEAM,
																					variables: { team: this.props.team }
																				}
																			]
																	  })
																	: subscribeDoc({
																			variables: {
																				id: document._id,
																				user: currentUser._id
																			},
																			refetchQueries: [
																				{
																					query: query.FIND_DOCUMENTS_BY_TEAM,
																					variables: { team: this.props.team }
																				}
																			]
																	  });
															}}
														>
															{this.state.subscribed
																? 'Unsubscribe'
																: 'Subscribe'}
														</StyledModalButton>
													)}
												</Mutation>
											)}
										</Mutation>
									</StyledModalCardAction>
								</CardContent>
							)}
						</StyledModalPaper>
						{/* View all the comments of the document */}
						<StyledModalTitle>Discussion</StyledModalTitle>
						<Query
							query={query.FIND_COMMENTS_BY_DOCUMENT}
							variables={{ document: document._id }}
						>
							{({ loading, error, data: { findDocCommentsByDocument } }) => {
								if (loading) return <StyledProgressSpinnerSecondary />;
								if (error) return <p>Error</p>;
								return (
									<>
										{/* Display all the comments */}
										{findDocCommentsByDocument.map(comment => (
											<DocumentCommentDetail
												key={comment._id}
												comment={comment}
												currentUser={currentUser}
												editingDocument={this.state.editingDocument}
												{...this.props}
											/>
										))}
									</>
								);
							}}
						</Query>
						<Mutation mutation={ADD_DOCCOMMENT}>
							{/* Add a new comment form */}
							{addDocComment => (
								<StyledModalNewCommentForm
									onSubmit={e => {
										e.preventDefault();
										addDocComment({
											variables: {
												document: document._id,
												content: this.state.newCommentContent
											},
											refetchQueries: [
												{
													query: query.FIND_COMMENTS_BY_DOCUMENT,
													variables: { document: document._id }
												}
											]
										});
										this.resetState();
									}}
								>
									<StyledModalNewCommentInput
										value={this.state.newCommentContent}
										name="newCommentContent"
										onChange={this.handleChange}
										placeholder="Leave a comment..."
									/>

									<ArrowDiv type="submit">
										<Arrow />
									</ArrowDiv>
								</StyledModalNewCommentForm>
							)}
						</Mutation>
					</ModalContents>
				</StyledModalOverlay>
			</StyledModal>
		);
	}
}

export default DocumentDetails;
