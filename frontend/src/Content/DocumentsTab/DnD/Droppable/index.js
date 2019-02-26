import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
import { updateDocument } from '../../../mutations/documents';

class Droppable extends React.Component {
	drop = e => {
		e.preventDefault();
		const data = e.dataTransfer.getData('transfer');
		e.target.appendChild(document.getElementById(data));
		console.log('after doc is dropped --> ' + this.props.folder);
		if (this.props.folder._id !== 'one') {
			console.log(
				'docID -> ' + data + '   -- folderID -> ' + this.props.folder._id
			);
			this.props.updateDocument({ id: data, folder: this.props.folder._id });
		} else {
			console.log(
				'docID -> ' + data + '   -- folderID -> ' + this.props.folder
			);
			// updateDocument({id: data, folder: 'one'});
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
