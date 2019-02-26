import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { updateDocument } from '../../../mutations/documents';

class Droppable extends React.Component {
	drop = e => {
		e.preventDefault();
		const data = e.dataTransfer.getData('transfer');
		e.target.appendChild(document.getElementById(data));
		console.log('dragging  ->  ' + data);
		if (this.props.folder !== null) {
			console.log('dropped  ->  ' + this.props.folder._id);
			this.props.updateDocument({ id: data, folder: this.props.folder._id });
		} else {
			console.log('droppped  ->  ' + this.props.folder);
			this.props.updateDocument({ id: data, folder: this.props.folder });
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

export default compose(updateDocument)(Droppable);

Droppable.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node
};
