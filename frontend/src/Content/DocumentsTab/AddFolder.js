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
import { addFolder } from '../mutations/folders';

// {title: asdfaf, team: adsf}

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

class AddFolder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			newFolderTitle: '',
			title: ''
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { addFolder } = this.props;

		return (
			<Dialog
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
					<Title>Add a New Folder</Title>

					<form
						onSubmit={e => {
							e.preventDefault();
							//create newFolder object using the variables created in advance
							let newFolder = {
								user: this.props.user,
								title: this.state.title,
								team: this.props.team
							};
							addFolder(newFolder)
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
						<SubmitButton type="submit" size="large" fullWidth>
							Add
						</SubmitButton>
					</form>
				</Overlay>
			</Dialog>
		);
	}
}

export default compose(addFolder)(AddFolder);
