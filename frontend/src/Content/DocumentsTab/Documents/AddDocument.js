import React from 'react';

// ------------- gql Imports ---------------------- //
import { Query, Mutation } from 'react-apollo';
import {
	FIND_TAGS_BY_TEAM,
	FIND_DOCUMENTS_BY_TEAM
} from '../../../constants/queries'; // this seems to be working
import * as query from '../../../constants/queries';
import { ADD_DOCUMENT, ADD_TAG } from '../../../constants/mutations';

// ------------- Style Imports ---------------------- //
// import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { StyledProgressSpinnerSecondary } from '../../../app-styles';

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
							if (loading) return <StyledProgressSpinnerSecondary />;
							if (error) return <p>Error</p>;
							return (
								<Mutation mutation={ADD_DOCUMENT}>
									{addDocument => (
										<Mutation
											mutation={ADD_TAG}
											refetchQueries={[
												{
													query: query.FIND_TAGS_BY_TEAM,
													variables: { team: this.props.team }
												}
											]}
										>
											{addTag => (
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
																addDocument({
																	variables: newDocument,
																	refetchQueries: [
																		{
																			query: FIND_DOCUMENTS_BY_TEAM,
																			variables: { team: this.props.team }
																		}
																	]
																});
																this.props.hideModal();
															} else {
																return addTag({
																	variables: {
																		name: this.state.tag,
																		team: this.props.team
																	}
																})
																	.then(
																		async ({
																			data: {
																				addTag: { _id }
																			}
																		}) => {
																			try {
																				await (newDocument.tag = _id);
																				await addDocument({
																					variables: newDocument,
																					refetchQueries: [
																						{
																							query: FIND_DOCUMENTS_BY_TEAM,
																							variables: {
																								team: this.props.team
																							}
																						}
																					]
																				});
																				await this.props.hideModal();
																			} catch (err) {
																				console.error(err);
																			}
																		}
																	)
																	.catch(err => console.error(err));
															}
															// if no tag in state
														} else {
															addDocument({
																variables: newDocument,
																refetchQueries: [
																	{
																		query: FIND_DOCUMENTS_BY_TEAM,
																		variables: { team: this.props.team }
																	}
																]
															});
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

export default AddDocument;
