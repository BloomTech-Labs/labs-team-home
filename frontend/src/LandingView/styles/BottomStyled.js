import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';

const BtmContentStyles = styled.div`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	font-family: Comfortaa;
	font-size: 1rem;
	font-weight: 100;
	margin: 0 auto;
	margin-top: 2%;
	width: 100%;
	height: 2vh;
	color: rgba(255, 255, 255, 1);
	h1 {
		width: 60%;
		margin: 0 20%;
		font-size: 6rem;
	}
	p {
		width: 50%;
		margin: 0 auto;
	}
	${mediaQueryFor.smDevice`

    h1 {
      margin:0 auto;
      width:100%;
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
      width:100%;
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
