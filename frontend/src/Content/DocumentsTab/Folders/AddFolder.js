import React from 'react';

// ------------- gql Imports ---------------------- //
import { compose } from 'react-apollo';
import { addFolder } from '../../mutations/folders';

// ------------- Style Imports ---------------------- //
// import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

// ------------- Modal styling imports ---------------------- //
import {
	StyledModal,
	StyledModalOverlay,
	StyledModalClose,
	StyledModalTitle,
	StyledModalButton,
	StyledModalForm,
	StyledModalInput,
	StyledModalIconButton
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
			<StyledModal open={this.props.open} onClose={this.props.closeHandler}>
				<StyledModalClose>
					<StyledModalIconButton onClick={this.props.closeHandler}>
						<CloseIcon />
					</StyledModalIconButton>
				</StyledModalClose>
				<StyledModalOverlay>
					<StyledModalTitle>Add a New Folder</StyledModalTitle>
					<StyledModalForm
						onSubmit={e => {
							e.preventDefault();
							addFolder({
								user: this.props.user,
								title: this.state.title,
								team: this.props.team
							})
								.then(res => {
									this.props.closeHandler();
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
					</StyledModalForm>
				</StyledModalOverlay>
			</StyledModal>
		);
	}
}

export default compose(addFolder)(AddFolder);
