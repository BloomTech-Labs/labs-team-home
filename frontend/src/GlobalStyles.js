import { createGlobalStyle } from 'styled-components';
// import

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
    width:100vw;
    margin:0;
    background-color:#17151B;
  }
`;

export default GlobalStyle;
