import React from 'react';
import styled from 'styled-components'; //{ css } will be added once necessar
import {
	LandingContent,
	LandingContentContainer,
	VideoContainer,
	Circle,
	CircleDiv,
	LineDiv,
	BenefitsDiv,
	IntegrationDiv,
	BenefitsContainer,
	Placeholder,
	FirstPane,
	TextDiv,
	BenefitsCard
} from '../styles/BottomStyled';
import frontpage from '../../assets/demo.mp4';
import Pricing from '../components/Pricing';
import Button from '@material-ui/core/Button';
import { Dropbox } from 'styled-icons/boxicons-logos/Dropbox';
import { GoogleDrive } from 'styled-icons/fa-brands/GoogleDrive';
import { Apple } from 'styled-icons/boxicons-logos/Apple';
import { Onedrive } from 'styled-icons/icomoon/Onedrive';
import Footer from './footer';
import { colors } from '../../colorVariables';
// starting integration of carousel for iOS images
// import Fade from 'react-reveal/Fade';
// import makeCarousel from 'react-reveal/makeCarousel';
// import Slide from 'react-reveal/Slide';

const StyledDropbox = styled(Dropbox)`
	height: 75px;
`;

const StyledGDrive = styled(GoogleDrive)`
	height: 75px;
`;

const StyledApple = styled(Apple)`
	height: 75px;
`;

const StyledOnedrive = styled(Onedrive)`
	height: 75px;
`;
const ModifiedButton = styled(Button)`
	background-color: ${colors.button};
	width: 200px;
	margin: 10px 11%;
	color: ${colors.text};
	transition: background-color 250ms ease-in-out, transform 150ms ease;
	&:hover {
		background-color: rgba(255, 255, 255, 0.7);
		color: black;
	}
`;

const BottomContent = props => {
	return (
		<>
			<LandingContentContainer>
				<LandingContent>
					{/* This is where the homepage basically lies. Hopefully, we can style this to look slightly better.  */}
					<h1>
						Connect. <span>Organize. </span> Collaborate.
					</h1>
					<br />
					<p>
						{' '}
						No more missing a conversation. No more missed opportunities. Sveza
						is here.{' '}
					</p>
					<ModifiedButton>Sign Up Now</ModifiedButton>
				</LandingContent>
				<VideoContainer>
					<video id="video" autoPlay loop muted>
						<source src={frontpage} type="video/mp4" />
					</video>
				</VideoContainer>
			</LandingContentContainer>
			<FirstPane>
				<TextDiv>
					<p>
						Organizing a team is hard. Every person has their preferred work
						environment and preferred apps. They operate on their own timelines,
						on their own schedules. And they all think about work differently.
					</p>
					<p>
						{' '}
						At Arq, our aim is to get your team operating from one place, so
						that no member of the team is left behind, while each member gets to
						operate out of the environment they are most comfortable working in.{' '}
					</p>
				</TextDiv>
				<Placeholder />
			</FirstPane>
			<BenefitsDiv>
				<h2>Benefits</h2>
				<BenefitsContainer>
					<BenefitsCard>
						<div>
							<h3>Ease of use</h3>
						</div>
						<div>
							<p>Arq is out of the box and ready to use. Right now. </p>
							<p>
								With native iOS integration, Arq allows for total team
								integration, from mobile to desktop.
							</p>
						</div>
					</BenefitsCard>
					<BenefitsCard>
						<div>
							<h3>Simplicity</h3>
						</div>
						<div>
							<p>
								Arq distills out the noise and keeps the information load light.
							</p>
							<p>
								Forget informational overload. Concentrate on what really
								matters: getting your team ready to ship world class product.
							</p>
						</div>
					</BenefitsCard>
					<BenefitsCard>
						<div>
							<h3>Adaptability</h3>
						</div>
						<div>
							<p>Arq can integrate a wide range of workplace environments. </p>
							<p>
								Collegues half-way across the world? Not to worry, our help
								staff are here for you, 24/7.
							</p>
						</div>
					</BenefitsCard>
				</BenefitsContainer>
			</BenefitsDiv>
			<IntegrationDiv>
				<p>
					In addition to its own built in tracking, commenting, and messaging
					system, Arq integrates with everything from the Creative Cloud, to
					Drop Box, to Google Docs and more.{' '}
				</p>
				<CircleDiv>
					<LineDiv />
					<Circle>
						<StyledDropbox />
					</Circle>
					<Circle>
						<StyledOnedrive />
					</Circle>
					<Circle>
						<StyledGDrive />
					</Circle>
					<Circle>
						<StyledApple />
					</Circle>
				</CircleDiv>
			</IntegrationDiv>
			<Pricing />
			<Footer />
		</>
	);
};

export default BottomContent;
