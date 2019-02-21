import { graphql } from 'react-apollo';
import * as query from '../../constants/queries';
import { ADD_DOCUMENT } from '../../constants/mutations';

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
