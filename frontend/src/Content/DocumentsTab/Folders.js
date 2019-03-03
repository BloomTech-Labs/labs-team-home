import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import * as query from '../../constants/queries';
import FolderDetails from './FolderDetails';
import Droppable from './DnD/Droppable';
import Draggable from './DnD/Draggable';

const FolderContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const IndividualFolder = styled.div`
	min-height: 200px;
	color: black;
	background-color: #a9a4b0;
	text-align: center;
	padding: 40px 10px 10px 10px;
	border: 2px solid white;
	border-radius: 5px;
	margin: 10px;
	clip-path: polygon(
		0% 0%,
		45% 0%,
		55% 10%,
		100% 10%,
		99% 10%,
		100% 11%,
		100% 100%,
		0% 100%
	);

	cursor: pointer;
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

class Folders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentFolder: null,
			folderDetailOpen: false,
			sortOption: 'newest'
		};
	}

	toggleFolderDetail = dir => {
		this.setState(prevState => ({
			folderDetailOpen: !prevState.folderDetailOpen,
			currentFolder: dir
		}));
	};

	sortChange = e => {
		this.setState({ sortOption: e.target.value });
	};

	render() {
		// console.log('props from folder: ', this.props);
		return (
			<FolderContainer>
				<FormDiv>
					<SortForm>
						<label>
							Folder Sort:
							<select value={this.state.sortOption} onChange={this.sortChange}>
								<option value="newest">Newest First</option>
								<option value="oldest">Oldest First</option>
							</select>
						</label>
					</SortForm>
				</FormDiv>
				{/* All the Folders */}
				<Query
					query={query.FIND_FOLDERS_BY_TEAM}
					variables={{ team: this.props.team._id }}
				>
					{({ loading, error, data: { findFoldersByTeam } }) => {
						// console.log('returned from findFoldersByTeam', findFoldersByTeam);
						if (loading) return <p>Loading...</p>;
						if (error) return console.error(error);
						if (findFoldersByTeam && findFoldersByTeam.length > 0) {
							switch (this.state.sortOption) {
								case 'newest':
									findFoldersByTeam.sort((a, b) => {
										if (a.createdAt < b.createdAt) return 1;
										if (a.createdAt > b.createdAt) return -1;
										return 0;
									});
									break;
								case 'oldest':
									findFoldersByTeam.sort((a, b) => {
										if (a.createdAt < b.createdAt) return -1;
										if (a.createdAt > b.createdAt) return 1;
										return 0;
									});
									break;
								default:
									break;
							}
							return findFoldersByTeam.map(folder => (
								<Query
									query={query.FIND_DOCUMENTS_BY_FOLDER}
									variables={{ folder: folder._id }}
									key={folder._id}
								>
									{({ loading, error, data: { findDocumentsByFolder } }) => {
										if (loading) return <p>Loading...</p>;
										if (error) return console.error(error);
										return (
											<Droppable
												folder={folder}
												team={this.props.team._id}
												// triggerUpdateState={this.triggerUpdateState}
											>
												<IndividualFolder
													folder={folder}
													onClick={e => {
														e.stopPropagation();
														this.toggleFolderDetail(folder);
													}}
													mouseEnter={e => {
														e.stopPropagation();
														alert('you gone done goofed');
													}}
												>
													{folder.title}
													{findDocumentsByFolder.length ? (
														findDocumentsByFolder.map(doc => {
															return (
																<Draggable id={doc._id} key={doc._id}>
																	<IndividualDocument
																	// updateState={this.state.updateState}
																	>
																		{doc.title}
																	</IndividualDocument>
																</Draggable>
															);
														})
													) : (
														<></>
													)}
												</IndividualFolder>
											</Droppable>
										);
									}}
								</Query>
							));
						} else {
							return <Error>No Folders Available For This Team</Error>;
						}
					}}
				</Query>
				{/* All the Modals */}
				<FolderDetails
					open={this.state.folderDetailOpen}
					hideModal={() => this.toggleFolderDetail(null)}
					folder={this.state.currentFolder}
					currentUser={this.props.currentUser}
					team={this.props.team._id}
					// updateState={this.state.updateState}
				/>
			</FolderContainer>
		);
	}
}

export default Folders;
