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

class Documents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDocument: null,
			documentDetailOpen: false
		};
	}

	toggleDocumentDetail = doc => {
		this.setState(prevState => ({
			documentDetailOpen: !prevState.documentDetailOpen,
			currentDocument: doc
		}));
	};

	render() {
		return (
			<Droppable folder={null}>
				<Container>
					{/* Find all the documents  */}
					<Query
						query={query.FIND_DOCUMENTS_BY_TEAM}
						variables={{ team: this.props.team._id }}
					>
						{({ loading, error, data: { findDocumentsByTeam } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return console.error(error);
							if (findDocumentsByTeam && findDocumentsByTeam.length > 0) {
								return findDocumentsByTeam
									.filter(doc => doc.folder === null)
									.map(doc => {
										console.log(doc.folder);
										return (
											<Draggable id={doc._id} key={doc._id}>
												<IndividualDocument
													document={doc}
													onClick={() => this.toggleDocumentDetail(doc)}
												>
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
