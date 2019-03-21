import React from 'react';

// ------------- gql Imports ---------------------- //
import { Query, Mutation } from 'react-apollo';
import * as query from '../../../constants/queries';
import { UPDATE_DOCUMENT } from '../../../constants/mutations';

// ------------- DnD Imports ---------------------- //
import { DropTarget } from 'react-dnd';
import Doc from '../Doc';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import { colors } from '../../../colorVariables';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { MenuItem } from '@material-ui/core';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background-color: #4a4550;
	min-width: 300px;
	min-height: 50px;
	position: relative;
	padding-bottom: 20px;
`;

const ContainerTitle = styled.div`
	position: absolute;
	text-align: center;
	height: 40px;
	width: 180px;
	top: -15px;
	left: 20px;
	background-color: #4a4550;
	/* background-color: #5a5560; */

	p {
		color: white;
		font-size: 18px;
		letter-spacing: 1px;
	}
`;

const Error = styled.p`
	color: white;
`;

const FormDiv = styled.div`
	width: 97%;
	display: flex;
	flex-direction: row-reverse;
`;

const SortForm = styled.form`
	height: 50px;
	margin-top: 20px;
	font-size: 16px;
	color: white;
`;

const StyledOutline = styled(OutlinedInput).attrs(() => ({
	labelWidth: 10
}))`
	height: 30px;
	border-radius: 5px;
`;

const StyledSelect = styled(Select)`
	background-color: rgb(143, 136, 150, 0.75);
	margin-left: 10px;
	color: ${colors.text};
`;

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		document: monitor.getItem()
	};
}

class DocumentContainer extends React.Component {
	updateDrop = (documentId, folderId, updateDocument) => {
		if (folderId === undefined) {
			// console.log(
			// 	'dropped in staging area from staging area; Nothing will happen'
			// );
		} else {
			updateDocument({
				variables: { id: documentId._id, folder: folderId._id },
				refetchQueries: [
					{
						query: query.FIND_DOCUMENTS_BY_TEAM,
						variables: { team: this.props.team }
					},
					{
						query: query.FIND_DOCUMENTS_BY_FOLDER,
						variables: { folder: folderId._id }
					}
				]
			});
		}
		// console.log('Document Update');
	};

	render() {
		const { connectDropTarget, hovered } = this.props;
		const backgroundColor = hovered ? 'lightgray' : '';

		return connectDropTarget(
			<div>
				<Container style={{ background: backgroundColor }}>
					<ContainerTitle>
						<p>DOCUMENTS</p>
					</ContainerTitle>
					<FormDiv>
						<SortForm>
							<label>
								Sort:
								<StyledSelect
									value={this.props.sortOption}
									onChange={this.props.sortChange}
									input={<StyledOutline name="Sort" />}
								>
									<MenuItem value="newest">Newest First</MenuItem>
									<MenuItem value="oldest">Oldest First</MenuItem>
								</StyledSelect>
							</label>
						</SortForm>
					</FormDiv>
					{/* Find all the documents  */}
					<Query
						query={query.FIND_DOCUMENTS_BY_TEAM}
						variables={{ team: this.props.team }}
					>
						{({ loading, error, data: { findDocumentsByTeam } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return console.error(error);

							if (findDocumentsByTeam && findDocumentsByTeam.length > 0) {
								switch (this.props.sortOption) {
									case 'newest':
										findDocumentsByTeam.sort((a, b) => {
											if (a.createdAt < b.createdAt) return 1;
											if (a.createdAt > b.createdAt) return -1;
											return 0;
										});
										break;
									case 'oldest':
										findDocumentsByTeam.sort((a, b) => {
											if (a.createdAt < b.createdAt) return -1;
											if (a.createdAt > b.createdAt) return 1;
											return 0;
										});
										break;
									default:
										break;
								}

								return findDocumentsByTeam
									.filter(doc => doc.folder === null)
									.map(doc => {
										return (
											<Mutation mutation={UPDATE_DOCUMENT} key={doc._id}>
												{updateDocument => (
													<div
														onClick={() => this.props.toggleDocumentDetail(doc)}
													>
														<Doc
															document={doc}
															noFolder
															handleDrop={(id, folderId, update) =>
																this.updateDrop(id, folderId, update)
															}
															update={updateDocument}
														/>
													</div>
												)}
											</Mutation>
										);
									});
							} else {
								return <Error>No documents yet, trying adding some. </Error>;
							}
						}}
					</Query>
				</Container>
			</div>
		);
	}
}

const target = {
	drop(props) {
		const { folder } = props;
		return { folder };
	}
};

export default DropTarget('item', target, collect)(DocumentContainer);
