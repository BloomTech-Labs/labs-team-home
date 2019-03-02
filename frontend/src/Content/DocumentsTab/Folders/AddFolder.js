import React from 'react';

// ------------- gql Imports ---------------------- //
import { compose } from 'react-apollo';
import { addFolder } from '../../mutations/folders';

// ------------- Style Imports ---------------------- //
// import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { colors, palette } from '../../../colorVariables';

// ------------- Modal styling imports ---------------------- //
import { StyledModal, ModalOverlay, ModalClose } from '../../Modal.styles';
import {
	StyledModalTitle,
	StyledModalButton,
	StyledModalInput
} from '../../Modal.styles';

class AddFolder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			title: ''
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		const { addFolder } = this.props;

		return (
			<StyledModal
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
				<ModalClose>
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
				</ModalClose>
				<ModalOverlay>
					<StyledModalTitle>Add a New Folder</StyledModalTitle>

					<form
						onSubmit={e => {
							e.preventDefault();
							//create newFolder
							addFolder({
								user: this.props.user,
								title: this.state.title,
								team: this.props.team
							})
								.then(res => {
									return this.props.closeHandler();
								})
								.catch(err => {
									console.error(err);
								});
						}}
					>
						<StyledModalInput
							name="title"
							placeholder="title"
							variant="outlined"
							onChange={this.handleChange}
							fullWidth
						/>
						<StyledModalButton type="submit" fullWidth>
							Add
						</StyledModalButton>
					</form>
				</ModalOverlay>
			</StyledModal>
		);
	}
}

export default compose(addFolder)(AddFolder);
