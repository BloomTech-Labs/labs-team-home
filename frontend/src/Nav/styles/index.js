import styled from 'styled-components';
import { Link } from 'react-router-dom';
import mediaQueryFor from '../../_global_styles/responsive_querie';

const StyledLink = styled(Link)`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	font-family: Comfortaa;
	color: #f1fcef;
	text-decoration: none;
	margin: 5px;
	font-weight: bold;
	background: none;
	text-align: center;
	padding: 0.6em 1em;
	border: 1px solid gray;
	border-radius: 4px;
	transition: 0.4s;
	&:hover {
		background-color: #f1fcef;
		color: #17151b;
		transform: scale(1.05, 1.05);
	}
`;

const TextIMG = styled.img`
	height: 50px;
	width: 40%;
`;

const NavBar = styled.div`
	background: linear-gradient(100deg, #17151b, rgba(222, 59, 97, 0.6), #17151b);
	background-size: 600% 600%;
	width: 100%;
	position: fixed;
	left: 0px;
	top: 0px;
	margin: 0 auto;
	/* padding: 10px; */
	/* display: flex;
	flex-flow: row; */
	z-index: 1001;
	/* justify-content: space-between; */
	&:hover {
		background-color: #17151b;
	}

	@media (max-width: 700px) {
	}

	-webkit-animation: AnimationName 26s ease infinite;
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
	}
`;

const RespNav = styled.div`
	background: linear-gradient(100deg, #17151b, rgba(222, 59, 97, 0.6), #17151b);
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
	justify-content: space-around;
	.navbar {
		width: 100%;
		padding: 10px;
		.nav-item {
			font-size: 1.2rem;
			margin: 10px 0 10px 0;
		}
	}
	${mediaQueryFor.mdDevice`
    padding: 0;
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
    padding: 0;
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

	-webkit-animation: AnimationName 26s ease infinite;
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
	}
`;

export default NavBar;
export { TextIMG, StyledLink, RespNav };
