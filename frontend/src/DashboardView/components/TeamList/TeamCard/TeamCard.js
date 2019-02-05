import React from 'react';

import * as styles from './TeamCard.styles';

const TeamCard = ({ team: { name, premium } }) => (
	<styles.Container>
		<h3>{name}</h3>
		<p>Premium? {premium ? '✔️' : '❌'}</p>
	</styles.Container>
);

export default TeamCard;
