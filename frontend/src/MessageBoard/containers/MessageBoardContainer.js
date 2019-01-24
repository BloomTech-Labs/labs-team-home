import React from 'react';
import MessageBoard from '../components/MessageBoard';
import ActivityTimeline from '../components/ActivityTimeline';

export default class MessageBoardContainer extends React.Component {
	constructor() {
		super();

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
			<div>
				<button name="messageboard" onClick={this.tabChange}>
					Message Board
				</button>
				<button name="timeline" onClick={this.tabChange}>
					Activity Timeline
				</button>
				{this.state.messageboard ? (
					<MessageBoard team={this.props.match.params.team} />
				) : (
					<ActivityTimeline team={this.props.match.params.team} />
				)}
			</div>
		);
	}
}
