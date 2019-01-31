import React, { Component } from 'react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { Query, Mutation } from 'react-apollo';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { palette, colors } from '../../colorVariables';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardActions from '@material-ui/core/CardActions';

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
		const { open, team, hideModal, currentUser } = this.props;
		return (
			<Dialog
				isOpen={open}
				style={{ background: palette.plum, color: '#fff', borderRadius: '3px' }}
			>
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'flex-end'
					}}
				>
					<IconButton
						aria-label="Close"
						onClick={hideModal}
						style={{ color: '#fff' }}
					>
						<CloseIcon />
					</IconButton>
				</div>
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
									<CardHeader
										key={user._id}
										avatar={
											<Avatar
												src={user.avatar}
												alt={`${user.firstName} ${user.lastName}`}
												// style={{ height: '64px', width: '64px' }}
											/>
										}
										title={`${user.firstName} 
										${user.lastName}`}
										subheader={`${user.email}`}
										subheaderTypographyProps={{ style: { color: '#fff' } }}
										titleTypographyProps={{ style: { color: '#fff' } }}
										action={
											<Mutation
												mutation={mutation.UPDATE_TEAM}
												update={(cache, { data: { updateTeam } }) => {
													const { findTeam } = cache.readQuery({
														query: query.FIND_TEAM,
														variables: { id: team }
													});
													cache.writeQuery({
														query: query.FIND_TEAM,
														variables: { id: team },
														data: {
															findTeam: updateTeam
														}
													});
												}}
											>
												{updateTeam =>
													findTeam.users.find(
														item => item.user._id === currentUser._id
													).admin &&
													user._id !== currentUser._id && (
														<Button
															color="secondary"
															onClick={e => {
																e.preventDefault();
																const sanitized = findTeam.users.map(
																	sanitizedUser => {
																		return {
																			user: sanitizedUser.user._id,
																			admin: sanitizedUser.admin
																		};
																	}
																);
																updateTeam({
																	variables: {
																		id: findTeam._id,
																		users: sanitized.filter(
																			filterItem => filterItem.user !== user._id
																		)
																	}
																});
															}}
														>
															Kick User
														</Button>
													)
												}
											</Mutation>
										}
									/>
								))}
							</div>
						)
					}
				</Query>
			</Dialog>
		);
	}
}
