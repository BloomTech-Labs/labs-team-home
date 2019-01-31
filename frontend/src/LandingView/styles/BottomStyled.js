import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import { colors } from '../../colorVariables';

const BtmContentStyles = styled.div`
	display: flex;
	flex-flow: row;
	font-size: 1rem;
	margin: 0 auto;
	margin-top: 2%;
	width: 80%;
	color: rgba(255, 255, 255, 1);
	/* background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 49% ,rgba(0,0,0,0) 100%); */

	h1 {
		width: 60%;
		margin: 0 20%;
		font-size: 4rem;
		color: ${colors.header};
		text-shadow: 5px 5px 20px #111;
	}
	p {
		width: 50%;
		margin: 0 auto;
	}
	${mediaQueryFor.smDevice`

    h1 {
      margin:0 auto;
      width:90%;
      font-size:3rem;
    }
    p {
		width: 100%;
		margin: 0 auto;
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
