import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import * as s from './TeamList.styles';
import * as q from '../../../constants/queries';

import TeamCard from './TeamCard';

const TeamList = () => (
	<s.Container>
		<Query query={q.FIND_TEAMS_BY_USER}>
			{({ loading, error, data: { findTeamsByUser } }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;

				return findTeamsByUser.map(team => (
					<TeamCard key={team._id} team={team} />
				));
			}}
		</Query>
	</s.Container>
);

export default TeamList;
