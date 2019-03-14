import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { colors } from '../../colorVariables';

const styles = theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white
		}
	},

	toolbarTitle: {
		flex: 1
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
			width: 900,
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
	},
	cardHeader: {
		backgroundColor: theme.palette.grey[200]
	},
	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing.unit * 2
	},
	cardActions: {
		[theme.breakpoints.up('sm')]: {
			paddingBottom: theme.spacing.unit * 2
		}
	},

	footer: {
		marginTop: theme.spacing.unit * 8,
		padding: `${theme.spacing.unit * 6}px 0`
	}
});

const tiers = [
	{
		title: 'Free',
		price: '0',
		description: [
			'Unlimited Documents',
			'Unlimited Folders',
			'Up to 5 users per team'
		],
		buttonText: 'Sign up for free',
		buttonVariant: 'outlined'
	},
	{
		title: 'Premium',
		subheader: 'Most popular',
		price: '10',
		description: [
			'Unlimited Documents',
			'Unlimited Folders',
			'Unlimited users for 1 team'
		],
		buttonText: 'Get started',
		buttonVariant: 'contained'
	},
	{
		title: 'Enterprise',
		price: '50',
		description: ['Multiple teams?', 'Special requirements?', 'Contact us!'],
		buttonText: 'Contact us',
		buttonVariant: 'outlined'
	}
];

const ModifiedTypography = styled(Typography)`
	color: #ffffff;
`;

const Anchor = styled.a`
	width: 100%;

	&:hover {
		text-decoration: none;
	}
`;

const ModifiedButton = styled(Button)`
	background-color: ${props =>
		props.buttontype === 'primary' ? `${colors.button}` : `white`};
	border: ${props =>
		props.buttontype === 'primary' ? 'none' : '1px solid #3E3145'};
	color: ${props =>
		props.buttontype === 'primary' ? `${colors.text}` : 'black'};
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	&:hover {
		background-color: ${props =>
			props.buttontype === 'primary'
				? 'rgba(255, 255, 255, 0.7)'
				: `${colors.button}`};
		color: ${props =>
			props.buttontype === 'primary' ? 'black' : `${colors.text}`};
	}
`;

function Pricing(props) {
	const { classes, handleSignUp, handleEmail } = props;

	return (
		<React.Fragment>
			<CssBaseline />

			<main className={classes.layout}>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<ModifiedTypography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						Our Pricing
					</ModifiedTypography>
					<ModifiedTypography
						variant="h6"
						align="center"
						color="textSecondary"
						component="p"
					>
						Our pricing system is simple and flexible for our users. If your
						company has special considerations, please contact us at your
						earliest convinience. We will be happy to build out a custom,
						enterprise solution to your buisness needs.
					</ModifiedTypography>
				</div>
				{/* End hero unit */}
				<Grid container spacing={40} alignItems="flex-end">
					{tiers.map(tier => (
						// Enterprise card is full width at sm breakpoint
						<Grid
							item
							key={tier.title}
							xs={12}
							sm={tier.title === 'Enterprise' ? 12 : 6}
							md={4}
						>
							<Card>
								<CardHeader
									title={tier.title}
									subheader={tier.subheader}
									titleTypographyProps={{ align: 'center' }}
									subheaderTypographyProps={{ align: 'center' }}
									action={tier.title === 'Pro' ? <StarIcon /> : null}
									className={classes.cardHeader}
								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography component="h2" variant="h3" color="textPrimary">
											${tier.price}
										</Typography>
										<Typography variant="h6" color="textSecondary">
											/mo
										</Typography>
									</div>
									{tier.description.map(line => (
										<Typography variant="subtitle1" align="center" key={line}>
											{line}
										</Typography>
									))}
								</CardContent>
								<CardActions className={classes.cardActions}>
									<Anchor href="#root">
										<ModifiedButton
											fullWidth
											variant={tier.buttonVariant}
											onClick={
												tier.title === 'Enterprise' ? handleEmail : handleSignUp
											}
											buttontype={
												tier.title === 'Premium' ? 'primary' : 'secondary'
											}
										>
											{tier.buttonText}
										</ModifiedButton>
									</Anchor>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</main>
		</React.Fragment>
	);
}

Pricing.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pricing);
