import React, { Component } from 'react';
import TeamList from '../components/TeamList';

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <TeamList {...this.props} />;
	}
}
