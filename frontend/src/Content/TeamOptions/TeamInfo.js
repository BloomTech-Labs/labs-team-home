import { colors } from '../../colorVariables';
import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import React from 'react';
import TeamDetails from './TeamDetails';
import { Settings } from 'styled-icons/material/Settings';

const TeamOptions = styled.div`
	display: flex;
	/* flex-direction: column; */
	align-items: center;
	justify-content: center;
	color: ${colors.header};
	text-align: center;
	font-size: 2rem;
`;

const SettingsIcon = styled(Settings)`
	height: 1.2rem;
	color: ${colors.text};
	margin-top: 0.6rem;
	margin-left: 5px;
	cursor: pointer;

	${mediaQueryFor.smDevice`
		height: 1.8rem;
		margin-top: 0;
		margin-left: 10px;
    `}
`;

class TeamInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAdmin: false,
			teamDetailsOpen: false
		};
	}

	componentDidMount = () => {
		this.props.team.users.map(user => {
			if (user.user._id === this.props.currentUser._id) {
				if (user.admin) this.setState({ isAdmin: true });
			}
			return null;
		});
	};

	toggleTeamDetails = () => {
		this.setState(prevState => ({
			teamDetailsOpen: !prevState.teamDetailsOpen
		}));
	};

	render() {
		return (
			<>
				{/* Team Name and action buttons */}
				<TeamOptions>
					<h1>{this.props.team.name}</h1>
					<SettingsIcon
						onClick={e => {
							e.preventDefault();
							this.toggleTeamDetails();
						}}
					/>
					{/* <TeamActions>
						<StyledButton
							variant="contained"
							onClick={e => {
								e.preventDefault();
								this.toggleTeamDetails();
							}}
						>
							Team Details
						</StyledButton>
					</TeamActions> */}
				</TeamOptions>

				{/* click on the user list and view its contents modal */}
				<TeamDetails
					open={this.state.teamDetailsOpen}
					team={this.props.team}
					currentUser={this.props.currentUser}
					hideModal={this.toggleTeamDetails}
					admin={this.props.isAdmin}
					{...this.props}
				/>
			</>
		);
	}
}

export default TeamInfo;
