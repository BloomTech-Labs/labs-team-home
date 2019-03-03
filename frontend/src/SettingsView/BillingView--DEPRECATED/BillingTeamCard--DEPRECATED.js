import React from 'react';
import {
	StyledTeamCardH3,
	StyledTeamCardP,
	StyledTeamCardDiv
} from '../styles/container.styles';

export default function BillingTeamCard(props) {
	return (
		<StyledTeamCardDiv
			selected={props.teamId !== props.team._id ? false : true}
			onClick={props.handlePickTeam}
			data-id={props.team._id}
		>
			<StyledTeamCardH3>{props.team.name}</StyledTeamCardH3>
			<StyledTeamCardP>
				Premium? {props.team.premium ? '✔️' : '❌'}
			</StyledTeamCardP>
		</StyledTeamCardDiv>
	);
}
