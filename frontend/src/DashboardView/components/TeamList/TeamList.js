import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import * as s from './TeamList.styles';
import * as q from '../../../constants/queries';
import * as m from '../../../constants/mutations';

import TeamCard from './TeamCard';

const TeamList = () => {
	let name;
	<s.Container>
		<Query query={q.FIND_TEAMS_BY_USER}>
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
		<Mutation mutation={m.ADD_TEAM}>
			{addTeam => (
				<form action="submit">
					<label htmlFor="name">
						Team Name: <input type="text" />
					</label>
				</form>
			)}
		</Mutation>
	</s.Container>;
};

export default TeamList;
