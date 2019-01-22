import { createGlobalStyle } from 'styled-components';

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

/**
 * Breakpoint values
 * xtra small
<576px	Small
≥576px	Medium
≥768px	Large
≥992px	Extra large
≥1200px
 */
const media = {
	xs: 376,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200
};

const GlobalStyle = createGlobalStyle`
  body {
    width:100vw;
    margin:0;
    background-color:#17151B;
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`;

export default GlobalStyle;
