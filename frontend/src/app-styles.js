import styled from 'styled-components';
import mediaQueryFor from './_global_styles/responsive_querie';

const AppStyles = styled.div`
	margin: 0 auto;
	height: 100vh;
	.fade-enter {
		opacity: 0;
	}
	.fade-enter.fade-enter-active {
		opacity: 1;
		transition: opacity 2000ms ease-out;
	}
	.fade-exit {
		opacity: 1;
	}

	.fade-exit.fade-exit-active {
		opacity: 0;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		transition: opacity 2000ms ease-out;
	}
`;

const BackgroundIMG = styled.img`
	position: fixed;
	right: 20%;
	width: 900px;
  filter: drop-shadow(-2px 10px 6px #111);
  ${mediaQueryFor.lgDevice`
    width:70%;
    left: 0%;
    top: 5%;
    `}
    ${mediaQueryFor.mdDevice`
    width:80%;
    left: 0%;
    top: 10%;
    `}
    ${mediaQueryFor.smDevice`
    width:100%;
    left:-10%;
    top: 15%;
  `}
`;

export default AppStyles;
export { BackgroundIMG };
