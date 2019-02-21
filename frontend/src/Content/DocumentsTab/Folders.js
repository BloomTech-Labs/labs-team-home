import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import * as query from '../../constants/queries';

const FolderContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const IndividualFolder = styled.p`
	min-height: 200px;
	color: black;
	background-color: white;
	text-align: center;
	padding: 40px 10px 10px 10px;
	border: 1px solid white;
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
`;

class Folders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayButtons: false
		};
	}

	toggleButtons = () => {
		this.setState({ displayButtons: !this.state.displayButtons });
	};

	render() {
		return (
			<FolderContainer>
				<Query
					query={query.FIND_FOLDERS_BY_TEAM}
					variables={{ team: this.props.team._id }}
				>
					{({ loading, error, data: { findFoldersByTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return console.error(error);
						if (findFoldersByTeam && findFoldersByTeam.length > 0) {
							return findFoldersByTeam.map(folder => (
								<IndividualFolder key={folder._id}>
									{folder.title}
								</IndividualFolder>
							));
						} else {
							return <p>No Documents Available For This Team</p>;
						}
					}}
				</Query>
			</FolderContainer>
		);
	}
}

export default Folders;
