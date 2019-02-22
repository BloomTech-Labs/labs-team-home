import React from 'react';
import Draggable from '../Draggable';
import Droppable from '../Droppable';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 100%;
	padding: 32px;
	display: flex;
	justify-content: center;
`;

const Item = styled.div`
	padding: 8px;
	color: #555;
	background-color: white;
	border-radius: 3px;
`;

const droppableStyle = {
	backgroundColor: '#555',
	width: '250px',
	height: '400px',
	margin: '32px'
};

export default class DnDTest extends React.Component {
	render() {
		return (
			<Wrapper>
				<Droppable id="dr1" style={droppableStyle}>
					<Draggable id="item1">
						<Item>Some Text1</Item>
					</Draggable>
					<Draggable id="item2">
						<Item>Some Text2</Item>
					</Draggable>
					<Draggable id="item3">
						<Item>Some Text3</Item>
					</Draggable>
				</Droppable>
				<Droppable id="dr2" style={droppableStyle} />
			</Wrapper>
		);
	}
}
