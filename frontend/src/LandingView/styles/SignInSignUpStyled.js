import styled from 'styled-components';

const StyledSignInUp = styled.div`
	background: linear-gradient(100deg, #17151b, rgba(222, 59, 97, 0.6), #17151b);
	background-size: 600% 600%;
	width: 100vw;
	margin: 0 auto;
	display: flex;
	flex-flow: row;
	justify-content: flex-end;
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

export default StyledSignInUp;
