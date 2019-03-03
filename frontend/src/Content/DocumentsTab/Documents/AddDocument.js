import React from 'react';

// ------------- gql Imports ---------------------- //
import { compose, Query } from 'react-apollo';
import { addDocument, addTag } from '../../mutations/documents';
import { FIND_TAGS_BY_TEAM } from '../../../constants/queries'; // this seems to be working

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
			<StyledModal open={this.props.open} onClose={this.props.closeHandler}>
				<StyledModalClose>
					<StyledModalIconButton onClick={this.props.closeHandler}>
						<CloseIcon />
					</StyledModalIconButton>
				</StyledModalClose>
				<StyledModalOverlay>
					<StyledModalTitle>Add a New Document</StyledModalTitle>
					<Query
						query={FIND_TAGS_BY_TEAM}
						variables={{ team: this.props.team }}
					>
						{({ loading, error, data: { findTagsByTeam } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error</p>;
							return (
								<StyledModalForm
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
													this.props.closeHandler();
												})
												.catch(err => {
													console.error(err);
												});
										}
									}}
								>
									<StyledModalInput
										name="title"
										placeholder="title"
										variant="outlined"
										onChange={this.handleChange}
									/>
									<StyledModalInput
										name="url"
										placeholder="url"
										variant="outlined"
										onChange={this.handleChange}
									/>
									<StyledModalInput
										name="content"
										placeholder="content"
										variant="outlined"
										onChange={this.handleChange}
										multiline
									/>
									<StyledModalInput
										name="tag"
										placeholder="tag"
										variant="outlined"
										onChange={this.handleChange}
									/>

									<StyledModalButton type="submit" fullWidth>
										Add
									</StyledModalButton>
								</StyledModalForm>
							);
						}}
					</Query>
				</StyledModalOverlay>
			</StyledModal>
		);
	}
}

export default compose(
	addDocument,
	addTag
)(AddDocument);
