import React, { Component } from 'react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { Query, Mutation } from 'react-apollo';

import * as query from '../../constants/queries';
import * as mutation from '../../constants/mutations';

export default class UserList extends Component {
	componentDidMount() {
		document.addEventListener('keydown', this.onKeyDown);
	}
	componentWillMount() {
		document.removeEventListener('keydown', this.onKeyDown);
	}

	onKeyDown = ({ key }) => {
		if (key === 'Escape') {
			this.props.open && this.props.hideModal();
		}
	};
	render() {
		const { open, team, hideModal } = this.props;
		return (
			<Dialog isOpen={open}>
				<button
					onClick={e => {
						e.preventDefault();
						hideModal();
					}}
				>
					Close
				</button>
				<Query query={query.FIND_TEAM} variables={{ id: team }}>
					{({ loading, error, data: { findTeam } }) =>
						loading ? (
							'Loading...'
						) : error ? (
							'Error'
						) : (
							<div>
								<h2>Members of {findTeam.name}</h2>
								{findTeam.users.map(({ user, admin }) => (
									<div key={user._id}>
										<img
											src={user.avatar}
											alt={`${user.firstName} ${user.lastName}`}
											style={{ height: '64px', width: '64px' }}
										/>
										<p>
											{user.firstName} {user.lastName}
										</p>
										<p>{user.email}</p>
										<p>Admin? {admin ? '✔️' : '❌'}</p>
									</div>
								))}
							</div>
						)
					}
				</Query>
			</Dialog>
		);
	}
}
