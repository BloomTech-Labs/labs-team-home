import React from 'react';
import { compose } from 'react-apollo';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Close } from '../MessageBoard/MessageDetail';
import { colors, palette } from '../../colorVariables';
import { addDocument } from '../mutations/documents';

const StyledDialog = styled(Dialog)`
	max-width: 696px;
	margin: 0 auto;

	/* should add a media query here to make the modal go full screen if less than max width */
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
			content: ''
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { addDocument } = this.props;

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

					<form
						onSubmit={e => {
							e.preventDefault();
							// create new document
							addDocument({
								user: this.props.user,
								title: this.state.title,
								team: this.props.team,
								content: this.state.content,
								url: this.state.url
							})
								.then(res => {
									return this.props.closeHandler();
								})
								.catch(err => {
									console.error(err);
								});
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

						<SubmitButton type="submit" size="large" fullWidth>
							Add
						</SubmitButton>
					</form>
				</Overlay>
			</StyledDialog>
		);
	}
}

export default compose(addDocument)(AddDocument);
