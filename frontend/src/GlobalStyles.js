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

const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
    background-size:100vw;
    background-color: #17151B;
    width:100%;
    margin:0 auto;
    background: linear-gradient(
		to bottom,
		rgb(63, 31, 106, 0.2) 0%,
		rgb(63, 31, 106, 0.1) 20%,
		rgb(63, 31, 106, 0) 40%,
		rgb(63, 31, 106, 0) 60%,
		rgb(63, 31, 106, 0.1) 80%,
		rgb(63, 31, 106, 0) 100%
  );
  
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
