import React from 'react';
import MessageBoard from '../components/MessageBoard';
import ActivityTimeline from '../components/ActivityTimeline';
import styled from 'styled-components';

const MsgContainer = styled.div`
	padding: 100px 20px;
`;

export default class MessageBoardContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			messageboard: true
		};

		this.tabChange = this.tabChange.bind(this);
	}

	tabChange(e) {
		this.setState({
			messageboard: e.target.name === 'messageboard'
		});
	}

	render() {
		return (
			<MsgContainer>
				<button name="messageboard" onClick={this.tabChange}>
					Message Board
				</button>
				<button name="timeline" onClick={this.tabChange}>
					Activity Timeline
				</button>
				{this.state.messageboard ? (
					<MessageBoard
						user={this.props.currentUser}
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
