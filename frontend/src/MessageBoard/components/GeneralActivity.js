import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = {
	card: {
		width: '70%',
		backgroundColor: '#3E3145',
		color: 'white',
		margin: '20px 3%'
	},
	cardButton: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	cardText: {
		color: 'white',
		maxWidth: '85%'
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60
	}
};

function GeneralActivity(props) {
	const { classes } = props;
	console.log('message', props.message);

	if (props.message.__typename === 'Message') {
		return (
			<Card className={classes.card}>
				<CardActionArea className={classes.cardButton}>
					<Avatar
						src={props.message.user.avatar}
						alt="User avatar"
						className={classes.bigAvatar}
					/>
					<CardContent>
						<Typography
							gutterBottom
							noWrap
							variant="title"
							component="h3"
							className={classes.cardText}
						>
							{props.message.user.firstName} {props.message.user.lastName}{' '}
							posted a new message
						</Typography>
						<Typography component="p" noWrap className={classes.cardText}>
							{props.message.updatedAt.toDateString()}
						</Typography>
						<Typography component="p" noWrap className={classes.cardText}>
							{props.message.title}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	} else {
		return (
			<Card className={classes.card}>
				<CardActionArea className={classes.cardButton}>
					<Avatar
						src={props.message.user.avatar}
						alt="User avatar"
						className={classes.bigAvatar}
					/>
					<CardContent>
						<Typography
							gutterBottom
							noWrap
							variant="title"
							component="h3"
							className={classes.cardText}
						>
							{props.message.user.firstName} {props.message.user.lastName}{' '}
							posted a new comment
						</Typography>
						<Typography component="p" noWrap className={classes.cardText}>
							{props.message.updatedAt.toDateString()}
						</Typography>
						<Typography component="p" noWrap className={classes.cardText}>
							{props.message.content}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		);
	}
}

GeneralActivity.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GeneralActivity);
