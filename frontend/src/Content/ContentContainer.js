import React from 'react';
import MessageBoard from './MessageBoard/MessageBoard';
import ActivityTimeline from './ActivityTimeline/ActivityTimeline';
import mediaQueryFor from '../_global_styles/responsive_querie';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Query } from 'react-apollo';
import * as queries from '../constants/queries';
import TeamInfo from './components/TeamInfo';
import DocumentsTab from './DocumentsTab/TabContainer'; // renamed from TabContainer

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
	}
};

const MsgContainer = styled.div`
	margin: 90px auto;

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

class ContentContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 0,
			isAdmin: false
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;

		return (
			<MsgContainer>
				<Query
					query={queries.FIND_TEAM}
					variables={{ id: this.props.match.params.team }}
				>
					{({ loading, error, data: { findTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error!</p>;

						return (
							<>
								{/* Team users name*/}
								<TeamInfo
									currentUser={this.props.currentUser}
									team={findTeam}
								/>

								{/* List of content sections the user can choose to view */}
								<StyledPaper classes={{ root: classes.root }}>
									<Tabs
										value={this.state.value}
										onChange={this.handleChange}
										textColor="primary"
										classes={{ indicator: classes.tabsIndicator }}
										centered
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
								{/* Within the tabs bar, clicking on any of the components sets 
								the value to 0, 1, or 2 respectively this decides which component 
								to render based on the value */}
								{this.state.value === 0 ? (
									<MessageBoard
										currentUser={this.props.currentUser}
										team={findTeam}
									/>
								) : this.state.value === 1 ? (
									<ActivityTimeline {...this.props} team={findTeam} />
								) : (
									<DocumentsTab {...this.props} team={findTeam} />
								)}
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

export default withStyles(styles)(ContentContainer);
