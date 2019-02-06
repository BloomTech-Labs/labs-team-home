import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';

import * as style from './TeamList.styles';
import * as query from '../../../constants/queries';
import * as mutation from '../../../constants/mutations';

import TeamCard from './TeamCard';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
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
			classes: props.classes
		};
	}

	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		console.log('classes', this.state.classes);

		return (
			<style.Container>
				<Mutation
					mutation={mutation.ADD_TEAM}
					update={(cache, { data: { addTeam } }) => {
						const { findTeamsByUser } = cache.readQuery({
							query: query.FIND_TEAMS_BY_USER
						});
						cache.writeQuery({
							query: query.FIND_TEAMS_BY_USER,
							data: { findTeamsByUser: [...findTeamsByUser, addTeam] }
						});
					}}
				>
					{addTeam => (
						<style.Form className={this.state.classes.root} elevation={1}>
							<style.Input
								className={this.state.classes.input}
								placeholder="Add a Team..."
								name="input"
								value={this.state.input}
							/>
							<style.Button
								className={this.state.classes.iconButton}
								aria-label="Directions"
								onClick={e => {
									e.preventDefault();
									this.state.input.length &&
										addTeam({
											variables: {
												name: this.state.input
											}
										});
									this.setState({
										input: ''
									});
								}}
							>
								<AddIcon />
							</style.Button>
						</style.Form>
					)}
				</Mutation>
				<h1>My Teams</h1>
				<style.TeamsList>
					<Query query={query.FIND_TEAMS_BY_USER}>
						{({ loading, error, data: { findTeamsByUser } }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error :(</p>;
							return findTeamsByUser.map(team => (
								<style.LinkStyles to={`/${team._id}/home`} key={team._id}>
									<TeamCard team={team} />
								</style.LinkStyles>
							));
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
