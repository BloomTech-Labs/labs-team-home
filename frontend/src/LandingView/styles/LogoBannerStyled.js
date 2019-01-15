import styled from 'styled-components';

const LogoBannerStyles = styled.div`
	width: 100%;
	display: flex;
	flex-flow: column;
	/* height: 560px; */
	height: 70vh;
	/* background: rgba(255, 255, 255, 0.6); */
	background: linear-gradient(
		to bottom,
		rgba(255, 255, 255, 0.1) 0%,
		rgba(255, 255, 255, 0) 20%,
		rgba(255, 255, 255, 0) 40%,
		rgba(255, 255, 255, 0) 60%,
		rgba(255, 255, 255, 0) 80%,
		rgba(255, 255, 255, 0.1) 100%
	);
`;

const BannerStyles = styled.div`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	width: 66%;
	height: 160px;
	margin: 0 auto;
	margin-top: 3%;
	display: flex;
	font-size: 11rem;
	font-family: Righteous;
	text-align: center;
`;

export default LogoBannerStyles;
export { BannerStyles };
