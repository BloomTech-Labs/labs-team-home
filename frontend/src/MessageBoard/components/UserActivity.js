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
import mediaQueryFor from '../../_global_styles/responsive_querie';

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
		display: 'flex',
		justifyContent: 'flex-end'
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

	${mediaQueryFor.xsDevice`
		width: 100%;
		margin: 0;
		border-bottom: 1px solid ${colors.border};
	`}
`;

const Info = styled(CardContent)`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	margin: 5px 10px;
	text-align: right;
	max-width: 740px;
	width: 85%;

	${mediaQueryFor.xsDevice`
		max-width: 340px;
		padding-right: 0;
	`}
`;

const Title = styled(Typography)`
	font-weight: bold;
	color: ${colors.text};
`;

const StyledTypography = styled(Typography)`
	color: ${colors.text};

	${mediaQueryFor.xsDevice`
		font-size: .95rem;
	`}
`;

function UserActivity(props) {
	const { classes } = props;

	if (props.message.__typename === 'Message') {
		return (
			<Container>
				<CardActionArea className={classes.cardButton}>
					<Info>
						<StyledTypography
							gutterBottom
							noWrap
							variant="h5"
							component="h4"
							className={classes.cardText}
						>
							{props.message.user.firstName}{' '}
							{props.message.user.lastName.slice(0, 1)}
							{'. '}
							posted a new message
						</StyledTypography>
						<StyledTypography component="p" noWrap className={classes.cardText}>
							{props.message.updatedAt.toDateString()}
						</StyledTypography>
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
						<StyledTypography
							gutterBottom
							noWrap
							variant="h5"
							component="h4"
							className={classes.cardText}
						>
							{props.message.user.firstName}{' '}
							{props.message.user.lastName.slice(0, 1)}
							{'. '}
							posted a new comment
						</StyledTypography>
						<StyledTypography component="p" noWrap className={classes.cardText}>
							{props.message.updatedAt.toDateString()}
						</StyledTypography>
						<Title component="p" noWrap className={classes.cardText}>
							{props.message.content}
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
	}
}

UserActivity.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserActivity);
