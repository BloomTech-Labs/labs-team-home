import { graphql } from 'react-apollo';
import * as query from '../../constants/queries';
import { ADD_FOLDER } from '../../constants/mutations';

const addFolderOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		addFolder: input =>
			mutate({
				variables: input,
				update: (cache, { data: { addFolder } }) => {
					const { findFoldersByTeam } = cache.readQuery({
						query: query.FIND_FOLDERS_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_FOLDERS_BY_TEAM,
						variables: { team: team },
						data: { findFoldersByTeam: [addFolder, ...findFoldersByTeam] }
					});
				}
			})
	})
};

export const addFolder = graphql(ADD_FOLDER, addFolderOptions);
