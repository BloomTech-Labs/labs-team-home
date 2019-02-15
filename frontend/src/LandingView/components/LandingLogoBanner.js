import React from 'react';
import LogoBannerStyles, { BannerStyles } from '../styles/LogoBannerStyled';
import BottomContent from '../components/BottomContent';

const LogoBanner = props => {
	return (
		<LogoBannerStyles>
			<BannerStyles />
			<BottomContent /> {/* The main text of the landing page is here */}
		</LogoBannerStyles>
	);
};

export default LogoBanner;
