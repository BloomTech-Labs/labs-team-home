import React from 'react';

// ------------- gql Imports ---------------------- //
import { Query, compose } from 'react-apollo';
import {
	deleteDocument,
	updateDocument,
	unsubscribeDoc,
	subscribeDoc
} from '../../mutations/documents';
import * as query from '../../../constants/queries';
import {
	addDocComment,
	updateDocComment,
	deleteDocComment,
	likeDocComment,
	unLikeDocComment
} from '../../mutations/doccomments';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { colors } from '../../../colorVariables';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
// import SendIcon from '@material-ui/icons/Send';

// ------------- Icon imports ------------------------------- //

import { FileAlt } from 'styled-icons/fa-solid/FileAlt';
// import { FileWord } from 'styled-icons/icomoon/FileWord';
// import { FileExcel } from 'styled-icons/fa-solid/FileExcel';
// import { FilePlay } from 'styled-icons/icomoon/FilePlay';
// import { FilePdf } from 'styled-icons/icomoon/FilePdf';
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
const DocumentIconDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const DocumentIcon = styled(FileAlt)`
	height: 100px;
`;

const ArrowDiv = styled.div`
	height: 150px;
	display: flex;
	align-items: center;

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
	flex-direction: row-reverse;
`;

const SortForm = styled.form`
	height: 50px;
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

	//set subscribed to true, if the currentUser is subscribed
	componentDidUpdate = prevProps =>
		this.props.document !== prevProps.document
			? this.props.document !== null
				? this.props.document.subscribedUsers.find(user =>
						user._id === this.props.currentUser._id
							? this.setState({ subscribed: true })
							: this.setState({ subscribed: false })
				  )
				: null
			: null;

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

	folderChange = e => {
		if (e.target.value !== '') {
			if (this.props.document.folder === null) {
				console.log('moving into folder', e.target.value);
				this.props.updateDocument({
					id: this.props.document._id,
					folder: e.target.value
				});
			} else if (this.props.document.folder !== null) {
				console.log('moving folder to folder:', e.target.value);
				this.props.updateDocument({
					id: this.props.document._id,
					folder: e.target.value,
					previous: this.props.document.folder._id
				});
			} else {
				console.log('did we run an update?');
			}
		} else {
			console.log('pick a folder');
		}
		this.props.hideModal();
	};

	render() {
		const {
			deleteDocument,
			document,
			updateDocument,
			currentUser,
			hideModal,
			updateDocComment,
			deleteDocComment,
			addDocComment,
			unLikeDocComment,
			likeDocComment,
			subscribeDoc,
			unsubscribeDoc,
			open
		} = this.props;

		// const documentSwitch = url => {
		// 	switch (url) {
		// 		case ''
		// 	}
		// }

		if (document === null) return <></>;
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
					<StyledModalPaper>
						{this.state.editingDocument ? (
							<CardContent>
								<StyledModalForm
									onSubmit={e => {
										e.preventDefault();
										document.title = this.state.title;
										document.textContent = this.state.textContent;
										document.doc_url = this.state.doc_url;
										updateDocument({
											id: document._id,
											title: this.state.title,
											doc_url: this.state.doc_url,
											textContent: this.state.textContent
										}).then(() => this.resetState());
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
									<StyledModalButton type="submit">Save</StyledModalButton>
								</StyledModalForm>
							</CardContent>
						) : (
							<CardContent>
								<ModalTitle>{document.title}</ModalTitle>
								<DocumentIconDiv>
									<DocumentIcon />
								</DocumentIconDiv>
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
									<SortForm>
										<label>
											<select
												value={this.state.folderOption}
												onChange={this.folderChange}
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
													}}
												</Query>
											</select>
										</label>
									</SortForm>
								</FormDiv>
								<ModalBody>
									{console.log(document)}
									Posted by{' '}
									{`${document.user.firstName} ${document.user.lastName}`} •
									Tag:
									{` ${document.tag ? document.tag.name : 'none'}`}
								</ModalBody>
								<DocumentContent paragraph component="p">
									<span>Notes:</span>
									{document.textContent}
								</DocumentContent>

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
											<StyledModalButton
												onClick={e => {
													e.preventDefault();
													deleteDocument({
														id: document._id
													}).then(() => {
														hideModal();
													});
												}}
											>
												Delete
											</StyledModalButton>
										</>
									)}

									{/* Subscribe or unsubscribe button */}
									<StyledModalButton
										onClick={e => {
											e.preventDefault();
											this.setState(prevState => ({
												subscribed: !prevState.subscribed
											}));
											this.state.subscribed
												? unsubscribeDoc({
														id: document._id,
														user: currentUser._id
												  })
												: subscribeDoc({
														id: document._id,
														user: currentUser._id
												  });
										}}
									>
										{this.state.subscribed ? 'Unsubscribe' : 'Subscribe'}
									</StyledModalButton>
								</StyledModalCardAction>
							</CardContent>
						)}
					</StyledModalPaper>
					{/* View all the comments of the document */}
					<Query
						query={query.FIND_COMMENTS_BY_DOCUMENT}
						variables={{ document: document._id }}
					>
						{({ loading, error, data: { findDocCommentsByDocument } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error</p>;
							return (
								<>
									<StyledModalTitle>Discussion</StyledModalTitle>
									{/* Display all the comments */}
									{findDocCommentsByDocument.map(comment => (
										<StyledModalPaper key={comment._id}>
											<CardHeader
												avatar={
													<Avatar
														src={comment.user.avatar}
														alt="test"
														style={{ height: '32px', width: '32px' }}
													/>
												}
												title={`${comment.user.firstName} ${
													comment.user.lastName
												}`}
												titleTypographyProps={{
													style: { color: colors.text }
												}}
											/>
											{/* Check to see if the user can edit the comment */}
											{this.state.editingComment &&
											this.state.editedComment === comment ? (
												<StyledModalForm
													action="submit"
													onSubmit={e => {
														e.preventDefault();
														updateDocComment({
															id: comment._id,
															content: this.state.commentContent
														}).then(() => this.resetState());
													}}
												>
													<StyledModalInput
														inputRef={this.edit}
														name="commentContent"
														value={this.state.commentContent}
														onChange={this.handleChange}
														multiline
													/>
													<StyledModalButton type="submit">
														Save
													</StyledModalButton>
												</StyledModalForm>
											) : (
												<CardContent>
													<StyledModalBody component="p">
														{comment.content}
													</StyledModalBody>

													{/* Check to see if the comment is the users and thus can be edited or deleted */}
													{comment.user._id === currentUser._id && (
														<>
															<StyledModalButton
																onClick={e => {
																	e.preventDefault();
																	if (!this.state.editingDocument) {
																		this.setState({
																			editingComment: true,
																			commentContent: comment.content,
																			editedComment: comment
																		});
																	} else {
																		alert(
																			"Please finish editing your document by clicking 'SAVE' before editing a comment."
																		);
																	}
																}}
															>
																Edit
															</StyledModalButton>
															<StyledModalButton
																onClick={e => {
																	e.preventDefault();
																	deleteDocComment({
																		id: comment._id
																	});
																}}
															>
																Delete
															</StyledModalButton>
														</>
													)}
													{/* Like button */}
													<StyledModalButton
														onClick={e => {
															e.preventDefault();
															comment.likes.find(
																({ _id }) => _id === currentUser._id
															)
																? unLikeDocComment({
																		id: comment._id,
																		document: document
																  })
																: likeDocComment({
																		id: comment._id,
																		document: document
																  });
														}}
													>
														{`${comment.likes.length} likes`}
													</StyledModalButton>
												</CardContent>
											)}
										</StyledModalPaper>
									))}
									{/* Add a new comment form  */}
									<StyledModalNewCommentForm
										onSubmit={e => {
											e.preventDefault();
											addDocComment({
												document: document._id,
												content: this.state.newCommentContent
											}).then(this.resetState());
										}}
									>
										<StyledModalNewCommentInput
											value={this.state.newCommentContent}
											name="newCommentContent"
											onChange={this.handleChange}
											placeholder="Leave a comment..."
										/>
										{/* <IconButton type="submit">
											<SendIcon style={{ color: colors.text }} />
										</IconButton> */}
										<ArrowDiv>
											<Arrow />
										</ArrowDiv>
									</StyledModalNewCommentForm>
								</>
							);
						}}
					</Query>
				</StyledModalOverlay>
			</StyledModal>
		);
	}
}

export default compose(
	addDocComment,
	deleteDocument,
	updateDocument,
	updateDocComment,
	deleteDocComment,
	likeDocComment,
	unLikeDocComment,
	subscribeDoc,
	unsubscribeDoc
)(DocumentDetails);
