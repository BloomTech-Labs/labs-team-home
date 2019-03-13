import React from 'react';
import PropTypes from 'prop-types';

// ------------- MUI Imports ---------------------- //
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// ------------- Style Imports ---------------------- //
import { colors } from '../../colorVariables';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import styled from 'styled-components';

import ActivityCartoon from './ActivityCartoon';

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
		width: 30,
		height: 30
	}
};

const Container = styled(Card)`
	display: flex;
	justify-content: center;
	width: 55%;
	max-width: 625px;
	color: white;
	margin: 6px 3%;
	background-color: #3e3145;

	${props => (props.own === 'false' ? 'margin-right: 30%;' : null)};
	${props => (props.own === 'true' ? 'margin-left: 30%;' : null)};

	${mediaQueryFor.smDevice`
		width: 100%;
		margin: 0;
		padding: 0 5px;
		border-bottom: 1px solid ${colors.border};
	`}
`;

const Info = styled(CardContent)`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 45px;
	padding: 10px 0px;
	justify-content: ${props =>
		props.own === 'true' ? 'flex-end' : 'flex-start'};
	align-items: center;
`;

const Title = styled(Typography)`
	font-weight: bold;
	color: ${colors.text};
`;

const StyledTypography = styled(Typography)`
	color: ${colors.text};
	margin: 0;
	padding-top: 2px;
	${mediaQueryFor.smDevice`
		font-size: .95rem;
	`}
`;

const IconContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 10px;
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
					<IconContainer>
						<Avatar
							src={user.avatar}
							alt="User avatar"
							className={classes.bigAvatar}
						/>
						<ActivityCartoon action={action_string} object={object_string} />
					</IconContainer>
				) : null}

				<Info own={own}>
					<StyledTypography
						own={own}
						gutterBottom
						noWrap
						variant={'body1'}
						component="h5"
						className={classes.cardText}
					>
						{user.firstName} {user.lastName.slice(0, 1)}
						{'. '}
						{createdAt.toDateString()}
					</StyledTypography>
					<Title component="p" noWrap />
				</Info>

				{own === 'true' ? ( //if the creator of the activity is the user who is logged in
					<IconContainer>
						<Avatar
							src={user.avatar}
							alt="User avatar"
							className={classes.bigAvatar}
						/>
						<ActivityCartoon action={action_string} object={object_string} />{' '}
					</IconContainer>
				) : null}
			</CardActionArea>
		</Container>
	);
}

Activity.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Activity);
