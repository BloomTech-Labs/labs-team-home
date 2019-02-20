import React, { Component } from 'react';
import { Query } from 'react-apollo';
import * as query from '../../constants/queries';
import { addFolder } from '../mutations/folders';
import styled from 'styled-components';

const Container = styled.div`
	width: 80%;
	border: 1px solid white;
	margin: 0 auto;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;

	p {
		color: white;
		text-align: center;
		padding: 10px;
		border: 1px solid white;
		margin: 10px;
	}
`;

class Folders extends Component {
	render() {
		return (
			<Container>
				<Query
					query={query.FIND_FOLDERS_BY_TEAM}
					variables={{ team: this.props.team._id }}
				>
					{({ loading, error, data: { findFoldersByTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return console.error(error);
						if (findFoldersByTeam && findFoldersByTeam.length > 0) {
							return findFoldersByTeam.map(folder => (
								<p key={folder._id}>{folder.title}</p>
							));
						} else {
							return <p>No Documents Available For This Team</p>;
						}
					}}
				</Query>
			</Container>
		);
	}
}

export default Folders;
