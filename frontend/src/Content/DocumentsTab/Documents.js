import React, { Component } from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import * as query from '../../constants/queries';
import Draggable from './DnD/Draggable';
import Droppable from './DnD/Droppable';

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

class Documents extends Component {
	render() {
		return (
			<Droppable>
				<Container>
					<Query
						query={query.FIND_DOCUMENTS_BY_TEAM}
						variables={{ team: this.props.team._id }}
					>
						{({ loading, error, data: { findDocumentsByTeam } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return console.error(error);
							if (findDocumentsByTeam && findDocumentsByTeam.length > 0) {
								return findDocumentsByTeam.map(doc => {
									return (
										<Draggable id={`${doc._id}`}>
											<IndividualDocument key={doc._id}>
												{doc.title}
											</IndividualDocument>
										</Draggable>
									);
								});
							} else {
								return <Error>No Documents Available For This Team</Error>;
							}
						}}
					</Query>
				</Container>
			</Droppable>
		);
	}
}

export default Documents;
