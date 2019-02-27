import React from 'react';
import { Query, compose } from 'react-apollo';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Close } from '../MessageBoard/MessageDetail';
import { colors, palette } from '../../colorVariables';
import { deleteDocument, updateDocument } from '../mutations/documents';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import * as query from '../../constants/queries';
import CardContent from '@material-ui/core/CardContent';
import {
	addDocComment,
	updateDocComment,
	deleteDocComment,
	likeDocComment,
	unLikeDocComment
} from '../mutations/doccomments';
import SendIcon from '@material-ui/icons/Send';

//Pretty much all of these components are defined elsewhere,
//we really ought to have a component for modal styling

const StyledDialog = styled(Dialog)`
	min-width: 550px;
	margin: 0 auto;
	padding: 0px;
	classes {
		display: block;
		paperWidthSm-41 {
			max-width: 100%;
		}
	}

	/* should add a media query here to make the modal go full screen if less than max width */
`;

const Overlay = styled(DialogContent)`
	background-color: ${colors.button};
	min-width: 550px;
	margin: 0 auto;
`;

const StyledTypography = styled(Typography)`
	color: ${colors.text};
`;

const StyledTextField = styled(TextField)`
	color: ${colors.text};
	input,
	textarea {
		color: ${colors.text};
	}
`;

const StyledEditCommentLabel = styled.label`
	width: 80%;
`;

const StyledButton = styled(Button)`
	border-bottom: solid 1px ${palette.yellow};
	color: ${colors.text};
	border-radius: 0px;
	margin: 10px;
`;

const Form = styled.form`
	display: flex;
`;

const CommentInputLabel = styled.label`
	width: 90%;
	background-color: #fff;
	padding: 5px;
	margin: 0 auto;
`;

const CommentForm = styled.form`
	display: flex;
	flex-direction: column;
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
			newCommentContent: ''
		};
	}

	resetState = () =>
		this.setState({
			editingDocument: false,
			title: '',
			doc_url: '',
			textContent: '',
			editingComment: false,
			commentContent: '',
			editedComment: null,
			newCommentContent: ''
		});

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

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
			likeDocComment
		} = this.props;

		if (document === null) return <></>;
		// console.log(this.props);
		return (
			<StyledDialog
				open={this.props.open}
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
			>
				<Close>
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
				</Close>
				<Overlay>
					{/* All fo the folder info should go here 
                    Not just the ability to delete 
                    Should also include a list of all the files */}
					<CardHeader
						avatar={
							<Avatar
								src={document.user.avatar}
								alt="avatar"
								style={{ height: '64px', width: '64px' }}
							/>
						}
						title={`${document.user.firstName} ${document.user.lastName}`}
						titleTypographyProps={{
							style: { color: colors.text }
						}}
					/>
					{this.state.editingDocument ? (
						<form
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
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column'
							}}
						>
							<label htmlFor="document title" />
							<StyledTextField
								name="title"
								value={this.state.title}
								onChange={this.handleChange}
							/>
							<label htmlFor="document url" />
							<StyledTextField
								name="doc_url"
								value={this.state.doc_url}
								onChange={this.handleChange}
							/>
							<label htmlFor="document content" />
							<StyledTextField
								name="textContent"
								value={this.state.textContent}
								onChange={this.handleChange}
								multiline
							/>
							<StyledButton type="submit">Save</StyledButton>
						</form>
					) : (
						<>
							<StyledTypography variant="h5" component="h3">
								{document.title}
							</StyledTypography>
							<StyledTypography paragraph component="p">
								{document.doc_url}
							</StyledTypography>
							<StyledTypography paragraph component="p">
								{document.textContent}
							</StyledTypography>

							{/* Load all the images attached to the message */}

							<CardActions
								style={{
									width: '100%',
									display: 'flex',
									flexFlow: 'row',
									justifyContent: 'space-around'
								}}
							>
								{document.user._id === currentUser._id && (
									<>
										<StyledButton
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
										</StyledButton>
										<StyledButton
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
										</StyledButton>
									</>
								)}

								{/* Subscription for the document stuff goes here */}
							</CardActions>
						</>
					)}
					{/* View all the comments of the message */}
					<Query
						query={query.FIND_COMMENTS_BY_DOCUMENT}
						variables={{ document: document._id }}
					>
						{({ loading, error, data: { findDocCommentsByDocument } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error</p>;
							return (
								<>
									<StyledTypography
										gutterBottom
										variant="h6"
										component="h5"
										style={{ margin: '30px 0' }}
									>
										Comments
									</StyledTypography>
									{/* Display all the comments */}
									{findDocCommentsByDocument.map(comment => (
										<Paper
											key={comment._id}
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
												<CommentForm
													action="submit"
													onSubmit={e => {
														e.preventDefault();
														updateDocComment({
															id: comment._id,
															content: this.state.commentContent
														}).then(() => this.resetState());
													}}
												>
													<StyledEditCommentLabel htmlFor="comment-content">
														<StyledTextField
															inputRef={this.edit}
															name="commentContent"
															value={this.state.commentContent}
															onChange={this.handleChange}
															variant="outlined"
															multiline={true}
														/>
													</StyledEditCommentLabel>
													<StyledButton type="submit">Save</StyledButton>
												</CommentForm>
											) : (
												<>
													<CardContent>
														<StyledTypography component="p">
															{comment.content}
														</StyledTypography>
													</CardContent>

													{/* Check to see if the comment is the users and thus can be edited or deleted */}
													<CardContent>
														{comment.user._id === currentUser._id && (
															<>
																<StyledButton
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
																</StyledButton>
																<StyledButton
																	onClick={e => {
																		e.preventDefault();
																		deleteDocComment({
																			id: comment._id
																		});
																	}}
																>
																	Delete
																</StyledButton>
															</>
														)}
														{/* Like button */}
														<StyledButton
															onClick={e => {
																e.preventDefault();
																comment.likes.find(
																	({ _id }) => _id === currentUser._id
																)
																	? unLikeDocComment({
																			id: comment._id
																	  })
																	: likeDocComment({
																			id: comment._id
																	  });
															}}
														>
															{`${comment.likes.length} likes`}
														</StyledButton>
													</CardContent>
												</>
											)}
										</Paper>
									))}
									{/* Add a new comment form  */}
									<Form
										onSubmit={e => {
											e.preventDefault();
											addDocComment({
												document: document._id,
												content: this.state.newCommentContent
											});
										}}
									>
										<CommentInputLabel>
											<TextField
												placeholder="Leave a comment..."
												style={{
													color: '#000',
													height: '100px',
													backgroundColor: '#fff',
													padding: '0px'
												}}
												onChange={this.handleChange}
												name="newCommentContent"
												value={this.state.newCommentContent}
												multiline={true}
											/>
										</CommentInputLabel>
										<IconButton type="submit">
											<SendIcon style={{ color: colors.text }} />
										</IconButton>
									</Form>
								</>
							);
						}}
					</Query>
				</Overlay>
			</StyledDialog>
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
	unLikeDocComment
)(DocumentDetails);
