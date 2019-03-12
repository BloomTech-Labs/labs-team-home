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

	width: 70%;
	color: white;
	margin: 5px 3%;
	background-color: #3e3145;

	${props => (props.own === 'true' ? 'position: relative' : null)};
	${props => (props.own === 'true' ? 'float: right' : null)};

	${mediaQueryFor.mdDevice`
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

	/* border: 1px solid blue; */

	justify-content: ${props => (props.own === 'true' ? 'flex-end' : 'flex-start')};
/* 
	padding-right: ${props => (props.own === 'true' ? '0' : '15px')};
	padding-left: ${props => (props.own === 'true' ? '15px' : '0')}; */

	/* text-align: ${props => (props.own === 'true' ? 'right' : 'left')}; */

	/* ${mediaQueryFor.smDevice`
		max-width: 80%;
	`} */
`;

const Title = styled(Typography)`
	font-weight: bold;
	color: ${colors.text};
`;

const StyledTypography = styled(Typography)`
	color: ${colors.text};
	margin: 0;
	/* border: 1px solid yellow; */
	/* width: 100%; */
	/* height: 50px; */
	padding-top: 2px;
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

				<Info own={own}>
					<StyledTypography
						own={own}
						gutterBottom
						noWrap
						variant={'body1'}
						// component="h5"
						className={classes.cardText}
					>
						{user.firstName} {user.lastName.slice(0, 1)}
						{'. '}
						{action_string}{' '}
						{object_string === 'team' ? 'the team' : `a ${object_string}`}{' '}
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
