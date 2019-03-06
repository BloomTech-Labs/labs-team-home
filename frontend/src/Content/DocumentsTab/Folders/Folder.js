import React from 'react';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';
import Doc from '../Doc';
import { compose } from 'react-apollo';
import { updateDocument } from '../../mutations/documents';

const IndividualFolder = styled.div`
	height: 200px;
	width: 175px;
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

const DocumentDiv = styled.div`
	height: 90%;
	width: 159px;
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

	updateDrop = (id, folderid) => {
		// console.log('DOC : ', id);
		// console.log('FOLDER : ', folderid._id);
		// console.log("folder team id: ", this.props.team)
		// console.log('previous folder: ', this.props.folder._id)

		if (folderid !== undefined) {
			console.log('UpdateDrop-Folder, folderID not available: ', folderid);
			this.props.updateDocument({
				id: id._id,
				folder: folderid._id,
				previous: this.props.folder._id
			});
		} else {
			// console.log('UpdateDrop-Folder, folderID available: ', folderid)
			this.props.updateDocument({
				id: id._id,
				folder: null,
				previous: this.props.folder._id
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
					{folder.title.length > 18
						? `${folder.title.substring(0, 18)}...`
						: folder.title}
					<DocumentDiv>
						{this.props.findDocumentsByFolder.length ? (
							this.props.findDocumentsByFolder.map(doc => {
								return (
									<Doc
										key={doc._id}
										document={doc}
										handleDrop={(id, folderId) => this.updateDrop(id, folderId)}
									/>
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

export default compose(
	DropTarget('item', target, collect),
	updateDocument
)(Folder);
