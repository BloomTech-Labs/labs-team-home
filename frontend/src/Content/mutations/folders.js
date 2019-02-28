import { graphql } from 'react-apollo';
import * as query from '../../constants/queries';
import {
	ADD_FOLDER,
	DELETE_FOLDER,
	UPDATE_FOLDER
} from '../../constants/mutations';

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

///////////

const deleteFolderOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		deleteFolder: input =>
			mutate({
				variables: input,
				update: (cache, { data: { deleteFolder } }) => {
					const { findFoldersByTeam } = cache.readQuery({
						query: query.FIND_FOLDERS_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_FOLDERS_BY_TEAM,
						variables: { team: team },
						data: {
							findFoldersByTeam: findFoldersByTeam.filter(
								({ _id }) => _id !== deleteFolder._id
							)
						}
					});
				}
			})
	})
};

export const deleteFolder = graphql(DELETE_FOLDER, deleteFolderOptions);

////////// Update Folder

const updateFolderOptions = {
	props: ({ ownProps: { team }, mutate }) => ({
		updateFolder: input =>
			mutate({
				variables: input,
				update: (cache, { data: { updateFolder } }) => {
					const { findFoldersByTeam } = cache.readQuery({
						query: query.FIND_FOLDERS_BY_TEAM,
						variables: { team: team }
					});
					cache.writeQuery({
						query: query.FIND_FOLDERS_BY_TEAM,
						variables: { team: team },
						data: {
							findFoldersByTeam: findFoldersByTeam.map(folder =>
								folder._id === updateFolder._id ? updateFolder : folder
							)
						}
					});
				}
			})
	})
};

export const updateFolder = graphql(UPDATE_FOLDER, updateFolderOptions);
