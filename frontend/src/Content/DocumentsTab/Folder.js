import React from 'react';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';
import Doc from './Doc';
import { compose } from 'react-apollo';
import { updateDocument } from '../mutations/documents';

const IndividualFolder = styled.div`
	min-height: 200px;
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

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		document: monitor.getItem()
	};
}

var folderId;

class Folder extends React.Component {
	constructor() {
		super();
		this.state = {
			refresh: false
		};
	}
	updateDrop = id => {
		console.log('DOC : ', id);
		console.log('FOLDER : ', folderId);

		this.props.updateDocument({ id: id, folder: folderId });
		this.setState({
			refresh: !this.state.refresh
		});
		this.props.folderFetch();
		this.props.fetch();
		this.props.resetComp(id);
		// console.log(this.state.refresh)
		console.log('Folder Update');
	};

	render() {
		const { connectDropTarget, hovered, folder } = this.props;
		const backgroundColor = hovered ? 'lightgray' : '';
		if (hovered) {
			folderId = folder._id;
			console.log(folderId);
		}
		return connectDropTarget(
			<div>
				<IndividualFolder style={{ background: backgroundColor }}>
					{folder.title}
					{this.props.findDocumentsByFolder.length ? (
						this.props.findDocumentsByFolder.map(doc => {
							return (
								<Doc
									key={doc._id}
									document={doc}
									handleDrop={id => this.updateDrop(id)}
								/>
							);
						})
					) : (
						<></>
					)}
				</IndividualFolder>
			</div>
		);
	}
}

export default compose(
	DropTarget('item', {}, collect),
	updateDocument
)(Folder);
