import styled from 'styled-components';
import { Link } from 'react-router-dom';
import mediaQueryFor from '../../_global_styles/responsive_querie';

/* styling for the navbar buttons */

const NavBarTogglerDiv = styled.div`
	display: none;
	${mediaQueryFor.mdDevice`
    display: block
  `}
	${mediaQueryFor.smDevice`
    display: block
  `} 
	${mediaQueryFor.xsDevice`
    display: block
  `}
`;
const StyledLink = styled(Link)`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	font-family: Comfortaa;
	color: #f1fcef;
	margin: 5px;
	font-weight: bold;
	background: none;
	text-align: center;
	padding: 0.6em 1em;
	border: none;
	border-bottom: 1px solid #ecff26;
	transition: 0.4s;
	&:hover {
		text-decoration: none;
		color: #ecff26;
		transform: scale(1.05, 1.05);
		border: none;
	}
	${mediaQueryFor.mdDevice`
    text-align:center;
  `}
	${mediaQueryFor.smDevice`
    text-align:center;
  `}
`;

const TextIMG = styled.img`
	height: 50px;
	width: 40%;
	margin-left: 20px;
`;

/* this styling doesn't ever seem to be used, but let's change the background color just in case*/
const NavBar = styled.div`
	/* background: linear-gradient(100deg, #17151b, rgba(222, 59, 97, 1), #17151b); */
	background-color: #17151b;
	background-size: 600% 600%;
	width: 100%;
	position: fixed;
	left: 0px;
	top: 0px;
	margin: 0 auto;
	z-index: 1001;

	&:hover {
		background-color: #17151b;
	}

	/* -webkit-animation: AnimationName 26s ease infinite;
	-moz-animation: AnimationName 26s ease infinite;
	animation: AnimationName 26s ease infinite;
	@-webkit-keyframes AnimationName {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@-moz-keyframes AnimationName {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@keyframes AnimationName {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	} */
`;

const RespNav = styled.div`
	/* removed the gradient background as it's distracting for users */
	/* background: linear-gradient(100deg, #17151b, rgba(222, 59, 97, 1), #17151b); */
	background-color: #3e3145;
	background-size: 600% 600%;
	width: 100%;
	position: fixed;
	display: flex;
	flex-flow: row;
	left: 0px;
	top: 0px;
	margin: 0 auto;
	flex-flow: row;
	z-index: 1001;
	text-decoration: none;

	justify-content: space-around;
	.navbar {
		width: 100%;
		padding: 10px;
		.nav-item {
			font-size: 1.2rem;
			margin: 10px 0 10px 0;
			transition: 0.4s;
			&:hover {
				color: #ecff26;
				transform: scale(1.05, 1.05);
				border: none;
			}
		}
	}
	${mediaQueryFor.mdDevice`
    display:flex;
    flex-flow: column;
    justify-content: space-between;
    .nav-item{
      display: flex;
      flex-flow: column;
      align-items: center;
      border-top: solid 1px rgba(0,0,0,0.3);
      font-size:1.5rem;
    }
  `}
	${mediaQueryFor.smDevice`
    display:flex;
    flex-flow: column;
    justify-content: space-between;
    .nav-item{
      font-size:1.5rem;
      display: flex;
      flex-flow: column;
      align-items: center;
      border-top: solid 1px rgba(0,0,0,0.3);
    }
  `}
`;

export default NavBar;
export { TextIMG, StyledLink, RespNav, NavBarTogglerDiv };
