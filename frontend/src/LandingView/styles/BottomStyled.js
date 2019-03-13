import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import { colors, palette } from '../../colorVariables';

export const LandingContentContainer = styled.div`
	display: flex;
	margin: 0 auto 0px auto;
	justify-content: space-around;
	height: 100vh;
	padding-top: 60px;
	align-items: center;

	${mediaQueryFor.lgDevice`
    flex-direction: column;
    justify-content: center;
  `}
`;

export const VideoContainer = styled.div`
	video {
		margin-top: 100px;
		width: 400px;
		border: 2px solid black;
		z-index: 1000;

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
		line-height: 0.8;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		color: ${palette.gold};
		text-shadow: 5px 5px 20px #111;
	}
	p {
		margin: 10px 11%;
		font-size: 1.4rem;
		font-weight: 400;
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
