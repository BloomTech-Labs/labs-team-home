import styled from 'styled-components';

const LogoBannerStyles = styled.div`
	width: 100%;
	display: flex;
	flex-flow: column;
	background: linear-gradient(
		to bottom,
		rgb(63, 31, 106, 0.2) 0%,
		rgb(63, 31, 106, 0.1) 20%,
		rgb(63, 31, 106, 0) 40%,
		rgb(63, 31, 106, 0) 60%,
		rgb(63, 31, 106, 0.1) 80%,
		rgb(63, 31, 106, 0) 100%
	);
`;

const TextIMG = styled.img`
	height: 80vh;
`;

const BannerStyles = styled.div`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	width: 66%;
	height: 160px;
	margin: 0 auto;
	color: #f1fcef;
	margin-top: 3%;
	display: flex;
	font-size: 11rem;
	font-family: Righteous;
	text-align: center;
`;

export default LogoBannerStyles;
export { BannerStyles, TextIMG };
