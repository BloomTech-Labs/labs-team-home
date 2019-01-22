import { css } from 'styled-components';

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
			width: 100%;
			${css(...args)}
		}
	`;
};

const smDevice = (...args) => {
	return css`
		@media (max-width: ${breakpoints.sm}px) {
			max-width: ${breakpoints.sm}px;
			width: 100%;
			${css(...args)}
		}
	`;
};

const mdDevice = (...args) => {
	return css`
		@media (max-width: ${breakpoints.md}px) {
			max-width: ${breakpoints.md}px;
			width: 100%;
			${css(...args)}
		}
	`;
};

const lgDevice = (...args) => {
	return css`
		@media (max-width: ${breakpoints.lg}px) {
			max-width: ${breakpoints.lg}px;
			width: 100%;
			${css(...args)}
		}
	`;
};

const xlDevice = (...args) => {
	return css`
		@media (max-width: ${breakpoints.xl}px) {
			max-width: ${breakpoints.xl}px;
			width: 100%;
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
	xlDevice
};

export default mediaQueryFor;
