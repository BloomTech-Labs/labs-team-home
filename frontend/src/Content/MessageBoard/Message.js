import React from 'react';
import PropTypes from 'prop-types';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../colorVariables';
import mediaQueryFor from '../../_global_styles/responsive_querie';

// ------------- MUI Imports ---------------------- //
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
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

// ---------------- Styled Components ---------------------- //

const Container = styled(Card)`
	margin: 10px auto;
	background-color: ${colors.button};
	color: ${colors.text};
	width: 100%;
	display: flex;
	justify-content: space-between;
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	&:hover {
		background-color: rgba(107, 40, 59, 0.7);
	}
	${mediaQueryFor.mdDevice`
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
`;

const TagInfo = styled(CardContent)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	text-align: center;
	margin: 5px 10px;

	${mediaQueryFor.mdDevice`
		right: 1%;
	`}
`;

const Title = styled(Typography)`
	font-weight: bold;
	color: ${colors.text};
	font-size: 25px;

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
	margin: 5px 10px 10px 10px;
	width: 60px;
	height: 60px;

	${mediaQueryFor.xsDevice`
		margin-right: 0px;
		width: 40px;
		height: 40px;
	`}
`;

const ImgGrid = styled(Grid)`
	${mediaQueryFor.mdDevice`
		margin-right: 0px;
	`}
`;

const CommentGrid = styled(Grid)``;

const TagGrid = styled(Grid)`
	margin-top: 20px;

	${mediaQueryFor.mdDevice`
		display: none;
	`}
`;

const ReplySubtext = styled(StyledTypography)`
	font-size: 14px;
`;

const TagDiv = styled.div`
	p {
		width: 100px;
		padding: 5px;
		font-size: 16px;
		border: 2px solid white;
		border-radius: 5px;
	}
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
					<ImgGrid item xs={1}>
						<StyledAvatar
							src={userInfo.avatar}
							alt="User avatar"
							className={classes.bigAvatar}
						/>
					</ImgGrid>
					<Grid item xs={6}>
						<Info>
							<Title
								gutterBottom
								noWrap
								variant="title"
								component="h3"
								className={classes.cardText}
							>
								{message.title}
							</Title>
							<StyledTypography
								component="p"
								noWrap
								className={classes.cardText}
							>
								{`by ${userInfo.firstName} ${
									userInfo.lastName
								} • ${message.createdAt.toDateString()}`}
							</StyledTypography>
						</Info>
					</Grid>
					<TagGrid item xs={2}>
						<TagInfo>
							<TagDiv>
								{message.tag ? (
									message.tag.name.charAt(0).includes('#') ? (
										<p>{message.tag.name}</p>
									) : (
										<p>{`#${message.tag.name}`}</p>
									)
								) : (
									''
								)}
							</TagDiv>
						</TagInfo>
					</TagGrid>
					<CommentGrid item xs={3}>
						<CommentInfo>
							<StyledTypography variant="h5" component="h5">
								{message.comments.length}
							</StyledTypography>
							<ReplySubtext>
								{`Repl${message.comments.length === 1 ? 'y' : 'ies'}`}
							</ReplySubtext>
						</CommentInfo>
					</CommentGrid>
				</Grid>
			</CardActionArea>
		</Container>
	);
}

Message.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Message);
