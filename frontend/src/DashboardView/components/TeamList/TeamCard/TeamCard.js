import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import { withStyles } from '@material-ui/core/styles';

import * as styles from './TeamCard.styles';

const TeamCard = ({ team: { name, premium } }) => (
	<styles.Container>
		<CardActionArea className={classes.cardButton}>
			<styles.Info>
				<styles.StyledTypography
					gutterBottom
					noWrap
					variant="title"
					component="h3"
					className={classes.cardText}
				>
					{name}
				</styles.StyledTypography>
				<styles.StyledTypography
					component="p"
					noWrap
					className={classes.cardText}
				>
					Premium? {premium ? '✔️' : '❌'}
				</styles.StyledTypography>
			</styles.Info>
		</CardActionArea>
	</styles.Container>
);

export default withStyles(styles)(TeamCard);
