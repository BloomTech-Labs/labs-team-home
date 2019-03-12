import React, { Component } from 'react';

// ------------- Component Imports ---------------------- //
import DocumentDetails from './DocumentDetails';
import DocContainer from './DocumentContainer';

class Documents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDocument: null,
			documentDetailOpen: false,
			sortOption: 'newest'
		};
	}

	toggleDocumentDetail = doc => {
		this.setState(prevState => ({
			documentDetailOpen: !prevState.documentDetailOpen,
			currentDocument: doc
		}));
	};

	sortChange = e => {
		this.setState({ sortOption: e.target.value });
	};

	render() {
		return (
			<div>
				<div>
					<DocContainer
						toggleDocumentDetail={this.toggleDocumentDetail}
						team={this.props.team._id}
						sortOption={this.state.sortOption}
						sortChange={this.sortChange}
					/>
				</div>
				<DocumentDetails
					open={this.state.documentDetailOpen}
					hideModal={() => this.toggleDocumentDetail(null)}
					document={this.state.currentDocument}
					currentUser={this.props.currentUser}
					team={this.props.team._id}
				/>
			</div>
		);
	}
}

export default Documents;
