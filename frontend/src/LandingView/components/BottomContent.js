import React from 'react';
import {
	LandingContent,
	LandingContentContainer
} from '../styles/BottomStyled';
import frontpage from '../../assets/demo.mp4';

const BottomContent = props => {
	return (
		<LandingContentContainer>
			<LandingContent>
				{/* This is where the homepage basically lies. Hopefully, we can style this to look slightly better.  */}
				<h1>Share. Work. Congregate.</h1>
				<br />
				<p>
					Communicating within a team can be a pain. Let's fix that for you.
					Introducing Sveza, a better way to share thoughts in a group setting.
				</p>
			</LandingContent>
			<video id="video" autoPlay loop muted>
				<source src={frontpage} type="video/mp4" />
			</video>
		</LandingContentContainer>
	);
};

export default BottomContent;
