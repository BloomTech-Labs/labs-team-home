import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
		transform: scale(1.1, 1.1);
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
	padding: 10px;
	display: flex;
	flex-flow: row;
	z-index: 1001;
	justify-content: space-between;
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
	padding: 10px;
	flex-flow: row;
	z-index: 1001;
	justify-content: space-between;
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

export default NavBar;
export { TextIMG, StyledLink, RespNav };
