import styled, { createGlobalStyle } from 'styled-components';
import desktop from '../../assets/TH_desktop.svg';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
`;

const SVGAnimation = styled.img`
	position: absolute;
	width: 80%;
	margin: 60% 16%;
`;

export { SVGAnimation };
