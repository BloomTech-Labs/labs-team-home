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
								<input
									placeholder="Add team..."
									ref={node => {
										name = node;
									}}
								/>
							</label>
							<button type="submit">+</button>
						</form>
					</styles.Form>
				)}
			</Mutation>
			<Query query={query.FIND_TEAMS_BY_USER}>
				{({ loading, error, data: { findTeamsByUser } }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

					return findTeamsByUser.map(team => (
						<styles.TeamsList>
							<h3>My Teams</h3>
							<styles.LinkStyles>
								<Link
									to={`/${team._id}/home`}
									key={team._id}
									style={{ textDecoration: 'none' }}
								>
									<TeamCard team={team} />
								</Link>
							</styles.LinkStyles>
						</styles.TeamsList>
					));
				}}
			</Query>
		</styles.Container>
	);
};

export default TeamList;
