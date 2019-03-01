import React from 'react';
import { Query } from 'react-apollo';
import * as query from '../../constants/queries';
import Activity from './Activity';

export default class ActivityTimeline extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			team: props.team
		};
	}

	render() {
		let allTheThings = [];
		/* These Bools make sure that everything is loaded before mapping over all items in
		 allTheThings and returning Activity components */
		let messagesLoaded = false;
		let documentsLoaded = false;
		let foldersLoaded = false;
		let msgCommentsLoaded = false;
		let docCommentsLoaded = false;

		return (
			<div>
				{/* Queries for Messages and Messages' Comments */}
				<Query
					query={query.FIND_MESSAGES_BY_TEAM}
					variables={{ team: this.state.team._id }}
				>
					{({ loading, error, data: { findMessagesByTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error!</p>;
						if (findMessagesByTeam.length > 0) {
							findMessagesByTeam.forEach(message => {
								if (!allTheThings.includes(message)) {
									allTheThings.push(message);
								}
							});
						}
						messagesLoaded = true;
						return findMessagesByTeam.map(message => (
							<Query
								query={query.FIND_COMMENTS_BY_MESSAGE}
								variables={{ message: message._id }}
								key={message._id}
							>
								{({ loading, error, data: { findMsgCommentsByMessage } }) => {
									if (loading) return <p>Loading...</p>;
									if (error) return <p>Error!</p>;
									if (findMsgCommentsByMessage) {
										findMsgCommentsByMessage.forEach(comment =>
											allTheThings.push(comment)
										);
										msgCommentsLoaded = true;
									}
									return <></>;
								}}
							</Query>
						));
						//return <></>;
					}}
				</Query>
				{/* Queries for Documents and Documents' Comments */}
				<Query
					query={query.FIND_DOCUMENTS_BY_TEAM}
					variables={{ team: this.state.team._id }}
				>
					{({ loading, error, data: { findDocumentsByTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error!</p>;
						if (findDocumentsByTeam.length > 0) {
							findDocumentsByTeam.forEach(document => {
								if (!allTheThings.includes(document)) {
									allTheThings.push(document);
								}
							});
						}
						documentsLoaded = true;
						return findDocumentsByTeam.map(document => (
							<Query
								query={query.FIND_COMMENTS_BY_DOCUMENT}
								variables={{ document: document._id }}
								key={document._id}
							>
								{({ loading, error, data: { findDocCommentsByDocument } }) => {
									if (loading) return <p>Loading...</p>;
									if (error) return <p>Error!</p>;
									if (findDocCommentsByDocument) {
										findDocCommentsByDocument.forEach(comment =>
											allTheThings.push(comment)
										);
									}
									docCommentsLoaded = true;
									return <></>;
								}}
							</Query>
						));
						//return <></>;
					}}
				</Query>
				{/* Queries for Folder and the rendering of all components */}
				<Query
					query={query.FIND_FOLDERS_BY_TEAM}
					variables={{ team: this.state.team._id }}
				>
					{({ loading, error, data: { findFoldersByTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error!</p>;
						if (findFoldersByTeam.length > 0) {
							findFoldersByTeam.forEach(folder => {
								if (!allTheThings.includes(folder)) {
									allTheThings.push(folder);
								}
							});
						}
						foldersLoaded = true;

						allTheThings.map(thing =>
							typeof thing.updatedAt === 'string' && thing.updatedAt
								? (thing.updatedAt = new Date(parseInt(thing.updatedAt, 10)))
								: ''
						);
						console.log(allTheThings);
						allTheThings.sort((a, b) => {
							if (a.updatedAt < b.updatedAt) return 1;
							if (a.updatedAt > b.updatedAt) return -1;
							return 0;
						});

						// if (messagesLoaded && documentsLoaded && foldersLoaded) {
						if (allTheThings.length > 0) {
							console.log('true', allTheThings);
							return allTheThings.map((thing, index) => {
								if (thing.user._id === this.props.currentUser._id) {
									return <Activity message={thing} key={index} own={true} />;
								}
								return <Activity message={thing} key={index} own={false} />;
							});
						}
						console.log('Nothing is true', allTheThings);
						return <></>;
					}}
				</Query>
			</div>
		);
	}
}
