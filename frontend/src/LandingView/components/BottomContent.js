import React from 'react';
import styled, { css } from 'styled-components'; // will be added once necessar
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
	FirstPane,
	TextDiv,
	BenefitsCard,
	BenefitsLineDiv
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
import Auth0 from '../../Auth/Auth';
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide';
import iOSDocument from '../../assets/iOS_documents.png';
import iOSDocument2 from '../../assets/iOS_documents2.png';
import iOSMainScreen from '../../assets/iOS_mainScreen.png';
import iOSAddDocument from '../../assets/iOS_addDocuments.png';
import mediaQueryFor from '../../_global_styles/responsive_querie';

// import Fade from 'react-reveal/Fade';

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
	${mediaQueryFor.lgDevice`
		  margin: 0px 0px;
	`}
	&:hover {
		background-color: rgba(255, 255, 255, 0.7);
		color: black;
	}
`;
//some variables necessary for this to be reactive
const width = '350px',
	height = '650px';
const Container = styled.div`
	position: relative;
	overflow: hidden;
	width: ${width};
	height: ${height};
	border-radius: 25px;
`;
const Children = styled.div`
	img {
		height: ${height};
	}
`;
const Arrow = styled.div`
	text-shadow: 1px 1px 1px #fff;
	z-index: 100;
	line-height: ${height};
	text-align: center;
	position: absolute;
	top: 0;
	width: 10%;
	font-size: 2rem;
	cursor: pointer;
	user-select: none;
	${props =>
		props.right
			? css`
					left: 90%;
			  `
			: css`
					left: 0%;
			  `}
`;

// makeCarousel injects the props `position` and `handleClick` so we don't need to worry about this being stateful yet!
const CarouselUI = ({ position, handleClick, children, swipe }) => (
	<Container>
		<Children>
			{children}
			<Arrow onClick={handleClick} data-position={position - 1}>
				{'<'}
			</Arrow>
			<Arrow right onClick={handleClick} data-position={position + 1}>
				{'>'}
			</Arrow>
		</Children>
	</Container>
);
const Carousel = makeCarousel(CarouselUI);

class BottomContent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			auth: new Auth0()
		};
	}

	handleLogin = () => {
		this.state.auth.login();
	};

	handleSignUp = () => {
		this.state.auth.signUp();
	};

	handleEmail = () => {
		window.location.href = 'mailto:contact@arq.community';
	};

	render() {
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
							No more missed conversations. No more missed opportunities. Arq is
							here.{' '}
						</p>
						<a href="#root">
							<ModifiedButton onClick={this.handleSignUp}>
								Sign Up Now
							</ModifiedButton>
						</a>
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
							environment and preferred apps. They operate on their own
							timelines, on their own schedules. And they all think about work
							differently.
						</p>
						<p>
							{' '}
							At Arq, our aim is to get your team operating from one place, so
							that no member of the team is left behind, while each member gets
							to operate out of the environment they are most comfortable
							working in.{' '}
						</p>
					</TextDiv>
					<Carousel
						defaultWait={5000}
						swipe={true} /*wait for 1000 milliseconds*/
					>
						<Slide right>
							<div>
								<img src={iOSMainScreen} alt="iPhone main screen" />
							</div>
						</Slide>
						<Slide right>
							<div>
								<img src={iOSAddDocument} alt="iPhone add document document" />
							</div>
						</Slide>
						<Slide right>
							<div>
								<img src={iOSDocument} alt="iPhone document screen" />
							</div>
						</Slide>
						<Slide right>
							<div>
								<img src={iOSDocument2} alt="iPhone document screen two" />
							</div>
						</Slide>
					</Carousel>
				</FirstPane>
				<BenefitsDiv>
					<h2>Benefits</h2>
					<BenefitsLineDiv />
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
									Arq distills out the noise and keeps the information load
									light.
								</p>
								<p>
									Concentrate on what really matters: getting your team ready to
									ship world class product.
								</p>
							</div>
						</BenefitsCard>
						<BenefitsCard>
							<div>
								<h3>Adaptability</h3>
							</div>
							<div>
								<p>Arq can incorporate a wide range workplace environments. </p>
								<p>
									Collegues half-way across the world? Not to worry, our help
									staff are here for you, 24/7.
								</p>
							</div>
						</BenefitsCard>
					</BenefitsContainer>
				</BenefitsDiv>
				<IntegrationDiv>
					<h2>Integration</h2>
					<BenefitsLineDiv />

					<p>
						In addition to its own built in tracking, commenting, and messaging
						system, Arq integrates with everything from the Creative Cloud, to
						Drop Box, to Google Docs and more.
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
				<Pricing
					handleSignUp={this.handleSignUp}
					handleEmail={this.handleEmail}
				/>
				<Footer />
			</>
		);
	}
}

export default BottomContent;
