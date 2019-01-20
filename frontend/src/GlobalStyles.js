import { createGlobalStyle } from 'styled-components';

/**
 * #17151B << Dark Gray
 * #FF8C63 << Orange
 * #DE3B61 << Red
 * #3F1F6A << Purple
 * #F1FCEF << Creme
 */

const GlobalStyle = createGlobalStyle`
  body {
    background-color:#17151B;
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`;

export default GlobalStyle;
