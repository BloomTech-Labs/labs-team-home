import styled from 'styled-components';

const AppStyles = styled.div`
	width: 100%;
	margin: 0 auto;
	height: 100vh;
	.fade-enter {
		opacity: 0.01;
	}
	.fade-enter.fade-enter-active {
		opacity: 1;
		transition: opacity 300ms ease-in;
	}
	.fade-exit {
		opacity: 1;
	}

	.fade-exit.fade-exit-active {
		opacity: 0.01;
		transition: opacity 300ms ease-in;
	}
`;

export default AppStyles;
