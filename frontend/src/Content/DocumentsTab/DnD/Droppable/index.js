import React from 'react';
import PropTypes from 'prop-types';
import { updateDocument } from '../../../mutations/documents';

export default class Droppable extends React.Component {
	drop = e => {
		e.preventDefault();
		const data = e.dataTransfer.getData('transfer');
		e.target.appendChild(document.getElementById(data));
		console.log('dragging  ->  ' + data);
		if (this.props.folder !== 'one') {
			console.log('dropped  ->  ' + this.props.folder._id);
			updateDocument({ id: data, folder: this.props.folder._id });
		} else {
			console.log('droppped  ->  ' + this.props.folder);
			updateDocument({ id: data, folder: this.props.folder });
		}
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
