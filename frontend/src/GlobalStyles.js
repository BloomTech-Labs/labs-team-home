import { createGlobalStyle } from 'styled-components';
import mediaQueryFor from './_global_styles/responsive_querie';

const GlobalStyle = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
    background-size:100vw;
    margin:0 auto;
    /* ${`
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
    `} */
  }
`;

export default GlobalStyle;
