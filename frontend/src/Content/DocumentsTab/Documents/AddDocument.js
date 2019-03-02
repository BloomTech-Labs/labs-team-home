import React from 'react';
import { compose, Query } from 'react-apollo';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Close } from '../../MessageBoard/MessageDetail';
import { colors, palette } from '../../../colorVariables';
import { addDocument, addTag } from '../../mutations/documents';
import { FIND_TAGS_BY_TEAM } from '../../../constants/queries'; // this seems to be working

const StyledDialog = styled(Dialog)`
	max-width: 696px;
	margin: 0 auto;
`;

const Overlay = styled(DialogContent)`
	background-color: ${colors.button};
	.filepond--wrapper {
		width: 100%;
	}
`;

const SubmitButton = styled(Button)`
	color: ${colors.text};
	margin: 0 auto;
`;

const Title = styled(DialogTitle)`
	padding-left: 0;
	background-color: ${colors.button};
	h2 {
		color: ${colors.text};
	}
`;

const Input = styled(TextField)`
	input,
	textarea,
	label {
		color: ${colors.text};
	}
	&:nth-child(2) {
		margin: 10px 0;
		textarea {
			min-height: 200px;
		}
	}
	&:nth-child(3) {
		margin-bottom: 10px;
	}
`;

class AddDocument extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			url: '',
			content: '',
			tag: ''
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { addDocument, addTag } = this.props;

		return (
			<StyledDialog
				open={this.props.open}
				onClose={this.props.closeHandler}
				PaperProps={{
					style: {
						background: `transparent`,
						boxShadow: 'none'
					}
				}}
			>
				{/*Close button*/}
				<Close>
					<IconButton
						aria-label="Close"
						onClick={this.props.closeHandler}
						style={{
							color: colors.text,
							background: palette.plumTransparent
						}}
					>
						<CloseIcon />
					</IconButton>
				</Close>
				<Overlay>
					<Title>Add a New Document</Title>
					<Query
						query={FIND_TAGS_BY_TEAM}
						variables={{ team: this.props.team }}
					>
						{({ loading, error, data: { findTagsByTeam } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error</p>;
							return (
								<form
									onSubmit={e => {
										e.preventDefault();
										// create new document
										let newDocument = {
											user: this.props.user,
											title: this.state.title,
											team: this.props.team,
											content: this.state.content,
											url: this.state.url,
											folder: null
										};
										// if there is a tag in state
										if (this.state.tag.length) {
											const exists = findTagsByTeam.find(
												({ name }) => name === this.state.tag
											);
											if (exists) {
												newDocument.tag = exists._id;
												console.log(newDocument.tag);
												addDocument(newDocument)
													.then(() => this.props.closeHandler())
													.catch(err => {
														console.error(err);
													});
											} else {
												return addTag({
													name: this.state.tag,
													team: this.props.team
												})
													.then(async ({ data: { addTag: { _id } } }) => {
														try {
															await (newDocument.tag = _id);
															console.log(newDocument);
															console.log(newDocument.tag);
															await addDocument(newDocument);
															await this.props.closeHandler();
														} catch (err) {
															console.error(err);
														}
													})
													.catch(err => console.error(err));
											}
											// if no tag in state
										} else {
											addDocument(newDocument)
												.then(res => {
													return this.props.closeHandler();
												})
												.catch(err => {
													console.error(err);
												});
										}
									}}
								>
									<Input
										name="title"
										placeholder="title"
										variant="outlined"
										fullWidth
										onChange={this.handleChange}
									/>
									<Input
										name="url"
										placeholder="url"
										variant="outlined"
										fullWidth
										onChange={this.handleChange}
									/>
									<Input
										name="content"
										placeholder="content"
										variant="outlined"
										fullWidth
										onChange={this.handleChange}
										multiline
									/>
									<Input
										name="tag"
										placeholder="tag"
										variant="outlined"
										onChange={this.handleChange}
										fullWidth
									/>

									<SubmitButton type="submit" size="large" fullWidth>
										Add
									</SubmitButton>
								</form>
							);
						}}
					</Query>
				</Overlay>
			</StyledDialog>
		);
	}
}

export default compose(
	addDocument,
	addTag
)(AddDocument);
