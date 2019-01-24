import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import * as styles from './TeamList.styles';
import * as query from '../../../constants/queries';
import * as mutation from '../../../constants/mutations';

import TeamCard from './TeamCard';

const TeamList = () => {
	let name;
	return (
		<styles.Container>
			<h3>Add Team</h3>
			<Mutation
				mutation={mutation.ADD_TEAM}
				update={(cache, { data: { addTeam } }) => {
					const { findTeamsByUser } = cache.readQuery({
						query: query.FIND_TEAMS_BY_USER
					});
					cache.writeQuery({
						query: query.FIND_TEAMS_BY_USER,

						data: { findTeamsByUser: [...findTeamsByUser, addTeam] }
					});
				}}
			>
				{addTeam => (
					<styles.Form>
						<form
							action="submit"
							onSubmit={e => {
								e.preventDefault();
								name.value.length &&
									addTeam({
										variables: {
											name: name.value
										}
									});
								name.value = '';
							}}
						>
							<label htmlFor="name">
								Team Name:
								<input
									ref={node => {
										name = node;
									}}
								/>
							</label>
							<button type="submit">Add Team</button>
						</form>
					</styles.Form>
				)}
			</Mutation>
			<h3>My Teams</h3>
			<Query query={query.FIND_TEAMS_BY_USER}>
				{({ loading, error, data: { findTeamsByUser } }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

					return findTeamsByUser.map(team => (
						<Link to={`/${team._id}/home`} key={team._id}>
							<TeamCard team={team} />
						</Link>
					));
				}}
			</Query>
		</styles.Container>
	);
};

export default TeamList;
