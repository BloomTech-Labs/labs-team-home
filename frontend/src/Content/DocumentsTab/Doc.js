import React from 'react';
import styled from 'styled-components';
import { DragSource } from 'react-dnd';
import { KeyboardArrowRight } from 'styled-icons/material/KeyboardArrowRight';

const IndividualDocument = styled.div`
	color: white;
	margin: 10px;
	padding: 10px;
	height: ${props => (props.noFolder ? 'auto' : '50px')};
	width: ${props => (props.noFolder ? 'auto' : '130px')};
	border: 2px solid white;
	border-radius: 5px;
	display: ${props => (props.noFolder ? 'block' : 'flex')};
	align-items: ${props => (props.noFolder ? 'center' : 'start')};
	cursor: pointer;
	white-space: ${props => (props.noFolder ? 'normal' : 'nowrap')};
	overflow: ${props => (props.noFolder ? 'auto' : 'hidden')};
	text-overflow: ellipsis;
`;

const Arrow = styled(KeyboardArrowRight)`
	height: 25px;
	margin-left: 10px;
`;

const docSource = {
	beginDrag(props) {
		return props.document;
	},
	endDrag(props, monitor, component) {
		if (!monitor.didDrop()) {
			return;
		}
		const dropResult = monitor.getDropResult();
		// console.log('dropResult: ', dropResult);
		return props.handleDrop(props.document, dropResult.folder, props.update);
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
		const { isDragging, connectDragSource, document } = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(
			<div>
				<IndividualDocument noFolder={this.props.noFolder} style={{ opacity }}>
					{document.title.length > 11 && !this.props.noFolder
						? `${document.title.substring(0, 11)}...`
						: document.title}
					{this.props.noFolder ? <Arrow /> : <></>}
				</IndividualDocument>
			</div>
		);
	}
}

export default DragSource('item', docSource, collect)(Doc);
