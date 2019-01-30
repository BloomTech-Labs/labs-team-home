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

const styles = {
	root: {
		flexGrow: 1,
		backgroundColor: 'transparent',
		boxShadow: 'none'
	},
	label: {
		color: 'white'
	},
	tabsIndicator: {
		backgroundColor: '#FAED26'
	}
};

const MsgContainer = styled.div`
	/* padding: 70px 20px; */
	margin: 90px auto;
	${mediaQueryFor.smDevice`
      padding:5px;
      width:100%;
      border-width:4px;
  `}
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
				<Paper className={classes.root}>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						textColor="primary"
						classes={{ indicator: classes.tabsIndicator }}
						centered
					>
						<Tab classes={{ label: classes.label }} label="Message Board" />
						<Tab classes={{ label: classes.label }} label="Activity Timeline" />
					</Tabs>
				</Paper>
				{!this.state.value ? (
					<MessageBoard
						currentUser={this.props.currentUser}
						team={this.props.match.params.team}
					/>
				) : (
					<ActivityTimeline
						{...this.props}
						team={this.props.match.params.team}
					/>
				)}
			</MsgContainer>
		);
	}
}

MessageBoardContainer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageBoardContainer);
