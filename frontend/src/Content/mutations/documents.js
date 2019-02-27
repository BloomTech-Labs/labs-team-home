import { graphql } from 'react-apollo';
import * as query from '../../constants/queries';
import {
	ADD_DOCUMENT,
	DELETE_DOCUMENT,
	UPDATE_DOCUMENT
} from '../../constants/mutations';

const addDocumentOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		addDocument: input =>
			mutate({
				variables: input,
				update: (cache, { data: { addDocument } }) => {
					const { findDocumentsByTeam } = cache.readQuery({
						query: query.FIND_DOCUMENTS_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_DOCUMENTS_BY_TEAM,
						variables: { team: team },
						data: { findDocumentsByTeam: [addDocument, ...findDocumentsByTeam] }
					});
				}
			})
	})
};

export const addDocument = graphql(ADD_DOCUMENT, addDocumentOptions);

/////////

const deleteDocumentOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		deleteDocument: input =>
			mutate({
				variables: input,
				update: (cache, { data: { deleteDocument } }) => {
					const { findDocumentsByTeam } = cache.readQuery({
						query: query.FIND_DOCUMENTS_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_DOCUMENTS_BY_TEAM,
						variables: { team: team },
						data: {
							findDocumentsByTeam: findDocumentsByTeam.filter(
								({ _id }) => _id !== deleteDocument._id
							)
						}
					});
				}
			})
	})
};

export const deleteDocument = graphql(DELETE_DOCUMENT, deleteDocumentOptions);

/////////

const updateDocumentOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		updateDocument: input => {
			// console.log('input from updateDocument: ', input, 'team: ', team);
			return mutate({
				variables: input,
				update: (cache, { data: { updateDocument } }) => {
					const { findDocumentsByTeam } = cache.readQuery({
						query: query.FIND_DOCUMENTS_BY_TEAM,
						variables: { team: team }
					});
					// console.log('Cache after query: ', cache);
					cache.writeQuery({
						query: query.FIND_DOCUMENTS_BY_TEAM,
						variables: { team: team },
						data: {
							findDocumentsByTeam: findDocumentsByTeam.map(document => {
								// console.log('document from mutator: ', document);
								// console.log('updateDocument from mutator: ', updateDocument);

								return document._id ===
									(updateDocument === null ? null : updateDocument._id)
									? updateDocument
									: document;
							})
						}
					});
				}
			});
		}
	})
};

export const updateDocument = graphql(UPDATE_DOCUMENT, updateDocumentOptions);
