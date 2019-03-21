import React from 'react';

// ------------- gql Imports ---------------------- //
import { Mutation } from 'react-apollo';
import * as query from '../../../constants/queries';
import { ADD_FOLDER } from '../../../constants/mutations';

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
			title: ''
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<StyledModal open={this.props.open} onClose={this.props.hideModal}>
				<StyledModalClose>
					<StyledModalIconButton onClick={this.props.hideModal}>
						<CloseIcon />
					</StyledModalIconButton>
				</StyledModalClose>
				<StyledModalOverlay>
					<StyledModalTitle>Add a New Folder</StyledModalTitle>
					<Mutation
						mutation={ADD_FOLDER}
						variables={{
							user: this.props.user,
							title: this.state.title,
							team: this.props.team
						}}
					>
						{addFolder => (
							<StyledModalForm
								onSubmit={e => {
									e.preventDefault();
									addFolder({
										refetchQueries: [
											{
												query: query.FIND_FOLDERS_BY_TEAM,
												variables: { team: this.props.team }
											}
										]
									})
										.then(this.props.hideModal())
										.catch(err => {
											console.error(err);
										});
								}}
							>
								<StyledModalInput
									name="title"
									placeholder="title"
									onChange={this.handleChange}
								/>
								<StyledModalButton type="submit" fullWidth>
									Add
								</StyledModalButton>
							</StyledModalForm>
						)}
					</Mutation>
				</StyledModalOverlay>
			</StyledModal>
		);
	}
}

export default AddFolder;
