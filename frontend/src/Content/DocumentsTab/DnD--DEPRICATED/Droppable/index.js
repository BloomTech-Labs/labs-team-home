import React from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'react-apollo';
// import { updateDocument } from '../../../mutations/documents';
// import { updateFolder } from '../../../mutations/folders';

class Droppable extends React.Component {
	constructor(props) {
		super(props);
	}

	drop = e => {
		e.preventDefault();
		const data = e.dataTransfer.getData('transfer');

		e.target.appendChild(document.getElementById(data));

		console.log(this.props.folder);

		if (this.props.folder !== null) {
			this.props.updateDocument({
				id: data,
				folder: this.props.folder._id
			});
			this.props.updateFolder({ id: this.props.folder._id });
		} else {
			this.props.updateDocument({ id: data, folder: this.props.folder });
			// this.props.updateFolder({id: this.props.folder._id});
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

export default compose(
	updateDocument,
	updateFolder
)(Droppable);

Droppable.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node
};
