import { createGlobalStyle } from 'styled-components';
import mediaQueryFor from './_global_styles/responsive_querie';

/**
 * Color palette:
 * #17151B << Dark Gray
 * #FF8C63 << Orange
 * #FFD17C << Lt Orange
 * #DE3B61 << Red
 * #3F1F6A << Purple
 * #F1FCEF << Creme
 * #73FF6D << Green
 */
import iconLogo from './assets/Sveza_graph_logo.png';
const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
    background-size:100vw;
    margin:0 auto;
    ${
			'' /* background: rgb(155,120,111);
background: linear-gradient(90deg, rgba(155,120,111,1) 0%, rgba(155,120,111,1) 35%, rgba(62,49,69,1) 35%); */
		}
    ${`
      background: linear-gradient(
      to bottom,
      rgba(83, 51, 126, 0.2) 0%,
      rgba(83, 51, 126, 0.1) 20%,
      rgba(83, 51, 126, 0) 40%,
      rgba(83, 51, 126, 0) 60%,
      rgba(83, 51, 126, 0.1) 80%,
      rgba(83, 51, 126, 0) 100%
    ); 
		`}
    ${mediaQueryFor.mdDevice`

      width:100vw;
    `}
    ${mediaQueryFor.smDevice`
      width:100vw;
    `}
    ${mediaQueryFor.xsDevice`
      width:100vw;
    `}
  }
`;

export default GlobalStyle;
