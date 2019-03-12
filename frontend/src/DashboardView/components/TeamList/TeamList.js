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

// ------------- MUI Imports ---------------------- //
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

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
			<style.Container>
				{/* specifies what mutation you want to use */}
				<Mutation mutation={mutation.ADD_TEAM}>
					{addTeam => (
						<style.Form className={this.state.classes.root} elevation={1}>
							<form
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
								<style.Input
									className={this.state.classes.input}
									placeholder="Add a Team..."
									name="input"
									value={this.state.input}
									onChange={this.changeHandler}
								/>
								<style.Button
									type="submit"
									className={this.state.classes.iconButton}
									aria-label="Directions"
								>
									<AddIcon />
								</style.Button>
							</form>
						</style.Form>
					)}
				</Mutation>
				<h1>My Teams</h1>
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
											<TeamCard team={team} />
										</style.LinkStyles>
									</div>
								));
							} else {
								return <p> You are not on a team yet. Create one! </p>;
							}
						}}
					</Query>
				</style.TeamsList>
			</style.Container>
		);
	}
}

TeamList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamList);
