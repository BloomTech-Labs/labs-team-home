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
		margin: 5,
		width: 60,
		height: 60
	}
};

const Container = styled(Card)`
	width: 70%;
	color: white;
	margin: 5px 3%;
	background-color: #3e3145;
	${props => (props.own === 'true' ? 'position: relative' : null)};
	${props => (props.own === 'true' ? 'float: right' : null)};

	${mediaQueryFor.mdDevice`
		width: 100%;
		margin: 0;
		border-bottom: 1px solid ${colors.border};
	`}
`;

const Info = styled(CardContent)`
	display: flex;
	flex-direction: column;
	max-width: 740px;
	margin: 5px 10px;
	justify-content: ${props =>
		props.own === 'true' ? 'flex-start' : 'flex-end'};
	width: ${props => (props.own === 'true' ? '90%' : '85%')};
	${props =>
		props.own === 'true' ? 'text-align: right' : 'padding-right: 85px'};

	${mediaQueryFor.smDevice`
		max-width: 80%;
	`}
`;

const Title = styled(Typography)`
	font-weight: bold;
	color: ${colors.text};
`;

const StyledTypography = styled(Typography)`
	color: ${colors.text};

	${mediaQueryFor.smDevice`
		font-size: .95rem;
	`}
`;

function Activity(props) {
	// console.log('this is the props on the event: ', props);
	const { classes, own } = props;
	const { user, createdAt, action_string, object_string } = props.event;

	return (
		<Container own={own}>
			<CardActionArea
				className={classes.cardButton}
				onClick={props.clickHandler}
			>
				{own === 'false' ? ( //if the creator of the activity is not the user who is logged in
					<Avatar
						src={user.avatar}
						alt="User avatar"
						className={classes.bigAvatar}
					/>
				) : null}

				<Info>
					<StyledTypography
						gutterBottom
						noWrap
						variant={'title'}
						component="h4"
						className={classes.cardText}
					>
						{user.firstName} {user.lastName.slice(0, 1)}
						{'. '}
						{action_string} a {object_string}
					</StyledTypography>
					<StyledTypography component="p" noWrap className={classes.cardText}>
						{createdAt.toDateString()}
					</StyledTypography>
					<Title component="p" noWrap />
				</Info>

				{own === 'true' ? ( //if the creator of the activity is the user who is logged in
					<Avatar
						src={user.avatar}
						alt="User avatar"
						className={classes.bigAvatar}
					/>
				) : null}
			</CardActionArea>
		</Container>
	);
}

Activity.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Activity);
