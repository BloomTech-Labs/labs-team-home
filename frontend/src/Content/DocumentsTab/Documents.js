import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import * as query from '../../constants/queries';
import Draggable from './DnD/Draggable';
import Droppable from './DnD/Droppable';
import DocumentDetails from './DocumentDetails';

const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	background-color: #4a4550;
	min-width: 300px;
	min-height: 50px;
`;

const IndividualDocument = styled.p`
	color: white;
	margin: 10px;
	padding: 10px;
	border: 2px solid white;
`;
const Error = styled.p`
	color: white;
`;

const FormDiv = styled.div`
	width: 92%;
	display: flex;
	flex-direction: row-reverse;
`;

const SortForm = styled.form`
	height: 50px;
	label {
		color: white;
		font-size: 20px;
	}
	select {
		margin-left: 10px;
	}
	option {
		height: 50px;
	}
`;

class Documents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDocument: null,
			documentDetailOpen: false,
			sortOption: 'newest'
		};
	}

	toggleDocumentDetail = doc => {
		this.setState(prevState => ({
			documentDetailOpen: !prevState.documentDetailOpen,
			currentDocument: doc
		}));
	};

	sortChange = e => {
		this.setState({ sortOption: e.target.value });
	};

	render() {
		// console.log('props: ', this.props);
		return (
			<Droppable folder={null} team={this.props.team._id}>
				<Container>
					<FormDiv>
						<SortForm>
							<label>
								Folder Sort:
								<select
									value={this.state.sortOption}
									onChange={this.sortChange}
								>
									<option value="newest">Newest First</option>
									<option value="oldest">Oldest First</option>
								</select>
							</label>
						</SortForm>
					</FormDiv>
					{/* Find all the documents  */}
					<Query
						query={query.FIND_DOCUMENTS_BY_TEAM}
						variables={{ team: this.props.team._id }}
					>
						{({ loading, error, data: { findDocumentsByTeam } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return console.error(error);
							if (findDocumentsByTeam && findDocumentsByTeam.length > 0) {
								switch (this.state.sortOption) {
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
											<Draggable id={doc._id} key={doc._id}>
												<IndividualDocument
													document={doc}
													onClick={() => this.toggleDocumentDetail(doc)}
												>
													<p>{doc.title}</p>
													<p>{doc.tag ? doc.tag.name : 'no tag lol'}</p>
												</IndividualDocument>
											</Draggable>
										);
									});
							} else {
								return <Error>No Documents Available For This Team</Error>;
							}
						}}
					</Query>
					{/* All the Modals */}
					<DocumentDetails
						open={this.state.documentDetailOpen}
						hideModal={() => this.toggleDocumentDetail(null)}
						document={this.state.currentDocument}
						currentUser={this.props.currentUser}
						team={this.props.team._id}
					/>
				</Container>
			</Droppable>
		);
	}
}

export default Documents;
