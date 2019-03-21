import React from 'react';

// ------------- gql Imports ---------------------- //
import {
	UNLIKE,
	LIKE,
	UPDATE_COMMENT,
	DELETE_COMMENT
} from '../../constants/mutations';
import { Mutation } from 'react-apollo';
import * as query from '../../constants/queries';

// ------------- Style Imports ---------------------- //
import { colors } from '../../colorVariables';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';

// ------------- Modal styling imports ---------------------- //
import {
	StyledModalPaper,
	StyledModalBody,
	StyledModalButton,
	StyledModalForm,
	StyledModalInput,
	StyledModalCardAction
} from '../Modal.styles';

class MessageBoardCommentDetails extends React.Component {
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

	onLikeClickHandler(e, like, unLike) {
		e.preventDefault();
		if (this.state.like) {
			unLike();
			this.setState(prevState => ({
				like: !prevState.like,
				likes: prevState.likes - 1
			}));
		} else {
			like();
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
		const { editingMessage, currentUser, comment } = this.props;

		if (comment === null) return <></>;
		return (
			<StyledModalPaper key={comment._id}>
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
				{/* check to see if the user can edit the comments */}
				{this.state.editing && this.state.edited === comment ? ( //<-- this check can be refactored. No longer nesesarry becasue this component does not live on its parent component anymore
					<Mutation mutation={UPDATE_COMMENT}>
						{updateMsgComment => (
							<StyledModalForm
								onSubmit={e => {
									e.preventDefault();
									updateMsgComment({
										variables: {
											id: this.state.edited._id,
											content: this.state.commentContent
										},
										refetchQueries: [
											{
												query: query.FIND_COMMENTS_BY_MESSAGE,
												variables: { message: this.props.message._id }
											},
											{
												query: query.FIND_MESSAGES_BY_TEAM,
												variables: { team: this.props.team }
											}
										]
									}).then(() => this.resetState());
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
						<StyledModalCardAction>
							{comment.user._id === currentUser._id && (
								<>
									<StyledModalButton
										onClick={e => {
											e.preventDefault();
											if (!editingMessage) {
												this.setState({
													editing: true,
													edited: comment,
													commentContent: comment.content
												});
											} else {
												alert(
													"Please finish editing your message by clicking 'SAVE' before editing a comment."
												);
											}
										}}
									>
										Edit
									</StyledModalButton>
									<Mutation
										mutation={DELETE_COMMENT}
										variables={{
											id: comment._id
										}}
										refetchQueries={[
											{
												query: query.FIND_COMMENTS_BY_MESSAGE,
												variables: { message: this.props.message._id }
											}
										]}
									>
										{deleteMsgComment => (
											<StyledModalButton
												onClick={e => {
													e.preventDefault();
													deleteMsgComment();
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
								mutation={LIKE}
								variables={{ id: comment._id }}
								refetchQueries={[
									{
										query: query.FIND_COMMENTS_BY_MESSAGE,
										variables: { message: this.props.message._id }
									}
								]}
							>
								{like => (
									<Mutation
										mutation={UNLIKE}
										variables={{ id: comment._id }}
										refetchQueries={[
											{
												query: query.FIND_COMMENTS_BY_MESSAGE,
												variables: { message: this.props.message._id }
											}
										]}
									>
										{unLike => (
											<StyledModalButton
												onClick={e => {
													this.onLikeClickHandler(e, like, unLike);
												}}
											>
												{`${this.state.likes} likes`}
											</StyledModalButton>
										)}
									</Mutation>
								)}
							</Mutation>
						</StyledModalCardAction>
					</CardContent>
				)}
			</StyledModalPaper>
		);
	}
}

export default MessageBoardCommentDetails;
