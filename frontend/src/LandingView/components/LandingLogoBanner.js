import React from 'react';
import LogoBannerStyles, {
	LogoStyles,
	BannerStyles
} from '../styles/LogoBannerStyled';

const LogoBanner = props => {
	return (
		<LogoBannerStyles>
			<LogoStyles>Logo</LogoStyles>
			<BannerStyles>Banner</BannerStyles>
		</LogoBannerStyles>
	);
};

export default LogoBanner;
