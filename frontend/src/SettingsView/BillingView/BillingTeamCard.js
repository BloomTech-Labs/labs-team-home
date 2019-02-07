import React from 'react';
import {
	StyledTeamCardH3,
	StyledTeamCardP,
	StyledTeamCardDiv
} from '../styles/container.styles';

export default function BillingContainer(props) {
	return (
		<StyledTeamCardDiv>
			<StyledTeamCardH3>{props.team.name}</StyledTeamCardH3>
			<StyledTeamCardP>
				Premium? {props.team.premium ? '✔️' : '❌'}
			</StyledTeamCardP>
		</StyledTeamCardDiv>
	);
}
