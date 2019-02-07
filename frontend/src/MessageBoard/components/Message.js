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
import Grid from '@material-ui/core/Grid';

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
		justifyContent: 'space-evenly',
		padding: '0 15px'
	},
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60
	},
	gridContainer: {
		alignItems: 'center'
	}
};

const Container = styled(Card)`
	margin: 2% auto;
	background-color: ${colors.button};
	color: ${colors.text};
	width: 100%;
	display: flex;
	justify-content: space-between;
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	&:hover {
		background-color: rgba(107, 40, 59, 0.7);
	}
	${mediaQueryFor.xsDevice`
		margin: 0;
		border-bottom: 1px solid ${colors.border};
	`}
`;

const Info = styled(CardContent)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 5px 10px;
`;

const CommentInfo = styled(CardContent)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: center;
	margin: 5px 10px;
	width: 100%;

	${mediaQueryFor.xsDevice`
		margin-left: -40px;
		width: 185%;
	`}
`;

const TagInfo = styled(CardContent)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: center;
	margin: 5px 10px;

	${mediaQueryFor.xsDevice`
		margin-left: -25px;
		width: 150%;
	`}
`;

const Title = styled(Typography)`
	font-weight: bold;
	color: ${colors.text};

	${mediaQueryFor.xsDevice`
		font-size: 1rem;
	`}
`;

const StyledTypography = styled(Typography)`
	color: ${colors.text};

	${mediaQueryFor.xsDevice`
		font-size: .85rem;
	`}
`;

const StyledAvatar = styled(Avatar)`
	margin: 10px;
	width: 60px;
	height: 60px;

	${mediaQueryFor.xsDevice`
		margin: 0px;
		width: 40px;
		height: 40px;
	`}
`;

function Message(props) {
	let userInfo = props.userInfo;
	let message = props.message;
	const { classes } = props;
	//createdAt is passed as a string. Make it an int to conver to Date
	if (typeof message.createdAt === 'string')
		message.createdAt = new Date(parseInt(message.createdAt, 10));

	return (
		<Container onClick={props.openMessage}>
			<CardActionArea className={classes.cardButton}>
				<Grid container spacing={8} className={classes.gridContainer}>
					<Grid item xs={1}>
						<StyledAvatar
							src={userInfo.avatar}
							alt="User avatar"
							className={classes.bigAvatar}
						/>
					</Grid>
					<Grid item xs={6}>
						<Info>
							<Title
								gutterBottom
								noWrap
								variant="title"
								component="h4"
								className={classes.cardText}
							>
								{message.title}
							</Title>
							<StyledTypography
								component="p"
								noWrap
								className={classes.cardText}
							>
								{`${userInfo.firstName} ${
									userInfo.lastName
								} - ${message.createdAt.toDateString()}`}
							</StyledTypography>
							<StyledTypography component="p" noWrap>
								{message.content}
							</StyledTypography>
						</Info>
					</Grid>
					<Grid item xs={2}>
						<CommentInfo>
							<StyledTypography variant="h5" component="h5">
								Comments
							</StyledTypography>
							<StyledTypography variant="h5" component="h5">
								{message.comments.length}
							</StyledTypography>
						</CommentInfo>
					</Grid>
					<Grid item xs={3}>
						<TagInfo>
							<StyledTypography variant="h5" component="h5">
								Tag
							</StyledTypography>
							<StyledTypography variant="h5" component="h5">
								{message.tag ? message.tag.name : 'None'}
							</StyledTypography>
						</TagInfo>
					</Grid>
				</Grid>
			</CardActionArea>
		</Container>
	);
}

Message.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Message);
