import React from 'react';

// ------------- gql Imports ---------------------- //
import { compose, Query } from 'react-apollo';
import { addDocument, addTag } from '../../mutations/documents';
import { FIND_TAGS_BY_TEAM } from '../../../constants/queries'; // this seems to be working

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
					<StyledModalTitle>Add a New Document</StyledModalTitle>
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
									<StyledModalInput
										name="title"
										placeholder="title"
										variant="outlined"
										fullWidth
										onChange={this.handleChange}
									/>
									<StyledModalInput
										name="url"
										placeholder="url"
										variant="outlined"
										fullWidth
										onChange={this.handleChange}
									/>
									<StyledModalInput
										name="content"
										placeholder="content"
										variant="outlined"
										fullWidth
										onChange={this.handleChange}
										multiline
									/>
									<StyledModalInput
										name="tag"
										placeholder="tag"
										variant="outlined"
										onChange={this.handleChange}
										fullWidth
									/>

									<StyledModalButton type="submit" size="large" fullWidth>
										Add
									</StyledModalButton>
								</form>
							);
						}}
					</Query>
				</ModalOverlay>
			</StyledModal>
		);
	}
}

export default compose(
	addDocument,
	addTag
)(AddDocument);
