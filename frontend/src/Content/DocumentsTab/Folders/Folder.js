import React from 'react';

// ------------- gql Imports ---------------------- //
import * as query from '../../../constants/queries';
import { Mutation } from 'react-apollo';
import { UPDATE_DOCUMENT } from '../../../constants/mutations';

// ------------- DnD Imports ---------------------- //
import { DropTarget } from 'react-dnd';
import Doc from '../Doc';

// ------------- Styled Imports ---------------------- //
import styled from 'styled-components';

const IndividualFolder = styled.div`
	height: 200px;
	width: 300px;
	background-color: #a9a4b0;
	text-align: center;
	padding: 40px 10px 10px 10px;
	border: 2px solid white;
	border-radius: 5px;
	margin: 10px;
	cursor: pointer;
	clip-path: polygon(
		0% 0%,
		25% 0%,
		30% 10%,
		100% 10%,
		99% 10%,
		100% 11%,
		100% 100%,
		0% 100%
	);

	p {
		margin: 0;
	}
`;

const DocumentDiv = styled.div`
	height: 90%;
	width: 279px;
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: white;
	}
`;

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		document: monitor.getItem()
	};
}

class Folder extends React.Component {
	constructor() {
		super();
		this.state = {
			refresh: false
		};
	}

	updateDrop = (id, folderid, updateDocument) => {
		if (folderid !== undefined) {
			// console.log('UpdateDrop-Folder, folderID not available: ', folderid);
			updateDocument({
				variables: {
					id: id._id,
					folder: folderid._id,
					previous: this.props.folder._id
				},
				refetchQueries: [
					{
						query: query.FIND_DOCUMENTS_BY_TEAM,
						variables: { team: this.props.team }
					},
					{
						query: query.FIND_DOCUMENTS_BY_FOLDER,
						variables: { folder: folderid._id }
					},
					{
						query: query.FIND_DOCUMENTS_BY_FOLDER,
						variables: { folder: this.props.folder._id }
					}
				]
			});
		} else {
			// console.log('UpdateDrop-Folder, folderID available: ', folderid)
			updateDocument({
				variables: {
					id: id._id,
					folder: null,
					previous: this.props.folder._id
				},
				refetchQueries: [
					{
						query: query.FIND_DOCUMENTS_BY_TEAM,
						variables: { team: this.props.team }
					},
					{
						query: query.FIND_DOCUMENTS_BY_FOLDER,
						variables: { folder: this.props.folder._id }
					}
				]
			});
		}
		// console.log('Folder Update');
	};

	render() {
		const { connectDropTarget, hovered, folder } = this.props;
		const backgroundColor = hovered ? 'lightgray' : '';
		// console.log("FOLDER PROPS: ", this.props)

		return connectDropTarget(
			<div>
				<IndividualFolder style={{ background: backgroundColor }}>
					<p>
						{folder.title.length > 18
							? `${folder.title.substring(0, 18)}...`
							: folder.title}
					</p>
					<DocumentDiv>
						{this.props.findDocumentsByFolder.length ? (
							this.props.findDocumentsByFolder.map(doc => {
								return (
									<Mutation mutation={UPDATE_DOCUMENT} key={doc._id}>
										{updateDocument => (
											<Doc
												document={doc}
												handleDrop={(id, folderId, update) =>
													this.updateDrop(id, folderId, update)
												}
												update={updateDocument}
											/>
										)}
									</Mutation>
								);
							})
						) : (
							<></>
						)}
					</DocumentDiv>
				</IndividualFolder>
			</div>
		);
	}
}

const target = {
	drop(props) {
		const { folder } = props;
		return { folder };
	}
};

export default DropTarget('item', target, collect)(Folder);
