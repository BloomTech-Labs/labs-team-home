import React from 'react';

// ------------- gql Imports ---------------------- //
import { compose, Query, Mutation } from 'react-apollo';
import { addTag } from '../../mutations/documents';
import { FIND_TAGS_BY_TEAM } from '../../../constants/queries'; // this seems to be working
import { ADD_DOCUMENT } from '../../../constants/mutations';

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
			tag: '',
			fullDocument: null
		};
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addStateDoc = document => {
		this.setState({ fullDocument: document });
	};

	render() {
		const { addTag } = this.props;

		return (
			<StyledModal open={this.props.open} onClose={this.props.hideModal}>
				<StyledModalClose>
					<StyledModalIconButton onClick={this.props.hideModal}>
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
								<Mutation
									mutation={ADD_DOCUMENT}
									variables={{ ...this.state.fullDocument }}
								>
									{addDocument => (
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
														this.addStateDoc(newDocument);
														addDocument();
														this.props.hideModal();
													} else {
														return addTag({
															name: this.state.tag,
															team: this.props.team
														})
															.then(async ({ data: { addTag: { _id } } }) => {
																try {
																	await (newDocument.tag = _id);
																	await this.addStateDoc(newDocument);
																	await addDocument();
																	await this.props.hideModal();
																} catch (err) {
																	console.error(err);
																}
															})
															.catch(err => console.error(err));
													}
													// if no tag in state
												} else {
													this.addStateDoc(newDocument);
													addDocument();
													this.props.hideModal();
												}
											}}
										>
											<StyledModalInput
												name="title"
												placeholder="title"
												onChange={this.handleChange}
											/>
											<StyledModalInput
												name="url"
												placeholder="url"
												onChange={this.handleChange}
											/>
											<StyledModalInput
												name="content"
												placeholder="content"
												onChange={this.handleChange}
												multiline
											/>
											<StyledModalInput
												name="tag"
												placeholder="tag"
												onChange={this.handleChange}
											/>
											<StyledModalButton type="submit" fullWidth>
												Add
											</StyledModalButton>
										</StyledModalForm>
									)}
								</Mutation>
							);
						}}
					</Query>
				</StyledModalOverlay>
			</StyledModal>
		);
	}
}

export default compose(addTag)(AddDocument);
