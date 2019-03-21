import React from 'react';
import PropTypes from 'prop-types';

// ------------- gql Imports ---------------------- //
import { Query, Mutation } from 'react-apollo';
import * as style from './TeamList.styles';
import * as query from '../../../constants/queries';
import * as mutation from '../../../constants/mutations';

// ------------- Component Imports ---------------------- //
import TeamCard from './TeamCard/TeamCard';
import { StyledProgressSpinner } from '../../../app-styles';
import FormInput from '../../../SettingsView/components/forms/FormInput';
import { StyledForm } from '../../../SettingsView/styles/container.styles';

// ------------- MUI Imports ---------------------- //
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

// ------------- Style Imports ---------------------- //
import mediaQueryFor from '../../../_global_styles/responsive_querie';
import styled from 'styled-components';
import { colors } from '../../../colorVariables';

const styles = {
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400
	},
	input: {
		marginLeft: 8,
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		width: 1,
		height: 28,
		margin: 4
	}
};

const ContainerDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 96%;
	max-width: 1100px;

	padding: 20px;
	border: 2px solid #4a4550;
	position: relative;
	margin: 135px auto;

	${mediaQueryFor.mdDevice`
		margin-bottom: 10px;
		width: 100%;
	`};
`;

const ContainerTitle = styled.div`
	position: absolute;
	width: 150px;
	height: 40px;
	text-align: center;
	top: -15px;
	left: 20px;
	background-color: #5a5560;

	p {
		color: yellow;
		font-size: 18px;
		letter-spacing: 1px;
	}
`;

const StyledForm2x = styled(StyledForm)`
	color: white;
	position: relative;
`;

const FormInput2x = styled(FormInput)``;

const StyledButton = styled.button`
	position: absolute;
	border-radius: 50%;
	border: none;
	background-color: ${colors.button};
	color: white;
	right: 10px;
	top: 15px;
	&:hover {
		cursor: pointer;
	}
	${mediaQueryFor.smDevice`
		display: none;
	`};
`;

class TeamList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			input: '',
			editTeamName: '',
			classes: props.classes
		};
	}

	changeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};
	render() {
		return (
			/* NOTE: anything with <style.name> is essentially a styled component */
			<ContainerDiv>
				{/* specifies what mutation you want to use */}
				<ContainerTitle>
					<p>MY TEAMS</p>
				</ContainerTitle>

				<Mutation mutation={mutation.ADD_TEAM}>
					{addTeam => (
						<StyledForm2x
							onSubmit={e => {
								e.preventDefault();
								this.state.input.length &&
									addTeam({
										variables: { name: this.state.input },
										refetchQueries: [
											{
												query: query.FIND_TEAMS_BY_USER
											}
										]
									});
								this.setState({ input: '' });
							}}
						>
							<FormInput2x
								className={this.state.classes.input}
								placeholder="Name it up!"
								name="input"
								value={this.state.input}
								onChange={this.changeHandler}
								title={'Add a New Team'}
							/>
							<StyledButton
								type="submit"
								className={this.state.classes.iconButton}
								aria-label="Directions"
							>
								<AddIcon />
							</StyledButton>
						</StyledForm2x>
					)}
				</Mutation>
				<style.TeamsList>
					<Query query={query.FIND_TEAMS_BY_USER}>
						{({ loading, error, data: { findTeamsByUser } }) => {
							if (loading) return <StyledProgressSpinner />;
							if (error) return <p>Error.</p>;
							// Map over the teams
							if (findTeamsByUser.length) {
								return findTeamsByUser.map(team => (
									<div key={team._id}>
										<style.LinkStyles to={`/${team._id}/home`}>
											<TeamCard team={team} user={this.props.currentUser} />
										</style.LinkStyles>
									</div>
								));
							} else {
								return <p> You are not on a team yet. Create one! </p>;
							}
						}}
					</Query>
				</style.TeamsList>
			</ContainerDiv>
		);
	}
}

TeamList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamList);
