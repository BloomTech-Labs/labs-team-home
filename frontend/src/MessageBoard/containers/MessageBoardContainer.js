import React from 'react';
import MessageBoard from '../components/MessageBoard';
import ActivityTimeline from '../components/ActivityTimeline';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
//Query is a GET request for GraphQl, imported from apollo imprementation
import { Query } from 'react-apollo';
import * as queries from '../../constants/queries';

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

class MessageBoardContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: 0
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;

		return (
			<MsgContainer>
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
						{/* <StyledTab classes={{ label: classes.label }} label="Documents" /> */}
						<StyledTab
							classes={{ label: classes.label }}
							label="Activity Timeline"
						/>
						{/* Within the tabs bar, clicking on any of the components sets the value to 0, 1, or 2 respectively*/}
					</Tabs>
				</StyledPaper>
				<Query //this is from Apollo
					query={queries.FIND_TEAM} //what we are finding: the team
					variables={{ id: this.props.match.params.team }} //by the team ID, which is in the props from router
				>
					{({ loading, error, data: { findTeam } }) => {
						//this is the return from the query
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error!</p>;

						if (!this.state.value) {
							//this decides which component to render
							return (
								<MessageBoard
									currentUser={this.props.currentUser}
									team={findTeam} //this is the team acquired from the server/graphQL
								/>
							);
						} else {
							//
							return <ActivityTimeline {...this.props} team={findTeam} />; //this is the team acquired from the server/graphQL
						}
					}}
				</Query>
			</MsgContainer>
		);
	}
}

MessageBoardContainer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageBoardContainer);
