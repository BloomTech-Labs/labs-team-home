import React from 'react';
import PropTypes from 'prop-types';

export default class Droppable extends React.Component {
	drop = e => {
		e.preventDefault();
		const data = e.dataTransfer.getData('transfer');
		e.target.appendChild(document.getElementById(data));
	};

	allowDrop = e => {
		e.preventDefault();
	};

	render() {
		return (
			<div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop}>
				{this.props.children}
			</div>
		);
	}
}

Droppable.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node
};
