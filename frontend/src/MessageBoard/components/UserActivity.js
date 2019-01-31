import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { colors } from '../../colorVariables';

const styles = {
	root: {
		backgroundColor: colors.background
	},
	card: {
		width: '60%',
		backgroundColor: colors.background,
		color: colors.text,
		margin: '20px 5%'
	},
	cardButton: {
		display: 'flex'
	},
	cardText: {
		color: colors.text
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60
	}
};

const Container = styled(Card)`
	width: 70%;
	color: white;
	margin: 20px 3%;
	background-color: #3e3145;
	position: relative;
	float: right;
`;

const Info = styled(CardContent)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: right;
	padding: 0 20px;
	margin: 5px 10px;
`;

const Title = styled(Typography)`
	font-weight: bold;
	color: ${colors.text};
`;

function UserActivity(props) {
	const { classes } = props;

	if (props.message.__typename === 'Message') {
		return (
			<Container>
				<CardActionArea className={classes.cardButton}>
					<Info>
						<Typography
							gutterBottom
							noWrap
							variant="h5"
							component="h4"
							className={classes.cardText}
						>
							{props.message.user.firstName} {props.message.user.lastName}{' '}
							posted a new message
						</Typography>
						<Typography component="p" noWrap className={classes.cardText}>
							{props.message.updatedAt.toDateString()}
						</Typography>
						<Title component="p" noWrap>
							{props.message.title}
						</Title>
					</Info>
					<Avatar
						src={props.message.user.avatar}
						alt="User avatar"
						className={classes.bigAvatar}
					/>
				</CardActionArea>
			</Container>
		);
	} else {
		return (
			<Container>
				<CardActionArea className={classes.cardButton}>
					<Info>
						<Typography
							gutterBottom
							noWrap
							variant="h5"
							component="h4"
							className={classes.cardText}
						>
							{props.message.user.firstName} {props.message.user.lastName}{' '}
							posted a new message
						</Typography>
						<Typography component="p" noWrap className={classes.cardText}>
							{props.message.updatedAt.toDateString()}
						</Typography>
						<Typography component="p" noWrap className={classes.cardText}>
							{props.message.content}
						</Typography>
					</Info>
					<Avatar
						src={props.message.user.avatar}
						alt="User avatar"
						className={classes.bigAvatar}
					/>
				</CardActionArea>
			</Container>
		);
	}
}

UserActivity.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserActivity);
