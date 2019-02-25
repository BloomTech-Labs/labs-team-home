import React from 'react';
import { Query, Mutation } from 'react-apollo';

import * as style from './TeamList.styles';
import * as query from '../../../constants/queries';
import * as mutation from '../../../constants/mutations';

import TeamCard from './TeamCard';
import PropTypes from 'prop-types';
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
			classes: props.classes
		};

		this.changeHandler = this.changeHandler.bind(this);
	}

	changeHandler(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		return (
			/* NOTE: anything with <style.name> is essentially a styled component */
			<style.Container>
				{/* specifies what mutation you want to use */}
				<Mutation
					mutation={mutation.ADD_TEAM}
					update={(cache, { data: { addTeam } }) => {
						//  data is the result of the mutation. In this case it is addTeam from below
						const { findTeamsByUser } = cache.readQuery({
							query: query.FIND_TEAMS_BY_USER
						});
						cache.writeQuery({
							query: query.FIND_TEAMS_BY_USER,
							data: { findTeamsByUser: [...findTeamsByUser, addTeam] }
						});
					}} /* updates the cache after the mutation happens */
				>
					{(
						addTeam // on submit
					) => (
						<style.Form className={this.state.classes.root} elevation={1}>
							<form
								onSubmit={e => {
									e.preventDefault();
									this.state.input.length &&
										addTeam({ variables: { name: this.state.input } });
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
								{/* The button does not submit unless the onClick is present */}
								<style.Button
									className={this.state.classes.iconButton}
									aria-label="Directions"
									onClick={e => {
										e.preventDefault();
										this.state.input.length &&
											addTeam({ variables: { name: this.state.input } });
										this.setState({ input: '' });
									}}
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
						{/* data is the result of the query. Query component can also return loading bool and error bool. */}
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
