import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import * as query from '../../constants/queries';
import FolderDetails from './FolderDetails';
import Folder from './Folder';
import { compose } from 'react-apollo';
import { updateDocument } from '../mutations/documents';

const FolderContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
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
			sortOption: 'newest',
			latestFolderDropId: null
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

	resetComponent = id => {
		this.setState({
			latestFolderDropId: id
		});
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
					notifyOnNetworkStatusChange
				>
					{({
						loading,
						error,
						data: { findFoldersByTeam },
						refetch,
						networkStatus
					}) => {
						// console.log('returned from findFoldersByTeam', findFoldersByTeam);
						if (networkStatus === 4) return 'Folder Loading';
						if (loading) return <p>Loading...</p>;
						if (error) return console.error(error);
						if (findFoldersByTeam && findFoldersByTeam.length > 0) {
							const folderFetch = refetch;
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
									notifyOnNetworkStatusChange
								>
									{({
										loading,
										error,
										data: { findDocumentsByFolder },
										refetch,
										networkStatus
									}) => {
										if (networkStatus === 4) return 'Doc Loading';
										if (loading) return <p>Loading...</p>;
										if (error) return console.error(error);
										const DocFetch = refetch;
										return (
											<div onClick={() => this.toggleFolderDetail(folder)}>
												<Folder
													folder={folder}
													upd={this.docDropped}
													findDocumentsByFolder={findDocumentsByFolder}
													team={this.props.team._id}
													fetch={DocFetch}
													folderFetch={folderFetch}
													resetComp={this.resetComponent}
												/>
											</div>
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

// export default compose(
// 	DragDropContext(HTML5Backend),
// 	updateDocument
// )(Folders);

export default Folders;
