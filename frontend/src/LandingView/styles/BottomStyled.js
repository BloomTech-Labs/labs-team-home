import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import { colors } from '../../colorVariables';

export const LandingContentContainer = styled.div`
	display: flex;
	margin: 0 auto 50px auto;
	justify-content: space-around;
	height: 100vh;
	padding-top: 60px;
	align-items: center;
	${mediaQueryFor.lgDevice`
    flex-direction: column;
		justify-content: center;
	`}

	${mediaQueryFor.smDevice`
		margin-bottom: 30px;
	`}
`;

export const VideoContainer = styled.div`
	/* REMOVING THIS WILL CRASH THE SITE */
	z-index: 1000;

	video {
		margin-top: 100px;
		width: 400px;
		border: 2px solid black;

		${mediaQueryFor.lgDevice`
      margin-top: 30px;
  `}
	}
`;

export const LandingContent = styled.div`
	display: flex;
	flex-flow: column;
	font-size: 1rem;
	margin: 100px 10px 0px 10px;
	width: 35%;
	color: ${colors.text};
	z-index: 11;
	/* background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 49% ,rgba(0,0,0,0) 100%); */

	h1 {
		/* width: 60%; */
		margin: 0 4%;
		font-size: 5rem;
		line-height: 0.9;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		color: gold;
		text-shadow: 5px 5px 20px #111;
	}
	p {
		margin: 10px 11%;
		font-size: 1.4rem;
		font-weight: 400;
	}

	a {
		color: white;
		&:hover {
			color: black;
			text-decoration: none;
		}
	}

	${mediaQueryFor.lgDevice`
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    width: 55%;

    h1 {
      padding-top: 20px;
      font-size: 4.4rem;
      text-align: center;
    }

    p {
      width: 100%;
      font-size:1rem;
      padding:5px;
      text-align: center;
    }
    
    span {
      display: block;
    }
  `}
`;

export const TextPane = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	height: 80vh;

	p {
		font-size: 1.4rem;
		font-weight: 400;
	}
`;

export const FirstPane = styled(TextPane)`
	flex-direction: row-reverse;
	justify-content: space-evenly;
	align-items: center;

	${mediaQueryFor.mdDevice`
		  flex-direction: column;
			justify-content: center;
			margin-bottom: 400px;
			height:100vh;
	`}
`;

export const TextDiv = styled.div`
	width: 40%;

	p {
		/* margin: 75px 0; */
	}

	${mediaQueryFor.mdDevice`
		width: 90%;

		p:first-child {
			margin-top: 25px;
		}
	`}
`;

export const IntegrationDiv = styled(TextPane)`
	margin-top: 200px;

	h2 {
		text-align: center;
		margin-bottom: 20px;
		font-size: 2.5rem;
	}

	p {
		margin: 25px 11%;
		text-align: center;
	}

	${mediaQueryFor.mdDevice`
			margin-top:250px;
			height:100vh;
	`}
`;

export const Circle = styled.div`
	height: 150px;
	width: 150px;
	border-radius: 50%;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 11;
	margin: 10px 0;
	color: ${colors.button};

	@media (max-width: 650px) {
		margin: 10px 30px;
	}
`;

export const CircleDiv = styled.div`
	display: flex;
	justify-content: space-evenly;
	position: relative;
	flex-wrap: wrap;
`;

export const LineDiv = styled.div`
	height: 1px;
	width: 80%;
	border: 1px solid white;
	position: absolute;
	top: 82px;

	@media (max-width: 650px) {
		height: 200px;
		max-width: 45%;
	}
`;

export const BenefitsDiv = styled(TextPane)`
	justify-content: center;
	align-items: center;

	h2 {
		margin: 25px 0 20px 0;
		font-size: 2.5rem;

		${mediaQueryFor.mdDevice`
			margin-top: 300px;
		 
	`}
		${mediaQueryFor.smDevice`
			
	`}
	}
`;
export const BenefitsLineDiv = styled.div`
	height: 2px;
	width: 300px;
	margin: 0 auto;
	margin-bottom: 100px;
	background-color: white;
`;

export const BenefitsContainer = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;

	h2 {
		display: block;
	}

	${mediaQueryFor.mdDevice`
		  flex-direction: column;
			justify-content: center;
			width: 60%

						&:last-child {
				margin-bottom: 500px;
			}
	`}
	${mediaQueryFor.smDevice`
		 
			width: 80%
	`}
`;

export const BenefitsCard = styled.div`
	background-color: rgb(143, 136, 150, 1);
	border-radius: 5px;
	height: 350px;
	padding: 40px;
	z-index: 11;
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	${mediaQueryFor.lgDevice`
		padding: 20px;
	`}
	h3 {
		font-size: 2rem;
	}

	p {
		font-size: 1.2rem;
		color: white;
	}

	div {
		border-bottom: 1px solid ${colors.button};

		&:last-child {
			margin: 20px 0;
			border-bottom: none;
		}
	}

	${mediaQueryFor.mdDevice`
		padding: 40px;
			width: 90%;
			height: 300px;
			margin: 20px 0;

			div {
				&:last-child {
					margin-top: 0;
				}
			}
	`}
`;
