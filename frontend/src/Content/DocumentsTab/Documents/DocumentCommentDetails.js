import React from 'react';

// ------------- gql Imports ---------------------- //
import {
	UNLIKE_DOCCOMMENT,
	LIKE_DOCCOMMENT,
	UPDATE_DOCCOMMENT,
	DELETE_DOCCOMMENT
} from '../../../constants/mutations';
import { Mutation } from 'react-apollo';
import * as query from '../../../constants/queries';

// ------------- Style Imports ---------------------- //
import { colors } from '../../../colorVariables';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';

// ------------- Modal styling imports ---------------------- //
import {
	StyledModalPaper,
	StyledModalBody,
	StyledModalButton,
	StyledModalForm,
	StyledModalInput
} from '../../Modal.styles';

class DocumentDetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			textContent: '',
			editingComment: false,
			commentContent: '',
			editedComment: null,
			newCommentContent: '',
			like: null,
			likes: null
		};
	}

	componentDidMount() {
		if (
			this.props.comment.likes.find(u => u._id === this.props.currentUser._id)
		) {
			this.setState({ like: true, likes: this.props.comment.likes.length });
		} else {
			this.setState({
				like: false,
				likes: this.props.comment.likes.length
			});
		}
	}

	onLikeClickHandler(e, likeDocComment, unLikeDocComment) {
		e.preventDefault();
		if (this.state.like) {
			unLikeDocComment();
			this.setState(prevState => ({
				like: !prevState.like,
				likes: prevState.likes - 1
			}));
		} else {
			likeDocComment();
			this.setState(prevState => ({
				like: !prevState.like,
				likes: prevState.likes + 1
			}));
		}
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value });

	resetState = () =>
		this.setState({
			textContent: '',
			editingComment: false,
			commentContent: '',
			editedComment: null,
			newCommentContent: ''
		});

	render() {
		const { editingDocument, currentUser, comment } = this.props;

		if (comment === null) return <></>;
		return (
			<StyledModalPaper>
				<CardHeader
					avatar={
						<Avatar
							src={comment.user.avatar}
							alt="test"
							style={{ height: '32px', width: '32px' }}
						/>
					}
					title={`${comment.user.firstName} ${comment.user.lastName}`}
					titleTypographyProps={{
						style: { color: colors.text }
					}}
				/>
				{/* Check to see if the user can edit the comment */}
				{this.state.editingComment && this.state.editedComment === comment ? (
					<Mutation
						mutation={UPDATE_DOCCOMMENT}
						variables={{
							id: comment._id,
							content: this.state.commentContent
						}}
					>
						{updateDocComment => (
							<StyledModalForm
								action="submit"
								onSubmit={e => {
									e.preventDefault();
									updateDocComment({
										variables: {
											id: comment._id,
											content: this.state.commentContent
										},
										refetchQueries: [
											{
												query: query.FIND_COMMENTS_BY_DOCUMENT,
												variables: { document: this.props.document._id }
											}
										]
									});
									comment.content = this.state.commentContent;
									this.resetState();
								}}
							>
								<StyledModalInput
									name="commentContent"
									value={this.state.commentContent}
									onChange={this.handleChange}
									multiline
								/>
								<StyledModalButton type="submit">Save</StyledModalButton>
							</StyledModalForm>
						)}
					</Mutation>
				) : (
					<CardContent>
						<StyledModalBody component="p">{comment.content}</StyledModalBody>

						{/* Check to see if the comment is the users and thus can be edited or deleted */}
						{comment.user._id === currentUser._id && (
							<>
								<StyledModalButton
									onClick={e => {
										e.preventDefault();
										if (!editingDocument) {
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
								<Mutation
									mutation={DELETE_DOCCOMMENT}
									variables={{
										id: comment._id
									}}
								>
									{deleteDocComment => (
										<StyledModalButton
											onClick={e => {
												e.preventDefault();
												deleteDocComment({
													refetchQueries: [
														{
															query: query.FIND_COMMENTS_BY_DOCUMENT,
															variables: { document: this.props.document._id }
														}
													]
												});
											}}
										>
											Delete
										</StyledModalButton>
									)}
								</Mutation>
							</>
						)}
						{/* Like button */}
						<Mutation
							mutation={LIKE_DOCCOMMENT}
							variables={{ id: comment._id }}
							refetchQueries={[
								{
									query: query.FIND_COMMENTS_BY_DOCUMENT,
									variables: { document: this.props.document._id }
								}
							]}
						>
							{likeDocComment => (
								<Mutation
									mutation={UNLIKE_DOCCOMMENT}
									variables={{ id: comment._id }}
									refetchQueries={[
										{
											query: query.FIND_COMMENTS_BY_DOCUMENT,
											variables: { document: this.props.document._id }
										}
									]}
								>
									{unLikeDocComment => (
										<StyledModalButton
											onClick={e =>
												this.onLikeClickHandler(
													e,
													likeDocComment,
													unLikeDocComment
												)
											}
										>
											{`${this.state.likes} likes`}
										</StyledModalButton>
									)}
								</Mutation>
							)}
						</Mutation>
					</CardContent>
				)}
			</StyledModalPaper>
		);
	}
}

export default DocumentDetails;
