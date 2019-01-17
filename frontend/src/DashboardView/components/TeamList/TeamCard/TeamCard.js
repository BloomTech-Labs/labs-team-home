import React from 'react';

import * as s from './TeamCard.styles';

const TeamCard = ({ team: { name, premium } }) => (
	<s.Container>
		<h3>{name}</h3>
		<p>Premium? {premium ? '✔️' : '❌'}</p>
	</s.Container>
);

export default TeamCard;
