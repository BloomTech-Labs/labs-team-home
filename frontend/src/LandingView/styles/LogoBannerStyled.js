import styled from 'styled-components';

const LogoBannerStyles = styled.div`
	width: 100%;
	display: flex;
	flex-flow: column;
`;

const TextIMG = styled.img`
	position: fixed;
	z-index: -110;
	left: 0%;
	top: 0%;
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
