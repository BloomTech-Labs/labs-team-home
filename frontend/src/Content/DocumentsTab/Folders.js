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

const IndividualFolder = styled.p`
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

const Error = styled.p`
	color: white;
`;

class Folders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayButtons: false,
			currentFolder: null,
			folderDetailOpen: false
		};
	}

	toggleButtons = () => {
		this.setState({ displayButtons: !this.state.displayButtons });
	};

	toggleFolderDetail = dir => {
		this.setState(prevState => ({
			folderDetailOpen: !prevState.folderDetailOpen,
			currentFolder: dir
		}));
	};
	render() {
		return (
			<FolderContainer>
				{/* All the Modals */}
				<FolderDetails
					open={this.state.folderDetailOpen}
					hideModal={() => this.toggleFolderDetail(null)}
					folder={this.state.currentFolder}
					currentUser={this.props.currentUser}
					team={this.props.team._id}
				/>
				{/* All the Folders */}
				<Query
					query={query.FIND_FOLDERS_BY_TEAM}
					variables={{ team: this.props.team._id }}
				>
					{({ loading, error, data: { findFoldersByTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return console.error(error);
						if (findFoldersByTeam && findFoldersByTeam.length > 0) {
							return findFoldersByTeam.map(folder => (
								<Droppable>
									<IndividualFolder
										key={folder._id}
										folder={folder}
										onClick={() => this.toggleFolderDetail(folder)}
									>
										{folder.title}
										{folder.documents.length ? (
											folder.documents.map(doc => {
												return <p>{doc.title}</p>;
											})
										) : (
											<></>
										)}
									</IndividualFolder>
								</Droppable>
							));
						} else {
							return <Error>No Folders Available For This Team</Error>;
						}
					}}
				</Query>
			</FolderContainer>
		);
	}
}

export default Folders;
