import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import * as s from './TeamList.styles';

import TeamCard from './TeamCard';

const TeamList = () => (
	<s.Container>
		<Query
			query={gql`
				{
					teams {
						_id
						name
						premium
					}
				}
			`}
		>
			{({ loading, error, data: { teams } }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;

				return teams.map(team => <TeamCard key={team._id} team={team} />);
			}}
		</Query>
	</s.Container>
);

export default TeamList;
