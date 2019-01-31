import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import { colors, palette } from '../../colorVariables';

const BtmContentStyles = styled.div`
	display: flex;
	flex-flow: column;
	font-size: 1rem;
	margin: 0 auto;
	margin-top: 2%;
	width: 90%;
	color: rgba(255, 255, 255, 1);
	/* background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 49% ,rgba(0,0,0,0) 100%); */

	h1 {
		/* width: 60%; */
		margin: 0 20%;
		font-size: 6rem;
		line-height: 0.8;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		color: ${palette.gold};
		text-shadow: 5px 5px 20px #111;
	}
	p {
		width: 50%;
		margin: 10px 22%;
	}
	${mediaQueryFor.smDevice`
    position:absolute;
    display:flex;
    flex-flow:column;
    align-content:center;
    justify-content:center;
    bottom: 133px;
    left: 5%;
    h1 {
      /* width:20%; */
      margin:0;
      font-size:3rem;
    }
    p {
		width: 100%;
    margin: 0 auto;
    font-size:1rem;
    padding:5px;
	}
  `}
	${mediaQueryFor.xsDevice`

    h1 {
      margin:0 auto;
      width:98%;
      font-size:3rem;
    }
    p {
		width: 100%;
		margin: 0 auto;
    /* padding:5px; */
	}
  `}
`;

export default BtmContentStyles;
