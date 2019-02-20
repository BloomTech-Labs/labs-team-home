import React, { Component } from 'react';
import LogoBanner from '../components/LandingLogoBanner'; // component
import Particles from 'react-particles-js'; // fancy animations
import particles from '../../animated/particles.json'; // settings for fancy animations
import RespNavBAr from '../../Nav/NavResp'; // component

const styles = {
	position: 'fixed',
	width: ' 100%',
	margin: '0px',
	left: '0px',
	zIndex: '0',
	height: '100%'
};

export default class LandingView extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<RespNavBAr />{' '}
				{/* The navigation bar for specifically the landing page */}
				<Particles params={particles} style={styles} />{' '}
				{/* The cool animation effct */}
				<LogoBanner /> {/** Landing Page Content */}
			</div>
		);
	}
}
