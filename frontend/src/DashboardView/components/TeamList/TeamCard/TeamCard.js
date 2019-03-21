import React from 'react';

// ------------- Material UI -------------- //
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// --------- imported styles/ JSS --------- //
import * as style from './TeamCard.styles';
import styled from 'styled-components';

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

const StyledTypography = styled(Typography)`
	color: white;
`;

function TeamCard(props) {
	const { name, premium } = props.team;
	const { classes } = props;
	return (
		/* components styled via JSS */
		<style.Container>
			<CardActionArea>
				<style.Info>
					{/* Grid component comes from materia ul. Allows for responsive layout. */}
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
							{' '}
							{/* emoji were used here */}
							{props.user._id ===
							props.team.users.find(u => u.admin).user._id ? (
								<>
									{premium ? (
										<style.Prem component="p" noWrap>
											PREMIUM
										</style.Prem>
									) : (
										<StyledTypography>Go Premium...</StyledTypography>
									)}
								</>
							) : null}
						</Grid>
					</Grid>
				</style.Info>
			</CardActionArea>
		</style.Container>
	);
}

export default withStyles(styles)(TeamCard);
