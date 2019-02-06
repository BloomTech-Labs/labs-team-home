import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import * as style from './TeamCard.styles';

const styles = {
	root: {
		color: 'inherit'
	},
	gridStyle: {
		maxWidth: '45%'
	},
	alignRight: {
		display: 'flex',
		justifyContent: 'flex-end'
	}
};

function TeamCard(props) {
	const { name, premium } = props.team;
	const { classes } = props;

	return (
		<style.Container>
			<CardActionArea>
				<style.Info>
					<Grid container spacing={8}>
						<Grid item xs={6} className={classes.gridStyle}>
							<style.StyledTypography noWrap variant="title" component="h3">
								{name}
							</style.StyledTypography>
						</Grid>
						<Grid
							item
							xs={6}
							className={(classes.alignRight, classes.gridStyle)}
						>
							<style.Prem component="p" noWrap>
								Premium? {premium ? '✔️' : '❌'}
							</style.Prem>
						</Grid>
					</Grid>
				</style.Info>
			</CardActionArea>
		</style.Container>
	);
}

export default withStyles(styles)(TeamCard);
