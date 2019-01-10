import styled from 'styled-components';

const LogoBannerStyles = styled.div`
	width: 100%;
	display: flex;
	flex-flow: row;
	/* height: 560px; */
	height: 70vh;
	/* background: rgba(255, 255, 255, 0.6); */
	background: linear-gradient(
		to bottom,
		rgba(255, 255, 255, 0) 0%,
		rgba(255, 255, 255, 0.3) 20%,
		rgba(255, 255, 255, 0.6) 40%,
		rgba(255, 255, 255, 0.6) 60%,
		rgba(255, 255, 255, 0.3) 80%,
		rgba(255, 255, 255, 0) 100%
	);
`;

const BannerStyles = styled.div`
	width: 100%;
	display: flex;
`;

export default LogoBannerStyles;
export { BannerStyles };
