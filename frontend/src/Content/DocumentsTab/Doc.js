import React from 'react';
import styled from 'styled-components';
import { DragSource } from 'react-dnd';

const IndividualDocument = styled.p`
	color: white;
	margin: 10px;
	padding: 10px;
	border: 2px solid white;
`;

const docSource = {
	beginDrag(props) {
		return props.document;
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}

		// console.log("endDrag : ",props)
		// console.log("dropResult : ", dropResult.listId)
		return props.handleDrop(props.document._id);
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	};
}

class Doc extends React.Component {
	render() {
		const { isDragging, connectDragSource, document, folder } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(
			<div>
				<IndividualDocument style={{ opacity }}>
					{document.title}
				</IndividualDocument>
			</div>
		);
	}
}

export default DragSource('item', docSource, collect)(Doc);
