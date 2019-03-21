import styled from 'styled-components';

const LogoBannerStyles = styled.div`
	width: 100%;
	display: flex;
	flex-flow: column;
`;

// const TextIMG = styled.img`
// 	position: fixed;
// 	z-index: -110;
//   right: 3%;
//   width:80%;
//   top: 100px;
//   opacity:1;
//   filter: drop-shadow( 7px 5px 4px rgba(0,0,0,1));
//   ${mediaQueryFor.lgDevice`
//   width:300%;
//     left: 0%;
//     top: 5%;
//   `}
//   ${mediaQueryFor.mdDevice`
//   width:250%;
//     left: 0%;
//     top: 10%;
//   `}
//   ${mediaQueryFor.smDevice`
//   /* width:300%; */
//     left: -10%;
//     top: 15%;
//   `}
// `;

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
export { BannerStyles };
