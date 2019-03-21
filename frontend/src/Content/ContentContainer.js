import React from 'react';
import PropTypes from 'prop-types';

// ---------------- Components ---------------------- //
import MessageBoard from './MessageBoard/MessageBoard';
import ActivityTimeline from './ActivityTimeline/ActivityTimeline';
import FABComponent from './FloatingActionButtons';
import DocumentsTab from './DocumentsTab/TabContainer';

// ---------------- gql ---------------------- //
import mediaQueryFor from '../_global_styles/responsive_querie';
import { Query } from 'react-apollo';
import * as queries from '../constants/queries';

// ---------------- MUI components ---------------------- //
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// ---------------- Styles ---------------------- //
import TeamInfo from './TeamOptions/TeamInfo';
import SwipeableViews from 'react-swipeable-views';
import { colors } from '../colorVariables';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { StyledProgressSpinner } from '../app-styles';

const styles = {
	root: {
		flexGrow: 1,
		backgroundColor: 'transparent',
		boxShadow: 'none',
		marginBottom: '20px'
	},
	label: {
		color: 'white'
	},
	tabsIndicator: {
		backgroundColor: '#FAED26'
	},
	styledTooltip: {
		fontSize: '12px',
		backgroundColor: colors.text,
		color: colors.button
	},
	slideContainer: {
		WebkitOverflowScrolling: 'touch' // iOS momentum scrolling
	}
};

// ---------------- Styled Components ---------------------- //

const MsgContainer = styled.div`
	margin: 90px auto;
	margin-bottom: 0;

	${mediaQueryFor.xsDevice`
		width: 100%;
	`}

	${mediaQueryFor.smDevice`
      padding:0px;
      width:100%;
      border-width:4px;
  `}
`;

const StyledPaper = styled(Paper)`
	${mediaQueryFor.xsDevice`
		max-width: 376px;
	`}
`;

const StyledTab = styled(Tab)`
	width: 30%;

	&:focus {
		outline: none;
	}
`;

class ContentContainer extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			value: 1,
			isAdmin: false,
			showFABMenu: false
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = index => {
		this.setState({ value: index });
	};

	toggleShowFABMenu = () => {
		this.setState(prevState => ({
			showFABMenu: !prevState.showFABMenu
		}));
	};

	resetShowFABMenu = () => {
		this.setState({ showFABMenu: false });
	};

	render() {
		const { classes, theme } = this.props;
		const transitionDuration = {
			enter: theme.transitions.duration.enteringScreen,
			exit: theme.transitions.duration.leavingScreen
		};
		// console.log('Team id from props: ', this.props.match.params.team);
		return (
			<MsgContainer>
				<Query
					query={queries.FIND_TEAM}
					variables={{ id: this.props.match.params.team }}
				>
					{({ loading, error, data: { findTeam }, data }) => {
						if (loading) return <StyledProgressSpinner />;
						if (error) return <p>Error!</p>;
						return (
							<>
								{/* Team users name*/}
								<TeamInfo
									currentUser={this.props.currentUser}
									team={findTeam}
									{...this.props} //needed to get all the routing information to this component
								/>

								{/* List of content sections the user can choose to view */}
								<StyledPaper classes={{ root: classes.root }}>
									<Tabs
										value={this.state.value}
										onChange={this.handleChange}
										textColor="primary"
										classes={{ indicator: classes.tabsIndicator }}
										centered
										onClick={this.resetShowFABMenu}
									>
										<StyledTab
											classes={{ label: classes.label }}
											label="Message Board"
										/>

										<StyledTab
											classes={{ label: classes.label }}
											label="Activity Timeline"
										/>

										<StyledTab
											classes={{ label: classes.label }}
											label="Documents"
										/>
									</Tabs>
								</StyledPaper>
								{/* The content that each tab corresponds to. 
									SwipableViews gives each component the sliding in/out animation */}
								<SwipeableViews
									style={styles.slideContainer}
									axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
									index={this.state.value}
									onChangeIndex={this.handleChangeIndex}
								>
									<div dir={theme.direction}>
										<MessageBoard
											currentUser={this.props.currentUser}
											team={findTeam}
										/>
									</div>
									<div dir={theme.direction}>
										<ActivityTimeline {...this.props} team={findTeam} />
									</div>
									<div dir={theme.direction}>
										<DocumentsTab {...this.props} team={findTeam} />
									</div>
								</SwipeableViews>
								{/* All the FAB buttons are located below */}
								<FABComponent
									team={findTeam}
									currentUser={this.props.currentUser}
									value={this.state.value}
									transitionDuration={transitionDuration}
									classes={classes}
									toggleShowFABMenu={this.toggleShowFABMenu}
									showFABMenu={this.state.showFABMenu}
								/>
							</>
						);
					}}
				</Query>
			</MsgContainer>
		);
	}
}

ContentContainer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ContentContainer);
