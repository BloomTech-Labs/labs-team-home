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
		width: 100%;
		margin: 0;
		border-bottom: 1px solid ${colors.border};
	`}
`;

const Info = styled(CardContent)`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: 5px 10px;

	${mediaQueryFor.xsDevice`
		max-width: 340px;
	`}
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

// const MessagePreview = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	align-items: flex-start;
// 	justify-content: flex-start;
//
// 	& div {
// 		margin-left: 20px;
// 		word-break: break-all;
// 		word-wrap: break-word;
// 		font-size: 1.2rem;
// 	}
//
// 	& p.user-name {
// 		margin-left: 20px;
//
// 		/* margin-left: 17%; */
// 		/* margin-top: 1%; */
// 		align-self: center;
// 		color: pink;
// 		font-size: 0.8rem;
// 	}
//
// 	& p.content {
// 		margin: 0;
// 		padding-top: 10px;
// 		align-self: center;
// 		font-size: 1px;
// 		display: none;
// 	}
// 	& h5.comments {
// 		margin: 0 0 2% 0;
// 	}
// 	& h5.comments-length {
// 		margin: 0 0 2% 0;
// 		left: 50px;
// 	}
// 	& h5.tags {
// 		margin: 0 0 2% 0;
// 	}
// `;

const OtherInfo = styled.div`
	position: relative;
	float: right;
	display: flex;
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
						<Avatar
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
								{message.tag ? message.tag.name : 'Uncategorized'}
							</StyledTypography>
						</TagInfo>
					</Grid>
				</Grid>
			</CardActionArea>
			{/*<MessageContainer>
				<Pic
				src={
				userInfo.avatar
				? userInfo.avatar
				: 'https://via.placeholder.com/50.png'
				}
				/>
				<MessagePreview>
				<div>
				{message.title.length <= 20
				? message.title
				: message.title.slice(0, 19) + '...'}
				</div>
				<p className="user-name">
				{`${userInfo.firstName} ${
				userInfo.lastName
				} - ${message.createdAt.toDateString()}`}
				</p>
				<p className="content">
				{message.content.length <= 50
				? message.content
				: message.content.slice(0, 49) + '...'}
				</p>
				</MessagePreview>
				<MessagePreview>
				<h5 className="comments">Comments</h5>
				<h5 className="comments-length">{message.comments.length}</h5>
				</MessagePreview>
				<MessagePreview>
				<Tag>{message.tag ? message.tag.name : 'Uncategorized'}</Tag>
				</MessagePreview>
				</MessageContainer>*/}
		</Container>
	);
}

Message.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Message);
