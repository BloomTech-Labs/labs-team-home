import React, { Component } from 'react';

// ------------- gql Imports ---------------------- //
import { Query } from 'react-apollo';
import * as query from '../../../constants/queries';

// ------------- Component Imports ---------------------- //
import FolderDetails from './FolderDetails';
import Folder from './Folder';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';

const FolderContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 10px;
	padding-bottom: 20px;
	border: 2px solid #4a4550;
	position: relative;
`;

const ContainerTitle = styled.div`
	position: absolute;
	width: 150px;
	height: 40px;
	text-align: center;
	top: -15px;
	left: 20px;
	background-color: #5a5560;

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
	width: 95%;
	display: flex;
	flex-direction: row-reverse;
`;

const SortForm = styled.form`
	height: 50px;
	margin-top: 15px;
	label {
		color: white;
	}
	select {
		margin-left: 10px;
	}
	option {
		height: 25px;
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
				<ContainerTitle>
					<p>FOLDERS</p>
				</ContainerTitle>
				<FormDiv>
					<SortForm>
						<label>
							Sort:
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
											<div onClick={() => this.toggleFolderDetail(folder)}>
												<Folder
													folder={folder}
													findDocumentsByFolder={findDocumentsByFolder}
													team={this.props.team._id}
												/>
											</div>
										);
									}}
								</Query>
							));
						} else {
							return <Error>Get organized by adding some folders!</Error>;
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
				/>
			</FolderContainer>
		);
	}
}

export default Folders;
