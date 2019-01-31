import { css } from 'styled-components';

/**
 * Use of custom responsive query functions:
 * import "mediaQueryFor" into your styles
 * 
 * Example:
 * const BtmContentStyles = styled.div`
	@import url('https://fonts.googleapis.com/css?family=Comfortaa|Righteous');
	font-family: Comfortaa;
	font-size: 1rem;
	font-weight: 10
	margin-top: 2%;
	width: 40%;
	height: 2vh;
  color: rgba(255, 255, 255, 0.6);
  
  ${mediaQueryFor.lgDevice`
    background-color:#fff;
    color:#000;
    font-size:3rem;
  `}
`;
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
const breakpoints = {
	xs: 376,
	sm: 576,
	md: 768,
	lg: 992,
	xl: 1200
};

const xsDevice = (...args) => {
	return css`
		@media (max-width: ${breakpoints.xs}px) {
			max-width: ${breakpoints.xs}px;
			${css(...args)}
		}
	`;
};

const smDevice = (...args) => {
	return css`
		@media (max-width: ${breakpoints.sm}px) {
			max-width: ${breakpoints.sm}px;
			${css(...args)}
		}
	`;
};

const mdDevice = (...args) => {
	return css`
		@media (max-width: ${breakpoints.md}px) {
			max-width: ${breakpoints.md}px;
			${css(...args)}
		}
	`;
};

const lgDevice = (...args) => {
	return css`
		@media (max-width: ${breakpoints.lg}px) {
			max-width: ${breakpoints.lg}px;
			${css(...args)}
		}
	`;
};

const xlDevice = (...args) => {
	return css`
		@media (max-width: ${breakpoints.xl}px) {
			max-width: ${breakpoints.xl}px;
			${css(...args)}
		}
	`;
};

const customWidthMediaQuery = (minWidth, maxWidth, ...args) => {
	return css`
		@media (min-width: ${minWidth}) and (max-width: ${maxWidth}) {
			${css(...args)}
		}
	`;
};

const mediaQueryFor = {
	xsDevice,
	smDevice,
	mdDevice,
	lgDevice,
	xlDevice,
	customWidthMediaQuery
};

export default mediaQueryFor;
