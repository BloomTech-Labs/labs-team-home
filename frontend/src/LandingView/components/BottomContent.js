import React from 'react';
import {
	LandingContent,
	LandingContentContainer,
	VideoContainer
} from '../styles/BottomStyled';
import frontpage from '../../assets/demo.mp4';
import Pricing from '../components/Pricing';
const BottomContent = props => {
	return (
		<>
			<LandingContentContainer>
				<LandingContent>
					{/* This is where the homepage basically lies. Hopefully, we can style this to look slightly better.  */}
					<h1>Share. Work. Congregate.</h1>
					<br />
					<p>
						Communicating within a team can be a pain. Let's fix that for you.
						Introducing Sveza, a better way to share thoughts in a group
						setting.
					</p>
				</LandingContent>
				<VideoContainer>
					<video id="video" autoPlay loop muted>
						<source src={frontpage} type="video/mp4" />
					</video>
				</VideoContainer>
			</LandingContentContainer>
			<Pricing />
		</>
	);
};

export default BottomContent;
